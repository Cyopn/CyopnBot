const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    try {
        message.channel.send({
            embed: {
                color: 'RANDOM',
                title: 'Articulos',
                description: 'Por el momento es el stock disponible',
                fields: [{
                        name: 'Criko',
                        value: '10 PejeCoins'
                    },
                    {
                        name: 'Toston',
                        value: '50 PejeCoins'
                    },
                    {
                        name: 'Paquete basico de mona',
                        value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins'
                    },
                    {
                        name: 'Paquete normal de mona',
                        value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins'
                    },
                    {
                        name: 'Paquete delux de mona',
                        value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins'
                    },
                    {
                        name: 'Jarron',
                        value: '5 PejeCoins'
                    },
                    {
                        name: 'Muñeco my litle pony',
                        value: '15 PejeCoins'
                    },
                    {
                      name:'Coca',
                      value:'**Descrpcion** \nUna bolsita de coca cola \n**Costo** \n30'
                    }
                ],
                timestamp: new Date(),
                footer: 'CyopnBot'
            }
        })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "buyinfo",
    aliases: ['binf']
}