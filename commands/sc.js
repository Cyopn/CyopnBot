const { EmbedBuilder } = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args, player) => {
    try {
        let sc = await star.suicide()
        let embed = new EmbedBuilder()
            .setTitle(`**${message.author.username}** se auto-mato`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setImage(sc)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "suicide",
    aliases: ['sc']
}