const Discord = require("discord.js");
const mm = require("discord-memes")
module.exports.run = async(client, message, args) => {
    try {
        let mem = mm.imagenesEspañol()
        const embed = new Discord.MessageEmbed()
            .setTitle("ola")
            .setDescription(`Pedido por: ${message.author.tag}`)
            .setImage(mem)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "meme",
    aliases: ['mm']
}