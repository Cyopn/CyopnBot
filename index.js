const { GatewayIntentBits } = require("discord-api-types/v10");
const { Collection, Client, EmbedBuilder } = require("discord.js");
const path = require("path");
let commands = new Collection();
let aliases = new Collection();
const fs = require("fs");
const { Player } = require("discord-player");
const dotenv = require("dotenv").config();
const config = process.env;

// Hosting
/* const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('nose'))

app.listen(port, () =>
  console.log(`App listener: http://localhost:${port}`)
); */

// Hosting

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
});

const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnEndCooldown: true,
  leaveOnStop: false,
  leaveOnEmpty: false,
  leaveOnEmptyCooldown: 1000,
  ytdlOptions: {
    filter: "audioonly",
  },
});

fs.readdir("./commands/", (err, files) => {
  if (!files) return;
  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) return console.log("No se encontro ningun comando");
  jsfile.forEach((f) => {
    let pull = require(`./commands/${f}`);
    commands.set(pull.config.name, pull);
    pull.config.aliases.forEach((alias) => {
      aliases.set(alias, pull.config.name);
    });
  });
});

client.once("ready", () => {
  console.log(`${client.user.username} listo`);
  client.user.setPresence({
    activities: [{ name: `nose`, type: 0, url: `www.instagram.com/Cyopn_` }],
    status: 'dnd',
  });
});

client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  if (message.content.indexOf(config.prefix) != 0) return;
  let args = message.content.slice(config.prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  const commandFile =
    commands.get(command) || commands.get(aliases.get(command));
  if (!commandFile) return;
  try {
    commandFile.run(client, message, args, player);
  } catch (e) {
    console.log(e)
    return message.reply(`Un error ocurrio en ${command}: \n${e.message}`);
  }
});

player.on("trackStart", (queue, track) => {
  let { author, duration, source, views, title, requestedBy, url } = track;
  let embed = new EmbedBuilder()
    .setTitle(`Reproduciendo`)
    .setDescription(
      `Estas escuchando ${title} en el canal de voz ${queue.connection.channel.name}.\nPedido por ${requestedBy}`
    )
    .addFields(
      { name: "Autor", value: `${author}`, inline: true },
      { name: "Duracion", value: `${duration}`, inline: true },
      { name: "Fuente", value: `[${source}](${url})`, inline: true },
      { name: "Vistas", value: `${views}`, inline: true }
    )
    .setThumbnail(track.thumbnail)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();
  queue.metadata.channel.send({ embeds: [embed] });
});

player.on("trackAdd", (queue, track) => {
  let embed = new EmbedBuilder()
    .setTitle(`Reproduciendo`)
    .setDescription(
      `Se agrego a la lista de reproduccion ${track.title} en el canal de voz ${queue.connection.channel.name}.\nPedido por ${track.requestedBy}`
    )
    .setThumbnail(track.thumbnail)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();
  queue.metadata.channel.send({ embeds: [embed] });
});

player.on("connectionError", (queue, error) => {
  console.log(error)
  let embed = new EmbedBuilder()
    .setTitle(`Error de conexion`)
    .setDescription(`${error}\nEscribe +soporte para obtener ayuda o vuelve a intentarlo`)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();
  queue.metadata.channel.send({ embeds: [embed] });
});

player.on("error", (queue, error) => {
  console.log(error)
  if (error.includes("Error [ERR_STREAM_PREMATURE_CLOSE]: Premature close")) {
    return
  } else {
    let embed = new EmbedBuilder()
      .setTitle(`Error con el reproductor`)
      .setDescription(`${error}\nEscribe +soporte para obtener ayuda o vuelve a intentarlo`)
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setFooter({ text: "CyopnBot" })
      .setTimestamp();
    queue.metadata.channel.send({ embeds: [embed] });
  }
});

player.on("tracksAdd", (queue, tracks) => {
  let embed = new EmbedBuilder()
    .setTitle(`Reproduciendo`)
    .setDescription(
      `Se agregaron **${tracks.length}** canciones a la lista de reproduccion en el canal de voz ${queue.connection.channel.name}.\nPedido por ${tracks[0].requestedBy}`
    )
    .setThumbnail(tracks[0].thumbnail)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();

  queue.metadata.channel.send({ embeds: [embed] });
});

client.login(config.token);
