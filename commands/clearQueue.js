const { createEmbed } = require("../lib/functions");

module.exports.run = async (client, message, args) => {
  let voicechannel = message.member.voice.channel
    ? message.member.voice.channel
    : null;

  const queue = player.getQueue(voicechannel.guild.id);

  if (message.member.voice.channel == null) {
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
      if (!queue.playing) {
        embed = await createEmbed(
          "Advertencia",
          "No se esta reproduciendo nada justo ahora"
        );
        message.reply({ embeds: [embed] });
      } else {
        try {
          queue.clear();
          message.react("✅");
        } catch (e) {
          embed = await createEmbed(
            "Error",
            "Ocurrio un error al intentar eliminar la lista de reproduccion, intenta de nuevo o contacta a soporte"
          );
          message.reply({ embeds: [embed] });
        }
      }
    }
  }
};
module.exports.config = {
  name: "clearqueue",
  aliases: ["cq"],
};
