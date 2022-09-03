const { EmbedBuilder } = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args, player) => {
    try {
        let pout = await donut.pout()
        let embed = new EmbedBuilder()
            .setTitle(`**${message.author.username}** esta triste`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setImage(pout)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
}

module.exports.config = {
    name: "pout",
    aliases: ['pt']
}