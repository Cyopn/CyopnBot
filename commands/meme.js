const { EmbedBuilder } = require("discord.js");
const ex = require("child_process").execSync
const { loadJson } = require("../lib/functions")

module.exports.run = async (client, message, args, player) => {
  try {
    const rs = ex(`python ./lib/python/meme.py`, { encoding: "utf8" })


    loadJson().then(r => {
      const embed = new EmbedBuilder()
      .setDescription(`**${r.title}**\nPublicado por ${r.author}. \nPedido por ${message.author}.`)
      .setImage(r.url)
      .setFooter({ text: "CyopnBot" })
      .setTimestamp();
    message.reply({ embeds: [embed] });
  })
  } catch (e) {
    console.log(e);
  }
};
module.exports.config = {
  name: "meme",
  aliases: ["m"],
};
