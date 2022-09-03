const { EmbedBuilder } = require("discord.js");
const { getRed } = require("../lib/functions");

module.exports.run = async (client, message, args, player) => {
  try {
    let urlRed = await getRed("ChingaTuMadreNoko");
    const { subreddit, title, url, author } = urlRed.data;
    const embed = new EmbedBuilder()
      .setTitle(`holis bonis`)
      .setDescription(`**${title}.**\nPublicado en ${subreddit} por ${author}. \nPedido por ${message.author}.`)
      .setImage(url)
      .setFooter({ text: "CyopnBot" })
      .setTimestamp();
    message.reply({ embeds: [embed] });
  } catch (e) {
    console.log(e);
  }
};
module.exports.config = {
  name: "meme",
  aliases: ["mm"],
};
