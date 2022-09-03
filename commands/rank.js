const { EmbedBuilder } = require("discord.js");
const db = require('megadb');
let lvl_db = new db.crearDB("niveles");
module.exports.run = async(client, message, args, player) => {
    let miembro = message.mentions.users.first();
    if (!miembro) {
        if (!lvl_db.tiene(`${message.guild.id}`)) return message.channel.send('No hay usuarios en el rank');
        let user = message.author;
        if (!lvl_db.tiene(`${message.guild.id}.${message.author.id}`)) return message.channel.send('El usuario no tiene xp ni un nivel');
        let { xp, nivel } = await lvl_db.obtener(`${message.guild.id}.${message.author.id}`)
        let lvlup = 5 * (nivel ** 2) + 50 * nivel + 100
        let embed = new EmbedBuilder()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setTitle(`Estadisticas de ${user}`)
            .setDescription(`XP: ${ xp } /${lvlup}\n Nivel: ${nivel}`)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    } else {
        if (!lvl_db.tiene(`${message.guild.id}`)) return message.channel.send('No hay usuarios en el rank');
        if (!lvl_db.tiene(`${message.guild.id}.${miembro.id}`)) return message.channel.send('El usuario no tiene xp ni un nivel');
        let { xp, nivel } = await lvl_db.obtener(`${message.guild.id}.${miembro.id}`)
        let lvlup = 5 * (nivel ** 2) + 50 * nivel + 100
        let embed = new EmbedBuilder()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setTitle(`Estadisticas de ${miembro}`)
            .setDescription(`XP: ${ xp } /${lvlup}\n Nivel: ${nivel}`)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] })
    }
}
module.exports.config = {
    name: "rank",
    aliases: ['rk']
}