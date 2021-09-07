const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    const Canalvoz = message.member.voice.channel;
    if (!Canalvoz) {
        message.channel.send('No estoy en un canal de voz.');
    } else {
        Canalvoz.leave()
    }
}
module.exports.config = {
    name: "leave",
    aliases: ['l']
}