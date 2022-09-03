const { EmbedBuilder } = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args, player) => {
    try {
        let neko = await donut.neko()
        let embed = new EmbedBuilder()
            .setTitle('Nya')
            .setDescription(`Pedido por: ${message.author.tag}`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setImage(neko)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "neko",
    aliases: ['nk']
}