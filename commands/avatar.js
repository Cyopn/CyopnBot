const { EmbedBuilder } = require("discord.js");
module.exports.run = async(client, message, args, player) => {
    let miembro = message.mentions.users.first();
    if (!miembro) {
        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${message.author.username}`)
            .setDescription(`[Avatar original](${message.author.displayAvatarURL()})`)
            .setImage(message.author.displayAvatarURL({ format:"png", size:512 }))
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] });
    } else {
          const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${miembro.username}`)
            .setDescription(`Pedido por: ${message.author.tag} \n[Avatar original](${miembro.displayAvatarURL()})`)
            .setImage(`${miembro.displayAvatarURL({ format:"png", size:512 })}`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] });
    }
}
module.exports.config = {
    name: "avatar",
    aliases: ['a']
}