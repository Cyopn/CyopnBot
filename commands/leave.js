const { getVoiceConnection } = require("@discordjs/voice");
const { createEmbed } = require("../lib/functions.js");

module.exports.run = async (client, message, args, player) => {
    try {
        const userVoiceChannel = message.member.voice.channel ? message.member.voice.channel : null;
        const queue = player.getQueue(message.guild.id);
        const botVoiceChannel = message.guild.members.me?.voice?.channel || null;

        if (!botVoiceChannel && !queue) {
            return message.reply({
                embeds: [
                    await createEmbed(
                        "Advertencia",
                        "Advertencia",
                        "No estoy conectado a ningun canal de voz.",
                    ),
                ],
            });
        }

        if (!userVoiceChannel) {
            return message.reply({
                embeds: [
                    await createEmbed(
                        "Advertencia",
                        "Advertencia",
                        "Debes estar en un canal de voz para usar este comando.",
                    ),
                ],
            });
        }

        if (botVoiceChannel && userVoiceChannel.id !== botVoiceChannel.id) {
            return message.reply({  
                embeds: [
                    await createEmbed(
                        "Advertencia",
                        "Advertencia",
                        "Debes estar en el mismo canal de voz que yo.",
                    ),
                ],
            });
        }

        if (queue) {
            player.leave(message.guild.id);
        } else {
            const connection = getVoiceConnection(message.guild.id);
            if (connection) connection.destroy();
        }

        await message.react("👋");
    } catch (e) {
        console.log(e);
        message.reply({
            embeds: [
                await createEmbed(
                    "Error",
                    "Error",
                    `Ocurrio un error al intentar salir del canal de voz: \n${e}`,
                ),
            ],
        });
    }
};

module.exports.config = {
    name: `leave`,
    alias: [`dc`, `salir`],
    type: `misc`,
    description: `Hace que el bot salga del canal de voz actual.`,
    fulldesc: `Comando para sacar al bot del canal de voz y limpiar la cola de reproduccion.`,
};
