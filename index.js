const {
	Client,
	GatewayIntentBits,
	Collection,
	ActivityType,
	EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
const { MusicManager } = require("./lib/musicPlayer");
require("dotenv").config();
const { token, prefix, port } = process.env;
let command = new Collection();
let alias = new Collection();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.get("/", (request, response) => {
	response.json({ info: "Servidor en linea" });
});

app.listen(port, () => {
	console.log(`Aplicacion oyendo el puerto ${port}.`);
});

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
	],
});

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	let jsfile = files.filter((f) => f.split(".").pop() === "js");
	if (jsfile.length <= 0) return console.log("No se encontro ningun comando");
	jsfile.forEach((f) => {
		let pull = require(`./commands/${f}`);
		command.set(pull.config.name, pull);
		pull.config.alias.forEach((v) => {
			alias.set(v, pull.config.name);
		});
	});
});

const player = new MusicManager(client);

client.once("clientReady", () => {
	console.log("Cliente listo");
	const guilds = client.guilds.cache.map((guild) => guild.name);
	client.user.setPresence({
		activities: [
			{
				name: `nose w - Presente en ${guilds.length} servidores`,
				type: ActivityType.Playing,
			},
		],
		status: "dnd",
	});
});

client.on("messageCreate", (message) => {
	if (!message.guild || message.author.bot) return;
	const msg = message.content;
	if (msg.startsWith(prefix) && msg.length > 1) {
		const args = msg.slice(prefix.length).trim().split(" ");
		const cmd = args.shift().toLowerCase();
		const cm = command.get(cmd) || command.get(alias.get(cmd));
		if (!cm) return;
		try {
			cm.run(client, message, args, player);
		} catch (e) {
			console.error("Error al ejecutar comando", e);
		}
	}
});

client.on("voiceStateUpdate", async (oldState, newState) => {
	const queue = player.getQueue(newState.guild.id);
	if (!queue || !queue.metadata || !queue.metadata.vc) return;

	const queueChannelId = queue.metadata.vc.id;
	const changedQueueChannel = oldState.channelId === queueChannelId || newState.channelId === queueChannelId;
	if (!changedQueueChannel) return;

	if (oldState.id === client.user.id && oldState.channelId === queueChannelId && !newState.channelId) {
		player.destroyQueue(newState.guild.id);
		return;
	}

	if (!player.shouldLeaveBecauseAlone(queue)) return;

	player.leave(newState.guild.id);
	try {
		await queue.metadata.channel.send({
			content: "No quedaba nadie en el canal de voz, asi que sali automaticamente.",
		});
	} catch {
	}
});

player.events.on("playerStart", (queue, track) => {
	let { author, duration, source, views, title, requestedBy, url } = track;
	const requestedByText = requestedBy ? `<@${requestedBy}>` : "Desconocido";
	let embed = new EmbedBuilder()
		.setTitle(`Reproduciendo`)
		.setDescription(
			`Estas escuchando ${title} en el canal de voz ${queue.metadata.vc.name}.\nPedido por ${requestedByText}`,
		)
		.addFields(
			{ name: "Autor", value: `${author}`, inline: true },
			{ name: "Duracion", value: `${duration}`, inline: true },
			{ name: "Fuente", value: `[${source}](${url})`, inline: true },
			{ name: "Vistas", value: `${views}`, inline: true },
		)
		.setThumbnail(track.thumbnail || null)
		.setColor(Math.floor(Math.random() * 16777214) + 1)
		.setFooter({ text: "CyopnBot" })
		.setTimestamp();
	queue.metadata.channel.send({ embeds: [embed] });
});

player.events.on("audioTrackAdd", (queue, track) => {
	const requestedByText = track.requestedBy ? `<@${track.requestedBy}>` : "Desconocido";
	let embed = new EmbedBuilder()
		.setTitle(`Reproduciendo`)
		.setDescription(
			`Se agrego a la lista de reproduccion ${track.title} en el canal de voz ${queue.metadata.vc.name}.\nPedido por ${requestedByText}`,
		)
		.setThumbnail(track.thumbnail || null)
		.setColor(Math.floor(Math.random() * 16777214) + 1)
		.setFooter({ text: "CyopnBot" })
		.setTimestamp();
	queue.metadata.channel.send({ embeds: [embed] });
});

player.events.on("audioTracksAdd", (queue, tracks) => {
	const requestedByText = tracks[0]?.requestedBy ? `<@${tracks[0].requestedBy}>` : "Desconocido";
	let embed = new EmbedBuilder()
		.setTitle(`Reproduciendo`)
		.setDescription(
			`Se agregaron **${tracks.length}** canciones a la lista de reproduccion en el canal de voz ${queue.metadata.vc.name}.\nPedido por ${requestedByText}`,
		)
		.setThumbnail(tracks[0].thumbnail || null)
		.setColor(Math.floor(Math.random() * 16777214) + 1)
		.setFooter({ text: "CyopnBot" })
		.setTimestamp();
	queue.metadata.channel.send({ embeds: [embed] });
});

player.events.on("error", (queue, error) => {
	console.error("[MusicPlayerError]", error);
});

client.login(token);