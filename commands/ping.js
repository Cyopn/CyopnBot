const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
  let embed=new Discord.MessageEmbed()
  .setTitle(`🏓 Pong!`)
  .setDescription(`Latencia del bot: ${Date.now() - message.createdTimestamp}ms.\n Latencia del API: ${Math.round(client.ws.ping)}ms.`);
  message.channel.send(embed)
}
module.exports.config = {
    name: "ping",
    aliases: ['pg']
}