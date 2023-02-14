const { EmbedBuilder } = require("discord.js");
const db = require('megadb')
module.exports.run = async (client, message, args, player) => {
    try {
        let bu = new db.crearDB("articulos")
        if (!bu.tiene(message.guild.id)) bu.establecer(message.guild.id, {})
        if (!bu.tiene(`${message.guild.id}.${message.author.id}`)) bu.establecer(`${message.guild.id}.${message.author.id}`, { dinero: 0, criko: 0, toston: 0, pbm: 0, pnm: 0, pdm: 0, jarron: 0, mlp: 0, coca: 0 })
        let { dinero, criko, toston, pbm, pnm, pdm, jarron, mlp, coca } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
        const embed = new EmbedBuilder()
            .setThumbnail(message.author.iconURL)
            .setTitle(`Inteventario de ${message.author.username}`)
            .setDescription(`Articulos disponibles por el momento`)
            .addFields(
                { name: 'Pejecoins', value: `${dinero}`, inline: true },
                { name: 'Criko', value: `${criko}`, inline: true },
                { name: 'Jarron', value:  `${jarron}`, inline: true },
                { name: 'Toston', value: `${toston}`, inline: true },
                { name: 'Paquete basico de mona', value: `${pbm}`, inline: true },
                { name: 'Paquete normal de mona', value: `${pnm}`, inline: true },
                { name: 'Paquete delux de mona', value: `${pdm}`, inline: true },
                { name: 'Muñeco my litle pony', value: `${mlp}`, inline: true },
                { name: 'Coca', value: `${coca}`, inline: false })
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] });
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "bagpack",
    aliases: ['bg']
}