const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let cf = await star.confused()
        let embed = new Discord.MessageEmbed()
            .setTitle(`**${message.author.username}** esta confundid@ `)
            .setColor("RANDOM")
            .setImage(cf)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "confused",
    aliases: ['cf']
}