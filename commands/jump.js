const { createEmbed } = require("../lib/functions");

module.exports.run = async (client, message, args, player) => {
    let voicechannel = message.member.voice.channel
        ? message.member.voice.channel
        : null;
    let index = parseInt(args.join())

    const queue = player.nodes.get(voicechannel.guild.id);

    if (voicechannel == null) {
        embed = await createEmbed("Advertencia", "Debes Estar en un canal de voz.");
        message.reply({ embeds: [embed] });
    } else {
        if (queue == undefined || queue.metadata.vc != voicechannel.id) {
            if (queue == undefined) {
                embed = await createEmbed(
                    "Advertencia",
                    "No se esta reproduciendo nada justo ahora"
                );
                message.reply({ embeds: [embed] });
            } else {
                embed = await createEmbed(
                    "Advertencia",
                    "Debes estar en el mismo canal de voz que yo."
                );
                message.reply({ embeds: [embed] });
            }

        } else {
            if (!queue.playing) {
                embed = await createEmbed(
                    "Advertencia",
                    "No se esta reproduciendo nada justo ahora"
                );
                message.reply({ embeds: [embed] });
            } else {
                let page = parseInt(args.join(""));
                if (args.join("") == "") page = 1;
                if (!index || index.length < 0) {
                    embed = await createEmbed(
                        "Advertencia",
                        "Dedes ingresar la cantidad de canciones a saltar"
                    );
                    message.reply({ embeds: [embed] });
                } else {
                    try {
                        queue.jump(index)
                        message.react("✅");
                    } catch (e) {
                        queue.destroy();
                        embed = await createEmbed(
                            "Error",
                            `Ocurrio un error al intentar saltar la cancion`
                        );
                        message.reply({ embeds: [embed] });
                        console.log(e)
                    }
                }
            }
        }
    }

};
module.exports.config = {
    name: "jump",
    aliases: ['jm']
}