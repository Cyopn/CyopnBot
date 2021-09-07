const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let hp = await star.happy()
        let embed = new Discord.MessageEmbed()
            .setTitle(`**${message.author.username}** esta feliz :animeahhhhh:`)
            .setColor("RANDOM")
            .setImage(hp)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "happy",
    aliases: ['hp']
}