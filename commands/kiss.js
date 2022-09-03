const { EmbedBuilder } = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args, player) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            message.channel.send('Debes mencionar a alguien');
        } else {
            let kiss = await donut.kiss()
            let embed = new EmbedBuilder()
                .setTitle(`**${message.author.username}** le dio un beso a **${miembro.username}**`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setImage(kiss)
                .setFooter({ text: 'CyopnBot' })
                .setTimestamp()
            message.reply({ embeds: [embed] })
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "kiss",
    aliases: ['ks']
}