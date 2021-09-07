const Discord = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args) => {
    try {
        let pout = await donut.pout()
        let embed = new Discord.MessageEmbed()
            .setTitle(`**${message.author.username}** esta triste`)
            .setColor("RANDOM")
            .setImage(pout)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}

module.exports.config = {
    name: "pout",
    aliases: ['pt']
}