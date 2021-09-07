const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports.run = async(client, message, args) => {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    let embed = new Discord.MessageEmbed()
        .setTitle('Hola')
        .setImage(file)
        .setTimestamp()
        .setFooter('CyopnBot')
    message.channel.send(embed);
}
module.exports.config = {
    name: "cat",
    aliases: ['ct']
} 