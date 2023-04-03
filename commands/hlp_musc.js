const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args, player) => {

    let embed = new EmbedBuilder()
        .setTitle("Comandos")
        .setDescription(`Usa el prefijo '+' antes de una de las palabras clave`)
        .addFields(
            { name: "Reproducir", value: "(Uso: +play), Usame para reproucir algun video musical de youtube (soundcloud/spotify aun en desarrollo)" },
            { name: "Pausar", value: "(Uso: +pause), Usame para pausar la reproduccion" },
            { name: "Reanudar", value: "(Uso: +resume), Usame para reanudar una reproduccion en pausa" },
            { name: "Lista de reproduccion", value: "(Uso: +queue), Devuelve la lista de reproduccion" },
            { name: "Omitir", value: "(Uso: +skip), Omite la cancion en reproduccion" },
            { name: "Detener", value: "(Uso: +stop), Detiene la cancion en reproduccion y abandona el canal de voz" },
            { name: "Volumen", value: `(Uso: +volume \`numero entero\` ), Detiene la cancion en reproduccion` },
            { name: 'Atras', value: '(Uso: +back), Regresa una cancion atras en la lista de reproduccion `Comando aun en desarrollo`' },
            { name: 'Limpiar lista de reproduccion', value: '(Uso: +clearqueue), Eliminda todas las canciones en cola de reproduccion' },
            { name: 'Saltar(Numero de canciones a omitir)', value: `(Uso: +jump \`numero entero\`)` },
            { name: 'En reproduccion', value: '(Uso: +nowplaying), Devuelve informacion de la cancion en reproduccion' },
        )
        .setFooter({ text: "CyopnBot" })
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTimestamp();

    message.reply({ embeds: [embed] })
}
module.exports.config = {
    name: "hlpmusc",
    aliases: ['hm']
}