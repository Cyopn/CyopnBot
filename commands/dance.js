const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let dn = await star.dance()
        let embed = new Discord.MessageEmbed()
            .setDescription(`**${message.author.username}** esta bailando `)
            .setColor("RANDOM")
            .setFooter('CyopnBot')
            .setTimestamp()
            .setImage(dn)
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "dance",
    aliases: ['dn']
}