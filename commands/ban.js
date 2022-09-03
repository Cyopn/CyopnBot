const { EmbedBuilder } = require("discord.js");
module.exports.run = async(client, message, args, player) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('Tu no puedes banear usuarios').catch(console.error);
    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');
    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if (!razon) return message.channel.send('Escriba un razón, `+ban @username [razón]`');
    if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
    message.guild.member(user).ban({
        days: 100,
        reason: razon + ''
    });
    message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);
}
module.exports.config = {
    name: "ban",
    aliases: ['b']
}