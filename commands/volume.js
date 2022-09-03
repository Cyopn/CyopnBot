const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  let voicechannel = message.member.voice.channel
    ? message.member.voice.channel
    : null;

  const queue = player.getQueue(voicechannel.guild.id);

  if (voicechannel == null) {
    embed = await createEmbed("Advertencia", "Debes Estar en un canal de voz.");
    message.reply({ embeds: [embed] });
  } else {
    if (queue.metadata.channel != voicechannel.id) {
      embed = await createEmbed(
        "Advertencia",
        "Debes estar en el mismo canal de voz que yo."
      );
      message.reply({ embeds: [embed] });
    } else {
      if (!queue.playing) {
        embed = await createEmbed(
          "Advertencia",
          "No se esta reproduciendo nada justo ahora"
        );
        message.reply({ embeds: [embed] });
      } else {
        try {
          const v = parseInt(args.join(""));
          if (!v || isNaN(v)) {
            embed = await createEmbed(
              "Reproductor",
              `El volumen justo ahora es ${queue.volume}`
            );
            message.reply({ embeds: [embed] });
          } else {
            if (v < 0 || v > 100) {
              embed = await createEmbed(
                "Reproductor",
                "El volumen debe estar dentro del rango: 0 a 100"
              );
              message.reply({ embeds: [embed] });
            } else {
              const sc = queue.setVolume(v);
              if (sc) {
                embed = await createEmbed(
                  "Reproductor",
                  `Se ajusto el volumen a ${v}`
                );
                message.reply({ embeds: [embed] });
              }
            }
          }
        } catch (e) {
          embed = await createEmbed(
            "Error",
            "Ocurrio un error al intentar pausar, intenta de nuevo o contacta a soporte"
          );
          message.reply({ embeds: [embed] });
          console.log(e);
        }
      }
    }
  }
};
module.exports.config = {
  name: "volume",
  aliases: ["vl"],
};
