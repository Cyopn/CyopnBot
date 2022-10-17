const { EmbedBuilder } = require("discord.js");
const MessageEmbed = require("discord.js");

module.exports.run = async(client, message, args, player) => {
    const embed = new EmbedBuilder()
        .setTitle(`Invitame`)
        .setDescription(`[Enlace de invitacion](${client.config.inviteURI}) \n[Servidor de soporte](https://discord.gg/2HjDq3vgrk) \n[Contactame](https://instagram.com/Cyopn_)`)
        .setTimestamp()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setFooter({ text: 'CyopnBot' })
    message.reply({ embeds: [embed] });
}

module.exports.config = {
    name: "soporte",
    aliases: ['sp']
}