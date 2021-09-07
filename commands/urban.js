const Discord = require("discord.js");
const fetch = require('node-fetch');
const querystring = require('querystring')
const tra = require('@iamtraction/google-translate')
module.exports.run = async(client, message, args) => {
    try {
        if (!args.length) return message.channel.send('Debes ingrsar una palabra clave')
        const query = querystring.stringify({ term: args.join(' ') });

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list) {
            let embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription(`No hay resultados para **${args.join(' ')}**`)
                .setColor('RANDOM')
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed);
        }
        ls = list[0];
        try {
            tra(ls.definition, {
                to: 'es'
            }).then(res => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Resaultado(s) de ${args.join(' ')}`)
                    .setDescription(`${res.text} \nPedido por: ${message.author.username}`)
                    .seColor('RANDOM')
                    .setFooter('CyopnBot')
                    .setTimestamp()
                message.channel.send(res.text)
            })
        } catch (e) {
            console.log(e)
            let embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription(`NO hay resultados de **${args.join(' ')}**`)
                .setColor('RANDOM')
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed);
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports.config = {
    name: "urban",
    aliases: ['ur']
}