const Discord = require("discord.js");
const db = require('megadb');
let lvl_db = new db.crearDB("niveles");
module.exports.run = async(client, message, args) => {
    let miembro = message.mentions.users.first();
    if (!miembro) {
        if (!lvl_db.tiene(`${message.guild.id}`)) return message.channel.send('No hay usuarios en el rank');
        let user = message.author;
        if (!lvl_db.tiene(`${message.guild.id}.${message.author.id}`)) return message.channel.send('El usuario no tiene xp ni un nivel');
        let { xp, nivel } = await lvl_db.obtener(`${message.guild.id}.${message.author.id}`)
        let lvlup = 5 * (nivel ** 2) + 50 * nivel + 100
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Estadisticas de ${user}`)
            .setDescription(`XP: ${ xp } /${lvlup}\n Nivel: ${nivel}`)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } else {
        if (!lvl_db.tiene(`${message.guild.id}`)) return message.channel.send('No hay usuarios en el rank');
        if (!lvl_db.tiene(`${message.guild.id}.${miembro.id}`)) return message.channel.send('El usuario no tiene xp ni un nivel');
        let { xp, nivel } = await lvl_db.obtener(`${message.guild.id}.${miembro.id}`)
        let lvlup = 5 * (nivel ** 2) + 50 * nivel + 100
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Estadisticas de ${miembro}`)
            .setDescription(`XP: ${ xp } /${lvlup}\n Nivel: ${nivel}`)
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    }
}
module.exports.config = {
    name: "rank",
    aliases: ['rk']
}