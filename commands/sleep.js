const { EmbedBuilder } = require("discord.js");
const star = require('star-labs');
module.exports.run = async(client, message, args, player) => {
    try {
        let sl = await star.sleep()
        let embed = new EmbedBuilder()
            .setTitle(`**${message.author.username}** hora de momir`)
            .setDescription('Descansa princesa')
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setImage(sl)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "sleep",
    aliases: ['sl']
}