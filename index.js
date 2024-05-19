const {
	Client,
	GatewayIntentBits,
	Collection,
	ActivityType,
	EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const { token, prefix } = process.env;
let command = new Collection();
let alias = new Collection();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

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

client.once("ready", () => {
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

client.login(token);


