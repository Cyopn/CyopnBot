const Discord=require('discord.js')
module.exports.run = async(client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en mismo canal de voz que yo");
    try {
        if (client.player.isPlaying(message)) {
            const track = client.player.nowPlaying(message);
            let embed = new Discord.MessageEmbed()
                .setTitle(`Reproduciendo: ${track.title}`)
                .setDescription(`De: ${track.author}\nPedido por: ${track.requestedBy.username}\nDe playlist: ${track.fromPlaylist ? 'Si' : 'No'}\nVistas: ${track.views}\nDuracion: ${track.duration}\nVolumen: ${client.player.getQueue(message).volume}\nRepitiendo: ${client.player.getQueue(message).repeatMode ? 'Si' : 'No'}\nPausado: ${client.player.getQueue(message).paused ? 'Si' : 'No'}\n${client.player.createProgressBar(message, { timecodes: true })}`)
                .setThumbnail(track.thumbnail)
                .setColor('RANDOM')
                .setFooter('CyopnBot')
                .setTimestamp()
            message.channel.send(embed)
        } else {
            message.channel.send('No hay nada en reproduccion')
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "nowp",
    aliases: ['np']
}