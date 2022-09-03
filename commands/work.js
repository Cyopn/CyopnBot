const { EmbedBuilder } = require("discord.js");
const db = require('megadb');
module.exports.run = async(client, message, args, player) => {
    try {
        let bu = new db.crearDB("articulos")
        if (!bu.tiene(message.guild.id)) bu.establecer(message.guild.id, {})
        if (!bu.tiene(`${message.guild.id}.${message.author.id}`)) bu.establecer(`${message.guild.id}.${message.author.id}`, { dinero: 0, criko: 0, toston: 0, pbm: 0, tmvt: 0, pnm: 0, tmvtn: 0, pdm: 0, tlr: 0, jarron: 0, mlp: 0 })
        let swd = Math.floor(Math.random() * 5)
        let ar1=['Se la has chupado a un travesti', 'La hiciste de canica en una fiesta del peje', 'Le cortaste el pelo al chocoflan', 'Ganaste una pelea contra enanos con sida', 'Te han transferido a un CCH', 'Preñaste a tu prima!', 'Gano el cruz azul (Evento raro)']
        let arr=ar1[Math.floor(Math.random()*5)]
        if (swd === 1) {
            let cs1d = Math.floor(Math.random() * 10)
            const embed=new EmbedBuilder()
            .setTitle('Felicidades!')
            .setDescription(`${arr}, has ganado \`${cs1d}\` Pejecoins`)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.reply({ embeds: [embed] })
            bu.sumar(`${message.guild.id}.${message.author.id}.dinero`, cs1d)
        } else if (swd === 2) {
            let cs2d = Math.floor(Math.random() * 20)
            const embed=new EmbedBuilder()
            .setTitle('Felicidades!')
            .setDescription(`${arr}, has ganado \`${cs2d}\` Pejecoins`)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.reply({ embeds: [embed] })
            bu.sumar(`${message.guild.id}.${message.author.id}.dinero`, cs2d)
        } else if (swd === 3) {
            let cs3d = Math.floor(Math.random() * 30)
            const embed=new EmbedBuilder()
            .setTitle('Felicidades!')
            .setDescription(`${arr}, has ganado \`${cs3d}\` Pejecoins`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
            message.reply({ embeds: [embed] })
            bu.sumar(`${message.guild.id}.${message.author.id}.dinero`, cs3d)
        } else if (swd === 4) {
            let cs4d = Math.floor(Math.random() * 40)
            const embed=new EmbedBuilder()
            .setTitle('Felicidades!')
            .setDescription(`${arr}, has ganado \`${cs4d}\` Pejecoins`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
            message.reply({ embeds: [embed] })
            bu.sumar(`${message.guild.id}.${message.author.id}.dinero`, cs4d)
        } else if (swd === 5) {
            let cs5d = Math.floor(Math.random() * 50)
            const embed=new EmbedBuilder()
            .setTitle('Felicidades!')
            .setDescription(`${arr}, has ganado \`${cs5d}\` Pejecoins`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
            message.reply({ embeds: [embed] })
            bu.sumar(`${message.guild.id}.${message.author.id}.dinero`, cs5d)
        } else if (swd === 0) {
            let cs0d = Math.floor(Math.random() * 5)
            const embed=new EmbedBuilder()
            .setTitle('Felicidades!')
            .setDescription(`${arr}, has ganado \`${cs0d}\` Pejecoins`)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
            message.reply({ embeds: [embed] })
            bu.sumar(`${message.guild.id}.${message.author.id}.dinero`, cs0d)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "work",
    aliases: ['wrk']
}