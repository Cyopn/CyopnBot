const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');
        } else {
            let kl = await star.kill()
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}** asesino a **${miembro.username}**`)
                .setColor("RANDOM")
                .setImage(kl)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "kill",
    aliases: ['kl']
}