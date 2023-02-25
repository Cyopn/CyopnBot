const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, message, args, player) => {
    let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
    /* message.guild.members.fetch().then(members => {
        const online = members.filter((member) => !member.user?.bot && member.presence?.status != 'offline').map((member) => member);
        console.log(online)
        console.log(m)
    }) */

    let a=await message.guild

    console.log(user.id)
    /* message.guild.members.fetch().then(m=>{
        
    })
 */
    /* if (!userm) {
        var userm = message.author;
        const embed = new EmbedBuilder()
            .setThumbnail(user.avatarURL)
            .setAuthor(user.username + '#' + user.discriminator, user.avatarURL)
            .addField('Jugando a', user.presence.game != null ? user.presence.game : "Nada", true)
            .addField('ID', user.id, true)
            .addField('Estado', user.presence.status, true)
            .addField('Apodo', message.member.nickname, true)
            .addField('Cuenta Creada', user.createdAt.toDateString(), true)
            .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
            .addField('Roles', message.member.roles.cache.map(rol => '`' + rol.name + '`').join(', '))
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.channel.send({ embed });
    } else {
        const embed = new EmbedBuilder()
            .setThumbnail(userm.avatarURL)
            .setAuthor(userm.username + '#' + userm.discriminator, userm.avatarURL)
            .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
            .addField('ID', userm.id, true)
            .addField('Estado', userm.presence.status, true)
            .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: 'CyopnBot' })
            .setTimestamp()
        message.channel.send({ embed });
    } */
}

module.exports.config = {
    name: "user",
    aliases: ['u']
}