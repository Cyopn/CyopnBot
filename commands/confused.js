const { EmbedBuilder } = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args, player) => {
    try {
        let cf = await star.confused()
        let embed = new EmbedBuilder()
            .setTitle(`**${message.author.username}** esta confundid@ `)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setImage(cf)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "confused",
    aliases: ['cf']
}