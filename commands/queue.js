const { EmbedBuilder, messageLink } = require("discord.js");
const { createEmbed } = require("../lib/functions");
const { useQueue } = require("discord-player")

module.exports.run = async (client, message, args, player) => {
  let voicechannel = message.member.voice.channel
    ? message.member.voice.channel
    : null;
  const queue = player.nodes.get(voicechannel.guild.id);
  if (voicechannel === null) {
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
      if (!queue.node.isPlaying()) {
        embed = await createEmbed(
          "Advertencia",
          "No se esta reproduciendo nada justo ahora"
        );
        message.reply({ embeds: [embed] });
      } else {
        const q = useQueue(message.guild.id)
        try {
          const currentTrack = q.currentTrack;
          const t = q.tracks.map((track, idx) => {
            return `**${++idx}.** [${track.title}](${track.url})`
          });
          let arr = []
          for (let i = 0; i <= 9; i++) {
            arr.push(t[i])
          }
          let embed = new EmbedBuilder()
            .setTitle(`Lista de reproduccion`)
            .setDescription(
              `${arr.join("\n")}${t.length > 10 ? `\n\ny ${t.length - 10} canciones mas` : ""}`
            )
            .addFields({
              name: `Reproduciendo ahora`,
              value: `[${currentTrack.title}](${currentTrack.url})`,
            })
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter({ text: "CyopnBot" })
            .setTimestamp();
          message.reply({ embeds: [embed] });
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
  name: "queue",
  aliases: ["q"],
};
