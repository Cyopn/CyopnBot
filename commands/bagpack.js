const Discord = require("discord.js");
const db=require('megadb')
module.exports.run = async(client, message, args) => {
    try {
        let bu = new db.crearDB("articulos")
        if (!bu.tiene(message.guild.id)) bu.establecer(message.guild.id, {})
        if (!bu.tiene(`${message.guild.id}.${message.author.id}`)) bu.establecer(`${message.guild.id}.${message.author.id}`, { dinero: 0, criko: 0, toston: 0, pbm: 0, pnm: 0, pdm: 0, jarron: 0, mlp: 0, coca:0 })
        let { dinero, criko, toston, pbm, pnm, pdm, jarron, mlp, coca } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
        const embed = new Discord.MessageEmbed()
            .setTitle(`Inteventario de ${message.author.username}`, message.author.iconURL)
            .addField('PejeCoins', `${dinero}`, true)
            .addField('Criko', `${criko}`, true)
            .addField('Toston', `${toston}`, true)
            .addField('Paquete basico de mona', `${pbm}`, true)
            .addField('Paquete normal de mona', `${pnm}`, true)
            .addField('Paquete delux de mona', `${pdm}`, true)
            .addField('Jarron', `${jarron}`, true)
            .addField('Muñeco my little pony', `${mlp}`, true)
            .addField('Coca', `${coca}`, true)
            .setColor('RANDOM')
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "bagpack",
    aliases: ['bg']
}