const { EmbedBuilder } = require("discord.js");
const fetch = require('node-fetch');
module.exports.run = async(client, message, args, player) => {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    let embed = new EmbedBuilder()
        .setTitle('Hola')
        .setImage(file)
        .setTimestamp()
        .setFooter({ text: 'CyopnBot' })
    message.reply({ embeds: [embed] });
}
module.exports.config = {
    name: "cat",
    aliases: ['ct']
} 