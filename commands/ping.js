const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args, player) => {
  let embed = new EmbedBuilder()
    .setTitle(`🏓 Pong!`)
    .setDescription(
      `Latencia del bot: ${message.createdTimestamp - Date.now()
      }ms.\n Latencia del API: ${Math.round(client.ws.ping)}ms.`
    );

  message.reply({ embeds: [embed] });
};
module.exports.config = {
  name: "ping",
  aliases: ["pg"],
};
