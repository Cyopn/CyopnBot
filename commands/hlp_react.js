const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    try {
        message.channel.send({
            embed: {
                color: "RANDOM",
                title: "Ayuda en comandos de reacciones",
                description: "Usa el prefijo '+' antes de una de las palabras clave",
                fields: [{
                        name: "Enojad@",
                        value: "Uso: +angry"
                    },
                    {
                        name: "Confundid@",
                        value: "Uso: +confused"
                    },
                    {
                        name: "Llorar",
                        value: "Uso: +cry"
                    },
                    {
                        name: "Bailar",
                        value: "Uso: +dance"
                    },
                    {
                        name: "Chinga te",
                        value: "Uso: +fuckyou \`username\`"
                    },
                    {
                        name: "Feliz",
                        value: "Uso: +happy"
                    },
                    {
                        name: "Abrazar",
                        value: "Uso: +hug \`username\`"
                    },
                    {
                        name: "Patear",
                        value: "Uso: +kick \`username\`"
                    },
                    {
                        name: "Asesinar",
                        value: "Uso: +kill \`username\`"
                    },
                    {
                        name: "Besar",
                        value: "Uso: +kiss \`username\`"
                    },
                    {
                        name: "Lamer",
                        value: "Uso: +lick \`username\`"
                    },
                    {
                        name: "Acariciar",
                        value: "Uso: +pat \`username\`"
                    },
                    {
                        name: "Entristecer",
                        value: "Uso: +pout"
                    },
                    {
                        name: "Suicidar",
                        value: "Uso: +suicide"
                    },
                    {
                        name: "Bofetear",
                        value: "Uso: +slap"
                    },
                    {
                        name: "Dormir",
                        value: "Uso: +sleep"
                    },
                ],
                timestamp: new Date(),
                footer: 'CyopnBot'
            }
        })
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "hlprea",
    aliases: ['hr']
}