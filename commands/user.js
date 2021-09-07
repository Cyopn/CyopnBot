const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let userm = message.mentions.users.first()
    if (!userm) {
        var user = message.author;
        const embed = new Discord.MessageEmbed()
            .setThumbnail(user.avatarURL)
            .setAuthor(user.username + '#' + user.discriminator, user.avatarURL)
            .addField('Jugando a', user.presence.game != null ? user.presence.game : "Nada", true)
            .addField('ID', user.id, true)
            .addField('Estado', user.presence.status, true)
            .addField('Apodo', message.member.nickname, true)
            .addField('Cuenta Creada', user.createdAt.toDateString(), true)
            .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
            .addField('Roles', message.member.roles.cache.map(rol => '`' + rol.name + '`').join(', '))
            .setColor('RANDOM')
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send({ embed });
    } else {
        const embed = new Discord.MessageEmbed()
            .setThumbnail(userm.avatarURL)
            .setAuthor(userm.username + '#' + userm.discriminator, userm.avatarURL)
            .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
            .addField('ID', userm.id, true)
            .addField('Estado', userm.presence.status, true)
            .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
            .setColor('RANDOM')
            .setFooter('CyopnBot')
            .setTimestamp()
        message.channel.send({ embed });
    }
}

module.exports.config = {
    name: "user",
    aliases: ['u']
}