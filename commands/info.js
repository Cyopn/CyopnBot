const { EmbedBuilder } = require("discord.js");
module.exports.run = async(client, message, args, player) => {
    message.channel.send({
        embed: {
            color: 'RANDOM',
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL()
            },
            title: "CyopnBot por Cyopn",
            description: "Contactame para obtener [informacion](https://instagram.com/Cyopn_) sobre el proyecto, siempre se agradeceran sugerencias",
            fields: [{
                    name: "¿Quien soy?",
                    value: "Hola"
                },
                {
                    name: "¿Cual es mi proposito?",
                    value: "Hola"
                }
            ],
            timestamp: new Date(),
            footer: "CyopnBot"

        }
    });
}
module.exports.config = {
    name: "info",
    aliases: ['i']
}