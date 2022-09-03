const { EmbedBuilder } = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args, player) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');

        } else {
            let fy = await star.fuckyou()
            let embed = new EmbedBuilder()
                .setTitle(`Chinga tu madre **${miembro.username}**`)
                .setDescription(`Con amor **${message.author.username}**`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setImage(fy)
                .setFooter({ text: 'CyopnBot' })
                .setTimestamp()
            message.reply({ embeds: [embed] })
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "fuckyou",
    aliases: ['fy']
}