const Discord = require("discord.js");
const Canvas = require('canvas')
module.exports.run = async(client, message, args) => {
    let miembro = message.mentions.users.first();
    if (!miembro) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar de ${message.author.username}`)
            .setDescription(`[Avatar original](${message.author.displayAvatarURL()})`)
            .setImage(message.author.displayAvatarURL({ format:"png", size:512 }))
            .setColor("RANDOM")
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed);
    } else {
          const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar de ${miembro.username}`)
            .setDescription(`Pedido por: ${message.author.tag} \n[Avatar original](${miembro.displayAvatarURL()})`)
            .setImage(`${miembro.displayAvatarURL({ format:"png", size:512 })}`)
            .setColor("RANDOM")
            .setFooter(`CyopnBot`)
            .setTimestamp()
        message.channel.send(embed);
    }
}
module.exports.config = {
    name: "avatar",
    aliases: ['a']
}