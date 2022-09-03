const { EmbedBuilder } = require("discord.js");
const { createEmbed } = require("../lib/functions");
module.exports.run = async (client, message, args, player) => {
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
        let page = parseInt(args.join(""));
        if (args.join("") == "") page = 1;
        try {
          const pageStart = 10 * (page - 1);
          const pageEnd = pageStart + 10;
          const currentTrack = queue.current;
          const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([Fuente](${m.url}))`;
          });
          console.log(queue);
          let embed = new EmbedBuilder()
            .setTitle(`Lista de reproduccion`)
            .setDescription(
              `${tracks.join("\n")} ${
                queue.tracks.length > pageEnd
                  ? `\n...${queue.tracks.length - pageEnd} mas canciones`
                  : ""
              }`
            )
            .addFields({
              name: `Reproduciendo ahora`,
              value: `${currentTrack.title}`,
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
