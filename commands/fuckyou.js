const Discord = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');

        } else {
            let fy = await star.fuckyou()
            let embed = new Discord.MessageEmbed()
                .setTitle(`Chinga tu madre **${miembro.username}**`)
                .setDescription(`Con amor **${message.author.username}**`)
                .setColor("RANDOM")
                .setImage(fy)
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "fuckyou",
    aliases: ['fy']
}