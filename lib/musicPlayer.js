const { EventEmitter } = require("events");
const ytdlp = require("yt-dlp-exec");
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    entersState,
    StreamType,
} = require("@discordjs/voice");

const MAX_PLAYLIST_ITEMS = 100;
const INACTIVITY_LEAVE_MS = 3 * 60 * 1000;

const parseYtdlpOutput = (output) => {
    if (!output) return null;
    if (typeof output === "object") return output;
    if (typeof output === "string") {
        try {
            return JSON.parse(output);
        } catch {
            return output.trim();
        }
    }
    return null;
};

const formatDuration = (seconds) => {
    if (!seconds || !Number.isFinite(seconds)) return "Live";
    const s = Math.max(0, Math.floor(seconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) {
        return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
    return `${m}:${String(sec).padStart(2, "0")}`;
};

const isSpotifyUrl = (value) => /spotify\.com\/(track|playlist|album)\//i.test(value || "");
const isUrl = (value) => /^https?:\/\//i.test(value || "");
const isYoutubePlaylistUrl = (value) => {
    if (!value) return false;
    return /(?:youtube\.com\/(?:playlist\?list=|watch\?.*list=)|youtu\.be\/[^?]+\?list=)/i.test(value);
};

class MusicManager {
    constructor(client) {
        this.client = client;
        this.events = new EventEmitter();
        this.queues = new Map();
    }

    getQueue(guildId) {
        return this.queues.get(guildId);
    }

    ensureQueue(guild, metadata) {
        let queue = this.queues.get(guild.id);
        if (queue) {
            queue.metadata = metadata;
            return queue;
        }

        const player = createAudioPlayer();
        queue = {
            guildId: guild.id,
            guild,
            metadata,
            connection: null,
            player,
            currentProcess: null,
            tracks: [],
            currentTrack: null,
            volume: 100,
            startedAt: 0,
            pausedAt: 0,
            totalPausedMs: 0,
            inactivityTimer: null,
        };

        player.on(AudioPlayerStatus.Idle, async () => {
            this.cleanupCurrentProcess(queue);
            await this.playNext(queue);
        });

        player.on("error", async (error) => {
            this.cleanupCurrentProcess(queue);
            this.events.emit("error", queue, error);
            await this.playNext(queue);
        });

        this.queues.set(guild.id, queue);
        return queue;
    }

    async connect(queue, voiceChannel) {
        if (!queue.connection) {
            queue.connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: true,
            });

            queue.connection.on("error", (error) => {
                this.events.emit("error", queue, error);
                this.destroyQueue(queue.guildId);
            });

            queue.connection.on(VoiceConnectionStatus.Disconnected, async () => {
                const botMember = queue.guild.members.me;
                if (!botMember || !botMember.voice.channelId) {
                    this.destroyQueue(queue.guildId);
                    return;
                }

                try {
                    await Promise.race([
                        entersState(queue.connection, VoiceConnectionStatus.Signalling, 5_000),
                        entersState(queue.connection, VoiceConnectionStatus.Connecting, 5_000),
                    ]);
                } catch {
                    this.destroyQueue(queue.guildId);
                }
            });
        }

        queue.connection.subscribe(queue.player);
        try {
            await entersState(queue.connection, VoiceConnectionStatus.Ready, 20_000);
        } catch (error) {
            this.events.emit("error", queue, error);
            this.destroyQueue(queue.guildId);
            throw new Error("No se pudo establecer conexion de voz. Revisa permisos/canal e intenta de nuevo.");
        }
    }

    async resolveTracks(query, requestedBy) {
        if (isSpotifyUrl(query)) {
            const spotifyTracks = await this.resolveSpotify(query, requestedBy);
            if (spotifyTracks.length > 0) return spotifyTracks;
        }

        if (isUrl(query)) {
            if (isYoutubePlaylistUrl(query)) {
                const ytPlaylistTracks = await this.resolveYoutubePlaylist(query, requestedBy);
                if (ytPlaylistTracks.length > 0) return ytPlaylistTracks;
            }

            const extracted = await this.extractEntries(query);
            if (extracted.length > 0) {
                return extracted
                    .slice(0, MAX_PLAYLIST_ITEMS)
                    .map((entry) => this.normalizeTrack(entry, requestedBy))
                    .filter((track) => !!track.url);
            }
        }

        const search = await this.extractSingle(`ytsearch1:${query}`);
        if (!search) return [];
        return [this.normalizeTrack(search, requestedBy)];
    }

    async resolveSpotify(url, requestedBy) {
        const entries = await this.extractEntries(url, true);
        if (entries.length === 0) return [];

        const tracks = [];
        for (const item of entries.slice(0, MAX_PLAYLIST_ITEMS)) {
            const artist = item.artist || item.uploader || "";
            const title = item.track || item.title || "";
            const query = `${title} ${artist}`.trim();
            if (!query) continue;
            const yt = await this.extractSingle(`ytsearch1:${query}`);
            if (!yt) continue;
            tracks.push(this.normalizeTrack(yt, requestedBy));
        }

        return tracks;
    }

    async resolveYoutubePlaylist(url, requestedBy) {
        const entries = await this.extractEntries(url, true);
        if (!entries.length) return [];

        const tracks = [];
        for (const item of entries.slice(0, MAX_PLAYLIST_ITEMS)) {
            const entryUrl = this.getEntryPlayableUrl(item);
            if (!entryUrl) continue;

            const full = await this.extractSingle(entryUrl);
            if (!full) continue;

            const normalized = this.normalizeTrack(full, requestedBy);
            if (normalized.url) tracks.push(normalized);
        }

        return tracks;
    }

    getEntryPlayableUrl(entry) {
        if (!entry || typeof entry !== "object") return null;

        if (typeof entry.webpage_url === "string" && /^https?:\/\//i.test(entry.webpage_url)) {
            return entry.webpage_url;
        }

        if (typeof entry.url === "string") {
            if (/^https?:\/\//i.test(entry.url)) return entry.url;
            if (/^[a-zA-Z0-9_-]{6,}$/.test(entry.url)) {
                return `https://www.youtube.com/watch?v=${entry.url}`;
            }
        }

        if (typeof entry.id === "string" && /^[a-zA-Z0-9_-]{6,}$/.test(entry.id)) {
            return `https://www.youtube.com/watch?v=${entry.id}`;
        }

        return null;
    }

    async extractSingle(urlOrQuery) {
        let raw;
        try {
            raw = await ytdlp(urlOrQuery, {
                dumpSingleJson: true,
                noWarnings: true,
                noCheckCertificates: true,
                ignoreErrors: true,
                defaultSearch: "ytsearch1",
                flatPlaylist: false,
            });
        } catch {
            return null;
        }
        const parsed = parseYtdlpOutput(raw);
        if (!parsed || typeof parsed !== "object") return null;
        if (parsed.entries && Array.isArray(parsed.entries) && parsed.entries.length > 0) {
            return parsed.entries[0];
        }
        return parsed;
    }

    async extractEntries(url, allowFlat = false) {
        let raw;
        try {
            raw = await ytdlp(url, {
                dumpSingleJson: true,
                noWarnings: true,
                noCheckCertificates: true,
                ignoreErrors: true,
                flatPlaylist: allowFlat,
                playlistEnd: MAX_PLAYLIST_ITEMS,
            });
        } catch {
            return [];
        }
        const parsed = parseYtdlpOutput(raw);
        if (!parsed) return [];
        if (Array.isArray(parsed.entries)) {
            return parsed.entries.filter(Boolean);
        }
        if (typeof parsed === "object") {
            return [parsed];
        }
        return [];
    }

    normalizeTrack(raw, requestedBy) {
        const source = raw.extractor_key || raw.extractor || "youtube";
        const url = raw.webpage_url || raw.url || raw.original_url || "";
        const seconds = Number(raw.duration) || 0;
        return {
            title: raw.title || "Desconocido",
            author: raw.artist || raw.uploader || raw.channel || "Desconocido",
            duration: formatDuration(seconds),
            durationSeconds: seconds,
            source,
            views: raw.view_count ? String(raw.view_count) : "N/A",
            thumbnail: raw.thumbnail || null,
            url,
            requestedBy,
        };
    }

    async getStreamUrl(trackUrl) {
        const raw = await ytdlp(trackUrl, {
            getUrl: true,
            format: "bestaudio[ext=webm]/bestaudio/best",
            noWarnings: true,
            noCheckCertificates: true,
            ignoreErrors: true,
        });
        if (typeof raw === "string") {
            const firstLine = raw.split("\n").find(Boolean);
            return (firstLine || "").trim();
        }
        return String(raw || "").trim();
    }

    createStreamProcess(trackUrl) {
        return ytdlp.exec(trackUrl, {
            output: "-",
            format: "bestaudio[ext=webm]/bestaudio/best",
            noWarnings: true,
            noCheckCertificates: true,
            ignoreErrors: true,
            noPlaylist: true,
            quiet: true,
        });
    }

    cleanupCurrentProcess(queue) {
        const proc = queue?.currentProcess;
        if (!proc) return;
        queue.currentProcess = null;

        try {
            if (proc.exitCode === null && !proc.killed) {
                if (typeof proc.cancel === "function") {
                    proc.cancel();
                } else {
                    proc.kill("SIGTERM");
                }
            }
        } catch {
        }
    }

    clearInactivityTimer(queue) {
        if (!queue || !queue.inactivityTimer) return;
        clearTimeout(queue.inactivityTimer);
        queue.inactivityTimer = null;
    }

    scheduleInactivityDisconnect(queue) {
        if (!queue || !queue.connection) return;
        this.clearInactivityTimer(queue);

        queue.inactivityTimer = setTimeout(async () => {
            const latestQueue = this.getQueue(queue.guildId);
            if (!latestQueue) return;

            if (latestQueue.currentTrack || latestQueue.tracks.length > 0) return;

            this.leave(queue.guildId);
            try {
                await latestQueue.metadata.channel.send({
                    content: "No hubo actividad por 3 minutos, asi que sali del canal de voz.",
                });
            } catch {
            }
        }, INACTIVITY_LEAVE_MS);
    }

    isPlaying(queue) {
        if (!queue || !queue.currentTrack) return false;
        return queue.player.state.status === AudioPlayerStatus.Playing;
    }

    isPaused(queue) {
        if (!queue || !queue.currentTrack) return false;
        return queue.player.state.status === AudioPlayerStatus.Paused;
    }

    getProgress(queue) {
        if (!queue || !queue.currentTrack) return null;
        const duration = queue.currentTrack.durationSeconds;
        if (!duration || !Number.isFinite(duration)) {
            return {
                percent: "Infinity",
                bar: "LIVE ◉",
            };
        }

        const now = Date.now();
        const pausedMs = queue.totalPausedMs + (queue.pausedAt ? now - queue.pausedAt : 0);
        const elapsedSec = Math.min(duration, Math.max(0, Math.floor((now - queue.startedAt - pausedMs) / 1000)));
        const percent = Math.floor((elapsedSec / duration) * 100);
        const blocks = 18;
        const filled = Math.max(0, Math.min(blocks, Math.round((elapsedSec / duration) * blocks)));
        const bar = `${"= ".repeat(Math.max(0, filled - 1))}◉${" -".repeat(Math.max(0, blocks - filled))}`.trim();
        return {
            percent: String(percent),
            bar: `${bar} ${formatDuration(elapsedSec)} / ${formatDuration(duration)}`,
        };
    }

    async enqueue(guild, metadata, voiceChannel, query, requestedBy) {
        const queue = this.ensureQueue(guild, metadata);
        this.clearInactivityTimer(queue);
        await this.connect(queue, voiceChannel);

        const tracks = await this.resolveTracks(query, requestedBy);
        if (tracks.length === 0) {
            return { queue, addedTracks: [], started: false };
        }

        for (const track of tracks) {
            queue.tracks.push(track);
        }

        if (tracks.length === 1) {
            this.events.emit("audioTrackAdd", queue, tracks[0]);
        } else {
            this.events.emit("audioTracksAdd", queue, tracks);
        }

        let started = false;
        if (!queue.currentTrack && queue.player.state.status !== AudioPlayerStatus.Playing) {
            started = await this.playNext(queue);
        }

        return { queue, addedTracks: tracks, started };
    }

    async playNext(queue) {
        const nextTrack = queue.tracks.shift();
        if (!nextTrack) {
            this.cleanupCurrentProcess(queue);
            queue.currentTrack = null;
            queue.startedAt = 0;
            queue.pausedAt = 0;
            queue.totalPausedMs = 0;
            this.scheduleInactivityDisconnect(queue);
            return false;
        }

        try {
            this.cleanupCurrentProcess(queue);
            const streamProcess = this.createStreamProcess(nextTrack.url);
            queue.currentProcess = streamProcess;

            let stderrBuffer = "";
            streamProcess.stderr?.on("data", (chunk) => {
                if (stderrBuffer.length > 800) return;
                stderrBuffer += String(chunk || "");
            });

            streamProcess.once("close", (code) => {
                if (code === 0) return;
                if (queue.currentTrack !== nextTrack) return;
                const details = stderrBuffer.trim();
                this.events.emit(
                    "error",
                    queue,
                    new Error(
                        details
                            ? `Fallo el stream de audio (codigo ${code}): ${details}`
                            : `Fallo el stream de audio (codigo ${code}).`,
                    ),
                );
            });

            if (!streamProcess.stdout) {
                throw new Error("No se pudo iniciar el stream de audio.");
            }

            const resource = createAudioResource(streamProcess.stdout, {
                inputType: StreamType.Arbitrary,
                inlineVolume: true,
            });
            resource.volume.setVolume(queue.volume / 100);

            queue.currentTrack = nextTrack;
            queue.startedAt = Date.now();
            queue.pausedAt = 0;
            queue.totalPausedMs = 0;
            this.clearInactivityTimer(queue);
            queue.player.play(resource);
            this.events.emit("playerStart", queue, nextTrack);
            return true;
        } catch (error) {
            this.cleanupCurrentProcess(queue);
            this.events.emit("error", queue, error);
            return this.playNext(queue);
        }
    }

    pause(queue) {
        if (!queue || !queue.currentTrack) return false;
        const paused = queue.player.pause();
        if (paused && !queue.pausedAt) {
            queue.pausedAt = Date.now();
        }
        return paused;
    }

    resume(queue) {
        if (!queue || !queue.currentTrack) return false;
        const resumed = queue.player.unpause();
        if (resumed && queue.pausedAt) {
            queue.totalPausedMs += Date.now() - queue.pausedAt;
            queue.pausedAt = 0;
        }
        return resumed;
    }

    skip(queue) {
        if (!queue || !queue.currentTrack) return false;
        this.cleanupCurrentProcess(queue);
        return queue.player.stop();
    }

    setVolume(queue, volume) {
        if (!queue || !Number.isFinite(volume)) return false;
        queue.volume = Math.max(0, Math.min(100, volume));
        const resource = queue.player.state.resource;
        if (resource && resource.volume) {
            resource.volume.setVolume(queue.volume / 100);
        }
        return true;
    }

    clearQueue(queue) {
        if (!queue) return false;
        this.clearInactivityTimer(queue);
        queue.tracks = [];
        queue.currentTrack = null;
        queue.startedAt = 0;
        queue.pausedAt = 0;
        queue.totalPausedMs = 0;
        this.cleanupCurrentProcess(queue);
        queue.player.stop(true);
        if (queue.connection) {
            queue.connection.destroy();
            queue.connection = null;
        }
        this.queues.delete(queue.guildId);
        return true;
    }

    leave(guildId) {
        const queue = this.queues.get(guildId);
        if (!queue) return false;
        return this.clearQueue(queue);
    }

    shouldLeaveBecauseAlone(queue) {
        if (!queue || !queue.metadata || !queue.metadata.vc) return false;
        const channel = queue.metadata.vc;
        if (!channel || !channel.members) return false;
        const nonBotMembers = channel.members.filter((member) => !member.user.bot).size;
        return nonBotMembers === 0;
    }

    destroyQueue(guildId) {
        const queue = this.queues.get(guildId);
        if (!queue) return;
        this.clearInactivityTimer(queue);
        queue.tracks = [];
        queue.currentTrack = null;
        this.cleanupCurrentProcess(queue);
        queue.player.stop(true);
        if (queue.connection) queue.connection.destroy();
        this.queues.delete(guildId);
    }
}

module.exports = { MusicManager };
