module.exports.run = async(client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en mismo canal de voz que yo");
   
    try {
      const { Util } = require("discord-player")
      if(Util.isURL(args.join(" "))){
        client.player.play(message, args.join(" "), {firstResult : true})
      }else{
      const tracks = await Util.ytSearch(args.join(" "), {
        user: message.author,
        player: client.player
      }).catch(err => {
        console.error(err)
      });
      if (!tracks || !tracks.length) return message.channel.send("Sin resultados!");
      client.player.play(message, tracks[0].url, { firstResult: true });
      }
        
    } catch (e) {
      message.channel.send("Ocurrio un error")
        console.log(e)
    }
}
module.exports.config = {
    name: "play",
    aliases: ['p']
}