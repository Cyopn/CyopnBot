const Discord = require("discord.js");
const donut = require('donutapi')
module.exports.run = async(client, message, args) => {
    try {
        let neko = await donut.neko()
        let embed = new Discord.MessageEmbed()
            .setTitle('Nya')
            .setDescription(`Pedido por: ${message.author.tag}`)
            .setColor("RANDOM")
            .setImage(neko)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "neko",
    aliases: ['nk']
}