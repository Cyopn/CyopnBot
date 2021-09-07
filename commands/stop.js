const Discord = require('discord.js')
module.exports.run = async(client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en mismo canal de voz que yo");
    try {
        if (client.player.isPlaying(message)) {
          client.player.stop(message)
        } else {
            message.channel.send('No hay nada en reproduccion')
            message.react('👍')
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "stop",
    aliases: ['st']
}