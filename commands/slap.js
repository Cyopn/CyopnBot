const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');
        } else {
            let sp = await star.slap()
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${message.author.username}** bofeteo a **${miembro.username}**`)
                .setColor("RANDOM")
                .setImage(sp)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "slap",
    aliases: ['sp']
}