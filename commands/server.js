const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    var server = message.guild;
    const embed = new Discord.MessageEmbed()
        .setThumbnail(server.iconURL())
        .setAuthor(server.name, server.iconURL)
        .addField('Id', server.id, true)
        .addField('Region', server.region, true)
        .addField('Creado el', server.joinedAt.toDateString(), true)
        .addField('Dueño del servidor', server.owner.user.username + '#' + server.owner.user.discriminator, true)
        .addField('Miembros', server.memberCount, true)
        .addField('Roles', server.roles.cache.size, true)
        .setColor('RANDOM')
        .setFooter('CyopnBot')
        .setTimestamp()
    message.channel.send({ embed });
}
module.exports.config = {
    name: "server",
    aliases: ['sr']
}