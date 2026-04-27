const { createEmbed } = require("../lib/functions.js");

const MAX_TTS_TEXT = 160;
const TTS_COOLDOWN_MS = 4500;
const ttsCooldownByUser = new Map();

const LANGUAGE_ALIASES = {
    es: "es",
    espanol: "es",
    spanish: "es",
    en: "en",
    ingles: "en",
    english: "en",
    pt: "pt",
    portugues: "pt",
    fr: "fr",
    frances: "fr",
    de: "de",
    aleman: "de",
    it: "it",
    italiano: "it",
    ja: "ja",
    japones: "ja",
    ko: "ko",
    coreano: "ko",
};

const normalizeLang = (value) => {
    const raw = String(value || "").toLowerCase().trim();
    if (!raw) return "es";
    return LANGUAGE_ALIASES[raw] || raw;
};

const parseTtsArgs = (args) => {
    const parsed = {
        action: "speak",
        lang: "es",
        persona: null,
        omitPersona: false,
        text: "",
    };

    if (!args.length) return parsed;

    const first = String(args[0] || "").toLowerCase();
    if (first === "skip" || first === "omitir") {
        parsed.action = "skip";
        return parsed;
    }
    if (first === "stop" || first === "terminar") {
        parsed.action = "stop";
        return parsed;
    }
    if (first === "langs" || first === "idiomas") {
        parsed.action = "langs";
        return parsed;
    }

    const textParts = [];
    for (let i = 0; i < args.length; i++) {
        const token = String(args[i] || "").trim();
        const lower = token.toLowerCase();

        if (lower === "--lang" || lower === "-l") {
            parsed.lang = normalizeLang(args[i + 1]);
            i++;
            continue;
        }

        if (lower.startsWith("--lang=")) {
            parsed.lang = normalizeLang(token.slice("--lang=".length));
            continue;
        }

        if (lower === "--persona" || lower === "-p") {
            parsed.persona = String(args[i + 1] || "").trim() || null;
            i++;
            continue;
        }

        if (lower.startsWith("--persona=")) {
            parsed.persona = token.slice("--persona=".length).trim() || null;
            continue;
        }

        if (lower === "--sin-persona" || lower === "--omitir-persona") {
            parsed.omitPersona = true;
            continue;
        }

        textParts.push(token);
    }

    parsed.text = textParts.join(" ").trim();
    return parsed;
};

module.exports.run = async (client, message, args, player) => {
    try {
        const options = parseTtsArgs(args);

        if (options.action === "langs") {
            return message.reply({
                embeds: [
                    await createEmbed(
                        "random",
                        "Idiomas TTS",
                        "Usa --lang <codigo>. Ejemplos: es, en, pt, fr, de, it, ja, ko",
                    ),
                ],
            });
        }

        const voiceChannel = message.member.voice.channel
            ? message.member.voice.channel
            : null;
        if (voiceChannel == null) {
            return message.reply({
                embeds: [
                    await createEmbed(
                        "Advertencia",
                        "Advertencia",
                        "Debes estar en un canal de voz.",
                    ),
                ],
            });
        }

        const queue = player.getQueue(message.guild.id);
        if (queue && queue.metadata.vc.id !== voiceChannel.id) {
            return message.reply({
                embeds: [
                    await createEmbed(
                        "Advertencia",
                        "Advertencia",
                        "Debes estar en el mismo canal de voz que yo.",
                    ),
                ],
            });
        }

        if (options.action === "skip") {
            const skipped = player.skipTts(message.guild.id);
            if (!skipped) {
                return message.reply({
                    embeds: [
                        await createEmbed(
                            "Advertencia",
                            "Advertencia",
                            "No hay un TTS activo para omitir.",
                        ),
                    ],
                });
            }
            return message.react("⏭️");
        }

        if (options.action === "stop") {
            const stopped = player.stopTts(message.guild.id);
            if (!stopped) {
                return message.reply({
                    embeds: [
                        await createEmbed(
                            "Advertencia",
                            "Advertencia",
                            "No hay TTS activo ni en cola para terminar.",
                        ),
                    ],
                });
            }
            return message.react("🛑");
        }

        const cooldownKey = `${message.guild.id}:${message.author.id}`;
        const now = Date.now();
        const lastUsedAt = ttsCooldownByUser.get(cooldownKey) || 0;
        const remaining = TTS_COOLDOWN_MS - (now - lastUsedAt);
        if (remaining > 0) {
            return message.reply({
                embeds: [
                    await createEmbed(
                        "Advertencia",
                        "Cooldown",
                        `Espera ${Math.ceil(remaining / 1000)}s antes de enviar otro TTS.`,
                    ),
                ],
            });
        }

        let text = options.text;
        if (!text) {
            return message.reply({
                embeds: [
                    await createEmbed(
                        "Advertencia",
                        "Advertencia",
                        "Debes escribir un texto para convertir a voz.",
                    ),
                ],
            });
        }

        let wasTrimmed = false;
        if (text.length > MAX_TTS_TEXT) {
            wasTrimmed = true;
            text = `${text.slice(0, MAX_TTS_TEXT - 3)}...`;
        }

        const speakerName = options.persona || message.member.displayName || message.author.username;
        ttsCooldownByUser.set(cooldownKey, now);
        const result = await player.speak(
            message.guild,
            { channel: message.channel, vc: voiceChannel },
            voiceChannel,
            text,
            {
                speakerName,
                includeSpeaker: !options.omitPersona,
                lang: options.lang,
            },
        );

        const trimNote = wasTrimmed ? "\nNota: el texto se recorto a 160 caracteres." : "";
        await message.reply({
            embeds: [
                await createEmbed(
                    "random",
                    "TTS",
                    `Reproduciendo (${result.lang}): ${result.spokenText}${trimNote}`,
                ),
            ],
        });
    } catch (e) {
        console.log(e);
        const details = e && e.message ? e.message : String(e);
        if (details.includes("cancelado")) {
            return;
        }
        message.reply({
            embeds: [
                await createEmbed(
                    "Error",
                    "Error",
                    `Ocurrio un error al intentar usar el TTS.\n${details}`,
                ),
            ],
        });
    }
};

module.exports.config = {
    name: `tts`,
    alias: [`say`, `decir`, `speak`],
    type: `misc`,
    description: `Reproduce un mensaje TTS en el canal de voz actual.`,
    fulldesc: `Comando para convertir texto a voz en espanol/otros idiomas. Opciones: --lang, --persona, --sin-persona, skip, stop, langs. Si hay musica, se pausa para TTS y luego se reanuda automaticamente.`,
};
