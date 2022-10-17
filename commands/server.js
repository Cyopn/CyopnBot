const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args, player) => {
    const server = message.guild;
    const members = server.members.cache
    const channels = server.channels.cache
    const owner = members.find(member => member.id === server.ownerId);
    const roles = server.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)
    let rolesdisplay;

    if (roles.length < 20) {
        rolesdisplay = roles.join(' ')
    } else {
        rolesdisplay = roles.slice(20).join(' ')
    }

    const embed = new EmbedBuilder()
        .setThumbnail(server.iconURL())
        .setTitle(server.name)
        .addFields(
            { name: "Id", value: `${server.id}`, inline: true },
            { name: "Region", value: `${server.preferredLocale}`, inline: true },
            { name: "Dueño", value: `${owner.user.tag}`, inline: true },
            { name: "Creacion", value: `${server.joinedAt.toDateString()}`, inline: true },
            { name: "Miembros", value: `${server.memberCount}`, inline: true },
            { name: `Roles ${server.roles.cache.size}`, value: `${rolesdisplay}`, inline: false },
            { name: "Canales de texto", value: `${channels.filter(channel => channel.type === 4).size}`, inline: true },
            { name: "Canales de voz", value: `${channels.filter(channel => channel.type === 2).size}`, inline: true }

        )
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setFooter({ text: 'CyopnBot' })
        .setTimestamp()
    message.reply({ embeds: [embed] });
}
module.exports.config = {
    name: "server",
    aliases: ['sr']
}