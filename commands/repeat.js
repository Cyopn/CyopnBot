const Discord = require('discord.js')
module.exports.run = async(client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en mismo canal de voz que yo");
    try {
        if (client.player.isPlaying(message)) {
            const lp = client.player.getQueue(message).repeatMode ? 'Yes' : 'No'
            if (lp === 'Yes') {
                client.player.setRepeatMode(message, false)
                message.react('👍')
            } else {
                client.player.setRepeatMode(message, true)
                message.react('👍')
            }
        } else {
            message.channel.send('No hay nada en reproduccion')
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "repeat",
    aliases: ['rt']
}