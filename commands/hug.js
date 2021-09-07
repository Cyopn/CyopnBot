const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');

        } else {
            let hug = await star.hug()
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}** abrazo a **${miembro.username}**`)
                .setColor("RANDOM")
                .setImage(hug)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "hug",
    aliases: ['hg']
}