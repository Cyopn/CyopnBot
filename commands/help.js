const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args, player) => {

    let embed = new EmbedBuilder()
        .setTitle("Comandos")
        .setDescription(`Usa el prefijo '+' antes de una de las palabras clave`)
        .addFields(
            { name: "Avatar", value: "(Uso: +avatar), Obten el avatar de un usuario o el tuyo" },
            { name: "Ping", value: "(Uso: +ping), ¿Quieres conocer mi velocidad?, pruebame" },
            { name: "Server", value: "(Uso: +server), Solicitame los datos de tu servidor" },
            { name: "Ban", value: "(Uso: +ban \`username [razon]\`), Banea un usuario" },
            { name: "Musica", value: "(Uso: +hlpmusc), Mas informacion sobre comados para reproducir musica" },
            { name: "Soporte", value: "(Uso: +soporte), Si existe algun error y/o sugerencia, obten informacion para contacatarme" },
            { name: "Neko (Chica gato)", value: "(Uso: +neko), Muestra una neko (chica gato) aleatoria" },
            { name: "Gatos", value: "(Uso: +cat), Muestra un gato" },
            { name: "Meme", value: "(Uso: +meme), Muestra chistoretes digitales (posteados en [r/ChingaTuMadreNokoo](https://www.reddit.com/r/ChingaTuMadreNoko))" },
            { name: "Comprar", value: "(Uso: +buy), Compra de articulos, si necesitas PejeCoins usa +work, ¡Actualizacion muy pronto!" },
            { name: "Trabajar", value: "(Uso: +work), Obten PejeCoins para intercambiar por productos en la tienda (Usando el comando: +buy), ¡Actualizacion muy pronto!" }
        )
        .setFooter({ text: "CyopnBot" })
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTimestamp();

    message.reply({ embeds: [embed] })
}
module.exports.config = {
    name: "help",
    aliases: ['h']
}