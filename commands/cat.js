const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args, player) => {
    const file = await axios.get('https://aws.random.cat/meow')

    let embed = new EmbedBuilder()
        .setTitle('Hola')
        .setImage(file.data.file)
        .setTimestamp()
        .setFooter({ text: 'CyopnBot' })
    message.reply({ embeds: [embed] });
}
module.exports.config = {
    name: "cat",
    aliases: ['ct']
} 