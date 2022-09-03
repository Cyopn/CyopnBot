const { EmbedBuilder } = require("discord.js");
module.exports.run = async(client, message, args, player) => {
    let Canalvoz = message.member.voice.channel;
    if (!Canalvoz || Canalvoz.type !== 'voice') {
        message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
    } else if (message.guild.voiceConnection) {
        message.channel.send('Ya estoy conectado en un canal de voz.');

    } else if (message.guild.me.voice.channel && message.member.voice.channel.id === message.guild.me.voice.channel.id) {
        message.channel.send("Ya estamos en el mismo canal de voz")
    } else {
        Canalvoz.join().then(ch => {
            message.channel.send(`Conectado, usa \` +play \` para reproducir una cancion `);
        })
    }
}
module.exports.config = {
    name: "join",
    aliases: ['j']
}