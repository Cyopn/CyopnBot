const Discord=require('discord.js')
module.exports.run = async(client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en mismo canal de voz que yo");
    if (!args){
       message.channel.send('Ingresa el numero de pista a saltar')
    const queue = client.player.getQueue(message)
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Lista de reproduccion en: ${message.guild.name} ${client.player.getQueue(message).loopMode ? '(looped)' : ''}`)
                    .setDescription(`Reproduciendo : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
                                return `**#${i + 1}** - ${track.title} | ${track.author} (Pedido por : ${track.requestedBy.username})`
                            }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `y **${queue.tracks.length - 5}** otras canciones...` : `**${queue.tracks.length}** Cancione(s) en cola...`}`))
                            .setColor('RANDOM')
                            .setFooter('CyopnBot')
                            .setTimestamp()
                  message.channel.send(embed)
    }
    try {
        if (client.player.isPlaying(message)) {
            client.player.jump(message, parseInt(args))
            message.react('👍')
        } else {
            message.channel.send('No hay nada en reproduccion')
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "jump",
    aliases: ['jm']
}