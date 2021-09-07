const Discord = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');
        } else {
            let pat = await donut.pat()
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}** acaricio a **${miembro.username}**`)
                .setColor("RANDOM")
                .setImage(pat)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "pat",
    aliases: ['pa']
}