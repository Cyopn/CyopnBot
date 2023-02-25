const { EmbedBuilder } = require("discord.js");
const db = require('megadb')
const lvldB = new db.crearDB({
    nombre: 'dataLevel',
    carpeta: './database'
})

module.exports.run = async (client, message, args, player) => {
    const guild = message.guildId
    const sid = message.mentions.users.size === 0 ? message.author.id : message.mentions.users.keys().next().value

    if (lvldB.has(guild) && lvldB.has(`${guild}.${sid}`)) {
        const { xp, level } = await lvldB.get(`${guild}.${sid}`)
        let lvlup = 5 * (level ** 2) + 50 * level + 100
        if (xp === 0) {
            let embed = new EmbedBuilder()
                .setTitle(`Nivel`)
                .setDescription(`Aun no envias suficientes mensajes para tener un nivel o experiencia`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setFooter({ text: "CyopnBot" })
                .setTimestamp();
            message.reply({ embeds: [embed] });
        } else {
            let embed = new EmbedBuilder()
                .setTitle(`Nivel`)
                .setDescription(`Buen trabajo <@${sid}>!
                *Experiencia: ${xp}*
                *Nivel: ${level}*
                _Necesitas ${lvlup - xp} puntos de experiencia mas para subir de nivel_`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setFooter({ text: "CyopnBot" })
                .setTimestamp();
            message.reply({ embeds: [embed] });
        }
    } else {
        lvldB.set(`${guild}.${sid}`, {
            xp: 0,
            level: 1
        })
    }
};
module.exports.config = {
    name: "level",
    aliases: ["lvl"],
};
