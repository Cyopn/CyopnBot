const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    message.channel.send({
        embed: {
            color: "RANDOM",
            title: "Ayuda en comandos de musica",
            description: "Usa el prefijo '+' antes de una de las palabras clave",
            fields: [{
                    name: "Unirse",
                    value: "(Uso: +join), Me añade a algun canal de voz al que estes conectado"
                },
                {
                    name: "Abandonar",
                    value: "(Uso: +leave), Usame para abandonar el canal de voz"
                },
                {
                    name: "Reproducir",
                    value: "(Uso: +play), Usame para reproucir algun video musical de youtube/soundcloud/spotify"
                },
                {
                    name: "Pausar",
                    value: "(Uso: +pause), Usame para pausar la reproduccion"
                },
                {
                    name: "Resumir",
                    value: "(Uso: +resume), Usame para reanudar una reproduccion en pausa"
                },
                {
                    name: "Lista de reproduccion",
                    value: "(Uso: +queue), Devuelve la lista de reproduccion"
                },
                {
                    name: "Saltar",
                    value: "(Uso: +skip), Salta la cancion en reproduccion"
                },
                {
                    name: "Detener",
                    value: "(Uso: +stop), Detiene la cancion en reproduccion y abandona el canal de voz"
                },
                {
                    name: "Volumen",
                    value: `(Uso: +volume \`numero entero\` ), Detiene la cancion en reproduccion`
                },
                {
                    name: 'Repetir',
                    value: '(Uso: +repeat), Repite la cancion en reproduccion'
                },
                {
                    name: 'Atras',
                    value: '(Uso: +back), Regresa una cancion atras en la lista de reproduccion'
                },
                {
                    name: 'Limpiar lista de reproduccion',
                    value: '(Uso: +clearqueue), Eliminda todas las canciones en cola de reproduccion'
                },
                {
                    name: 'Saltar(Numero especifico)',
                    value: `(Uso: +jump \`Numero entero\`)`
                },
                {
                    name: 'Letra',
                    value: '(Uso: +lyric), Devuelve la letra de una cancion en reproduccion(aun en desarrollo)'
                },
                {
                    name: 'En reproduccion',
                    value: '(Uso: +nowplaying), Devuelve informacion de la cancion en reproduccion'
                },
                {
                    name: 'Lista de reproduccion',
                    value: '(Uso: +queue), Devuelve las canciones en cola que se reproducen/reproduciran'
                }
            ],
            timestamp: new Date(),
            footer: 'CyopnBot'
        }
    })
}
module.exports.config = {
    name: "hlpmusc",
    aliases: ['hm']
}