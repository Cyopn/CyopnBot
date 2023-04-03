const { createEmbed } = require("../lib/functions");

module.exports.run = async (client, message, args, player) => {
  const query = args.join(" ");
  let embed = null;
  let voicechannel = message.member.voice.channel
    ? message.member.voice.channel
    : null;

  if (voicechannel == null) {
    embed = await createEmbed("Advertencia", "Debes Estar en un canal de voz.");
    message.reply({ embeds: [embed] });
  } else {
    let queue = player.nodes.get(message.guild);

    if (queue == undefined) {
      queue = player.nodes.create(message.guild, {
        metadata: {
          channel: message.channel,
          vc: voicechannel.id,
        },
        selfDeaf: true,
        volume: 80,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 300000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300000,
        skipOnNoStream: true,
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
          if (query.includes("playlist")) {
            const rs = await player.search(query, {
              requestedBy: message.member.id,
            });
            if (rs.playlist) {
              if (!queue.node.isPlaying()) {
                let r = rs.tracks;
                queue.addTrack(r);
                queue.node.play();
              } else {
                queue.addTrack(rs.tracks);
              }
            } else if (rs.playlist === null) {
              const embed = new EmbedBuilder()
                .setThumbnail(server.iconURL())
                .setTitle(server.name)
                .setDescription(`La playlist no existe o es privada`)
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setFooter({ text: "CyopnBot" })
                .setTimestamp();
              message.reply({ embeds: [embed] });
            }
          } else {
            const track = await player.search(query, {
              requestedBy: message.member.id,
            });
            if (!track.hasTracks) {
              embed = await createEmbed(
                "Advertencia",
                `No se encontro ningun resultado para **${query}**`
              );
              message.reply({ embeds: [embed] });
            } else {
              //queue.node.play(track.tracks[0]);
              player.play(voicechannel, track.tracks[0], {
                metadata: {
                  channel: message.channel,
                  vc: voicechannel.id,
                },
                selfDeaf: true,
                volume: 80,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 300000,
                leaveOnEnd: true,
                leaveOnEndCooldown: 300000,
                skipOnNoStream: true,
              });
            }
          }
        } catch (e) {
          console.log(e);
          queue.delete();
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
