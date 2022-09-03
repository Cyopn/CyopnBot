const { EmbedBuilder } = require("discord.js");
module.exports.run = async(client, message, args, player) => {
    message.channel.send({
        embed: {
            color: 'RANDOM',
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL()
            },
            title: "Ayuda en conmandos",
            description: "Usa el prefijo '+' antes de una de las palabras clave",
            fields: [{
                    name: "Avatar",
                    value: "(Uso: +avatar), Obten el avatar de un usuario o el tuyo"
                },
                {
                    name: "Say",
                    value: "(Uso: +say), Puedes pedir que diga lo que quieras"
                },
                {
                    name: "Ping",
                    value: "(Uso: +ping), ¿Quieres conocer mi velocidad?, pruebame"
                },
                {
                    name: "Server",
                    value: "(Uso: +server), Solicitame los datos de tu servidor"
                },
                {
                    name: "Info",
                    value: "(Uso: +info), Usame si quieres saber sobre mi"
                },
                {
                    name: "User",
                    value: "(Uso: +user), Obten la informacion de un usuario o el tuyo"
                },
                {
                    name: "Ban",
                    value: "(Uso: +ban \`username [razon]\`), Banea un usuario"
                },
                {
                    name: "Musica",
                    value: "(Uso: +hlpmusc), Mas informacion sobre comados para reproducir musica"
                },
                {
                    name: "Soporte",
                    value: "(Uso: +soporte), Si existe algun error y/o sugerencia, obten informacion para contacatarme"
                },
                {
                    name: "Reacciones",
                    value: "(Uso: +hlpreac), Mas informacion sobre comados de reaccion"
                },
                {
                    name: "Neko (Chica gato)",
                    value: "(Uso: +neko), Devuelve una chica gato aleatoria"
                },
                {
                    name: "Gatos",
                    value: "(Uso: +cat), Devuelve un gato aleatorio"
                },
                {
                    name: "Meme",
                    value: "(Uso: +meme), Devuelve imagenes graciosas"
                },
                {
                    name: "Comprar",
                    value: "(Uso: +buy), Compra de articulos, si necesitas PejeCoins usa +work, ¡Actualizacion muy pronto!"
                },
                {
                    name: "Trabajar",
                    value: "(Uso: +work), Obten PejeCoins para intercambiar por productos en la tienda(Usando el comando: +buy), ¡Actualizacion muy pronto!"
                }
            ],
            timestamp: new Date(),
            footer: 'CyopnBot'
        }
    })
}
module.exports.config = {
    name: "help",
    aliases: ['h']
}