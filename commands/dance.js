const { EmbedBuilder } = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args, player) => {
    try {
        let dn = await star.dance()
        let embed = new EmbedBuilder()
            .setDescription(`**${message.author.username}** esta bailando `)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
            .setImage(dn)
        message.reply({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "dance",
    aliases: ['dn']
}