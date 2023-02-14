const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args, player) => {
    try {
        const embed = new EmbedBuilder()
            .setThumbnail(message.guild.iconURL())
            .setTitle(`Articulos`)
            .setDescription(`Articulos disponibles por el momento`)
            .addFields(
                { name: 'Criko', value: '10 PejeCoins', inline: true },
                { name: 'Jarron', value: '5 PejeCoins', inline: true },
                { name: 'Toston', value: '50 PejeCoins', inline: true },
                { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
            )
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.reply({ embeds: [embed] });
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "buyinfo",
    aliases: ['binf']
}