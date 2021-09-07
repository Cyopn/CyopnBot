const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');
        } else {
            let kc = await star.kick()
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}** pateo a **${miembro.username}**`)
                .setColor("RANDOM")
                .setImage(kc)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "kick",
    aliases: ['kc']
}