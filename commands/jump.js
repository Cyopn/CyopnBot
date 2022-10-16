const Discord = require('discord.js')
module.exports.run = async (client, message, args, player) => {
    let voicechannel = message.member.voice.channel
        ? message.member.voice.channel
        : null;
    let index = parseInt(args.join())

    const queue = player.getQueue(voicechannel.guild.id);

    if (voicechannel == null) {
        embed = await createEmbed("Advertencia", "Debes Estar en un canal de voz.");
        message.reply({ embeds: [embed] });
    } else {
        if (queue.metadata.vc != voicechannel.id) {
            embed = await createEmbed(
                "Advertencia",
                "Debes estar en el mismo canal de voz que yo."
            );
            message.reply({ embeds: [embed] });
        } else {
            if (!index || index.length < 0) {
                embed = await createEmbed(
                    "Advertencia",
                    "Dedes ingresar una busqueda."
                );
                message.reply({ embeds: [embed] });
            } else {
                try {
                    if (!queue.playing) {
                        embed = await createEmbed(
                            "Advertencia",
                            "No se esta reproduciendo nada justo ahora"
                        );
                        message.reply({ embeds: [embed] });
                    } else {
                        queue.jump(index)
                        message.react("✅");
                    }
                } catch (e) {
                    queue.destroy();
                    embed = await createEmbed(
                        "Error",
                        `Ocurrio un error al intentar reproducir: \n${e}`
                    );
                    message.reply({ embeds: [embed] });
                }
            }
        }
    }
};
module.exports.config = {
    name: "jump",
    aliases: ['jm']
}