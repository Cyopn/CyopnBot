const Discord = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');

        } else {
            let lick = await donut.lick()
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}** lamio a **${miembro.username}**`)
                .setColor("RANDOM")
                .setImage(lick)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "lick",
    aliases: ['lc']
}