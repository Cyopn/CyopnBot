const Discord = require("discord.js");
const MessageEmbed = require("discord.js");

module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle(`Invitame`)
        .setDescription(`[Enlace de invitacion](${client.config.inviteURI}) \n[Servidor de soporte](https://discord.gg/2HjDq3vgrk) \n[Contactame](https://instagram.com/Cyopn_)`)
        .setTimestamp()
        .setFooter('CyopnBot')
    message.channel.send(embed);
}

module.exports.config = {
    name: "soporte",
    aliases: ['sp']
}