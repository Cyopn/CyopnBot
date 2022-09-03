const { EmbedBuilder } = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args, player) => {
    try {
        let hp = await star.happy()
        let embed = new EmbedBuilder()
            .setTitle(`**${message.author.username}** esta feliz :animeahhhhh:`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setImage(hp)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "happy",
    aliases: ['hp']
}