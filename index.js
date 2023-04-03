const { GatewayIntentBits } = require("discord-api-types/v10");
const {
  Collection,
  Client,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
let commands = new Collection();
let aliases = new Collection();
const fs = require("fs");
const { Player } = require("discord-player");
const { lvlFunc } = require("./lib/functions");
const dotenv = require("dotenv").config();
const config = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
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

  const guilds = client.guilds.cache.map((guild) => guild.name);
  console.log(guilds);

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

client.on("messageCreate", async (message) => {
  await lvlFunc(message);
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
    console.log(e);
    return message.reply(
      `Un error ocurrio al ejecutar el comando ${command}: \nDescripcion: \n${e.message}`
    );
  }
});

player.events.on("playerStart", (queue, track) => {
  let { author, duration, source, views, title, requestedBy, url } = track;
  let embed = new EmbedBuilder()
    .setTitle(`Reproduciendo`)
    .setDescription(
      `Estas escuchando ${title} en el canal de voz ${queue.metadata.channel.guild.name}.\nPedido por ${requestedBy}`
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

player.events.on("audioTrackAdd", (queue, track) => {
  let embed = new EmbedBuilder()
    .setTitle(`Reproduciendo`)
    .setDescription(
      `Se agrego a la lista de reproduccion ${track.title} en el canal de voz ${queue.metadata.channel.guild.name}.\nPedido por ${track.requestedBy}`
    )
    .setThumbnail(track.thumbnail)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();
  queue.metadata.channel.send({ embeds: [embed] });
});

player.on("connectionError", (queue, error) => {
  let embed = new EmbedBuilder()
    .setTitle(`Error con el reproductor`)
    .setDescription(
      `${error}\nEscribe +soporte para obtener ayuda o vuelve a intentarlo`
    )
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();
  queue.metadata.channel.send({ embeds: [embed] });
});

player.on("error", (queue, error) => {});
player.events.on("audioTracksAdd", (queue, tracks) => {
  let embed = new EmbedBuilder()
    .setTitle(`Reproduciendo`)
    .setDescription(
      `Se agregaron **${tracks.length}** canciones a la lista de reproduccion en el canal de voz ${queue.metadata.channel.guild.name}.\nPedido por ${tracks[0].requestedBy}`
    )
    .setThumbnail(tracks[0].thumbnail)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();

  queue.metadata.channel.send({ embeds: [embed] });
});

player.events.on("playerError", (queue, error) => {
  let embed = new EmbedBuilder()
    .setTitle(`Error con el reproductor`)
    .setDescription(
      `${error}\nEscribe +soporte para obtener ayuda o vuelve a intentarlo`
    )
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();
  queue.metadata.channel.send({ embeds: [embed] });
});

client.login(config.token);
