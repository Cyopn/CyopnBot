const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let sc = await star.suicide()
        let embed = new Discord.MessageEmbed()
            .setTitle(`**${message.author.username}** se auto-mato`)
            .setColor("RANDOM")
            .setImage(sc)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "suicide",
    aliases: ['sc']
}