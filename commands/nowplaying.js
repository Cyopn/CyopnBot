const { EmbedBuilder } = require("discord.js");
const { createEmbed } = require("../lib/functions");
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
      if (!queue.playing) {
        embed = await createEmbed(
          "Advertencia",
          "No se esta reproduciendo nada justo ahora"
        );
        message.reply({ embeds: [embed] });
      } else {
        let page = parseInt(args.join(""));
        if (args.join("") == "") page = 1;
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
              try {
                let pro = queue.createProgressBar();
                let pre = queue.getPlayerTimestamp();

                let embed = new EmbedBuilder()
                  .setTitle(`Reproduciendo ahora`)
                  .setDescription(`**${queue.current.title}** de ${queue.current.author} (\`${pre.progress == "Infinity" ? "Live" : pre.progress + "%"
                    }\`) `)
                  .addFields({ name: '\u200b', value: `${pro.replace(/ 0:00/g, ' ◉ LIVE')}` })
                  .setThumbnail(queue.current.thumbnail)
                  .setColor(Math.floor(Math.random() * 16777214) + 1)
                  .setFooter({ text: "CyopnBot" })
                  .setTimestamp();
                message.reply({ embeds: [embed] });

              } catch (e) {
                embed = await createEmbed(
                  "Error",
                  "Ocurrio un error al usar este comando, intenta de nuevo o contacta a soporte"
                );
                message.reply({ embeds: [embed] });
                console.log(e)
              }
            }
          }
        }
      }
    }
  }

};
module.exports.config = {
  name: "nowplaying",
  aliases: ["np"],
};
