const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    if (!args) {
        message.channel.send("Ingresa lo que debo decir");
    } else {
        message.channel.send(args.join(' '));
        message.delete();
    }
}
module.exports.config = {
    name: "say",
    aliases: ['s']
}