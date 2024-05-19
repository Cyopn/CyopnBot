const { createEmbed } = require("../lib/functions.js");
const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports.run = async (client, message, args) => {
	try {
		const voiceChannel = message.member.voice.channel
			? message.member.voice.channel
			: null;
		const queue = await useQueue(message.guild.id);
		if (voiceChannel == null) {
			await message.reply({
				embeds: [
					await createEmbed(
						"Advertencia",
						"Advertencia",
						"Debes estar en un canal de voz.",
					),
				],
			});
		} else {
			if (queue == undefined) {
				await message.reply({
					embeds: [
						await createEmbed(
							"Advertencia",
							"Advertencia",
							"No se esta reproduciendo nada justo ahora.",
						),
					],
				});
			} else {
				if (queue.metadata.vc.id !== voiceChannel.id) {
					await message.reply({
						embeds: [
							await createEmbed(
								"Advertencia",
								"Advertencia",
								"Debes estar en el mismo canal de voz que yo.",
							),
						],
					});
				} else {
					if (queue.tracks.size >= 1) {
						let pro = queue.node.createProgressBar();
						let pre = queue.node.getTimestamp();
						let embed = new EmbedBuilder()
							.setTitle(`Reproduciendo ahora`)
							.setDescription(
								`**${queue.currentTrack.title}** de ${
									queue.currentTrack.author
								} (\`${
									pre.progress == "Infinity"
										? "Live"
										: pre.progress + "%"
								}\`) `,
							)
							.addFields({
								name: "\u200b",
								value: `${pro.replace(/ 0:00/g, " ◉ LIVE")}`,
							})
							.setThumbnail(queue.currentTrack.thumbnail)
							.setColor(Math.floor(Math.random() * 16777214) + 1)
							.setFooter({ text: "CyopnBot" })
							.setTimestamp();
						message.reply({ embeds: [embed] });
					} else {
						await message.reply({
							embeds: [
								await createEmbed(
									"Advertencia",
									"Advertencia",
									"No se esta reproduciendo nada justo ahora.",
								),
							],
						});
					}
					
				}
			}
		}
	} catch (e) {
		console.log(e);
		message.reply({
			embeds: [
				await createEmbed(
					"Error",
					"Error",
					`Ocurrio un error al intentar mostrar el mensaje: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `nowplaying`,
	alias: [`np`],
	type: `misc`,
	description: `Muestra la cancion que se esta reproduciendo ahora.`,
	fulldesc: `Comando que muestra la cancion que se esta reproduciendo ahora en el canal de voz donde te encuentras.`,
};
