const { EmbedBuilder } = require("discord.js");

module.exports.run = async(client, message, args, player) => {
    const embed = new EmbedBuilder()
        .setTitle(`Contacto`)
        .setDescription(`[Enlace de invitacion](https://discord.com/oauth2/authorize?client_id=799017226983440474&scope=bot&permissions=929092653048) \n[Servidor de soporte](https://discord.gg/AUGM7cKTdx) \n[Contactame](https://instagram.com/Cyopn_)`)
        .setTimestamp()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setFooter({ text: 'CyopnBot' })
    message.reply({ embeds: [embed] });
}

module.exports.config = {
    name: "soporte",
    aliases: ['sp']
}