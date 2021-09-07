const Discord = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args) => {
    try {
        let angry = await donut.angry()
        let embed = new Discord.MessageEmbed()
            .setTitle(`**${message.author.username}** se emputo `)
            .setDescription('Manten la calma')
            .setColor("RANDOM")
            .setImage(angry)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "angry",
    aliases: ['an']
}