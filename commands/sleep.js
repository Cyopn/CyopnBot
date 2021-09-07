const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let sl = await star.sleep()
        let embed = new Discord.MessageEmbed()
            .setTitle(`**${message.author.username}** hora de momir`)
            .setDescription('Descansa princesa')
            .setColor("RANDOM")
            .setImage(sl)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "sleep",
    aliases: ['sl']
}