const { EmbedBuilder } = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args, player) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');

        } else {
            let hug = await star.hug()
            let embed = new EmbedBuilder()
                .setTitle(`**${message.author.username}** abrazo a **${miembro.username}**`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setImage(hug)
                .setFooter({ text: 'CyopnBot' })
                .setTimestamp()
            message.reply({ embeds: [embed] })
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "hug",
    aliases: ['hg']
}