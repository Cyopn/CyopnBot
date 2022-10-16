const { createEmbed } = require("../lib/functions");

module.exports.run = async (client, message, args, player) => {
  const query = args.join(" ");
  let embed = null;
  let voicechannel = message.member.voice.channel
    ? message.member.voice.channel
    : null;





  if (query.includes("playlist")) return message.reply("No se soportan playlist")

  if (voicechannel == null) {
    embed = await createEmbed("Advertencia", "Debes Estar en un canal de voz.");
    message.reply({ embeds: [embed] });
  } else {
    let queue = player.getQueue(voicechannel.guild.id);

    if (queue == undefined) {
      queue = player.createQueue(voicechannel.guild.id, {
        metadata: {
          channel: message.channel,
          vc: voicechannel.id
        }
      });
    }

    if (queue.metadata.vc != voicechannel.id) {
      embed = await createEmbed(
        "Advertencia",
        "Debes estar en el mismo canal de voz que yo."
      );
      message.reply({ embeds: [embed] });
    } else {
      if (!query || query.length < 0) {
        embed = await createEmbed(
          "Advertencia",
          "Dedes ingresar una busqueda."
        );
        message.reply({ embeds: [embed] });
      } else {
        try {
          if (!queue.connection) await queue.connect(voicechannel);

          const track = await player
            .search(query, {
              requestedBy: message.member.id,
            })
            .then((x) => x.tracks[0]);
          if (!track) {
            embed = await createEmbed(
              "Advertencia",
              `No se encontro ningun resultado para **${query}**`
            );
            message.reply({ embeds: [embed] });
          } else {
            queue.play(track);
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
  name: "play",
  aliases: ["p"],
};
