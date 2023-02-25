const { EmbedBuilder } = require("discord.js");
const db = require('megadb');
const lvldB = new db.crearDB({
    nombre: 'dataLevel',
    carpeta: './database'
})

module.exports.run = async (client, message, args, player) => {
    const guild = message.guildId
    let b = {}

    let keys = await lvldB.keys(`${guild}`)
    for (let i in keys) {
        let val = await lvldB.get(`${guild}.${keys[i]}`)
        b[keys[i]] = val
    }
    let arregloX = [];
    for (let x in b) {
        arregloX.push({
            id: x,
            xp: b[x].xp,
            level: b[x].level
        });
    }
    arregloX.sort(function (a, b) {
        if (a.level > b.level) {
            return -1;
        } else if (a.level < b.level) {
            return 1;
        } else {
            if (a.xp > b.xp) {
                return -1;
            } else if (a.xp < b.xp) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    let msg = ""
    let j = 0
    arregloX.forEach(k => {
        j += 1
        if (j <= 10) {
            msg += `${j}-. <@${k.id}> ~ Nivel: ${k.level} ~ Experiencia: ${k.xp} \n`
        }
    })
    const g = await message.client.guilds.cache.get(guild)
    let embed = new EmbedBuilder()
        .setTitle(`Nivel`)
        .setDescription(`Tabla de clasificacion en **${g.name}** \n${msg}`)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setFooter({ text: "CyopnBot" })
        .setTimestamp();
    message.reply({ embeds: [embed] });
}
module.exports.config = {
    name: "rank",
    aliases: ['rk']
}