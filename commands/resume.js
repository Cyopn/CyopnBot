const { createEmbed } = require('../lib/functions');

module.exports.run = async (client, message, args, player) => {
  let voicechannel = message.member.voice.channel
    ? message.member.voice.channel
    : null;

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
      if (!queue.node.isPaused()) {
        return message.reply("No hay nada pausado");
        /* embed = await createEmbed(
          "Advertencia",
          "No se esta reproduciendo nada justo ahora"
        );
        message.reply({ embeds: [embed] }); */
      } else {
        try {
          queue.node.resume();
          message.react("▶️");
        } catch (e) {
          embed = await createEmbed(
            "Error",
            "Ocurrio un error al intentar reanudar, intenta de nuevo o contacta a soporte"
          );
          message.reply({ embeds: [embed] });
          console.log(e)
        }
      }
    }
  }

};
module.exports.config = {
  name: "resume",
  aliases: ["rs"],
};
