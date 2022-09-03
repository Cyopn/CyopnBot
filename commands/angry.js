const { EmbedBuilder } = require("discord.js");
const donut = require("donutapi");
module.exports.run = async (client, message, args, player) => {
  try {
    let angry = await donut.angry();
    let embed = new EmbedBuilder()
      .setTitle(`**${message.author.username}** esta molesto `)
      .setDescription("Manten la calma")
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setImage(angry)
      .setFooter({ text: "CyopnBot" })
      .setTimestamp();
    message.reply({ embeds: [embed] });
  } catch (e) {
    console.log(e);
  }
};
module.exports.config = {
  name: "angry",
  aliases: ["an"],
};
