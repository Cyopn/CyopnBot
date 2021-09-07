const Discord = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');
        } else {
            let kiss = await donut.kiss()
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}** le dio un beso a **${miembro.username}**`)
                .setColor("RANDOM")
                .setImage(kiss)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "kiss",
    aliases: ['ks']
}