const { EmbedBuilder } = require("discord.js");
const { createEmbed } = require("../lib/functions.js");
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
						const page = 1;
						const pageStart = 10 * (page - 1);
						const pageEnd = pageStart + 10;
						const currentTrack = queue.currentTrack;
						const tracks = queue.tracks
							.toArray()
							.slice(pageStart, pageEnd)
							.map((track, i) => {
								return `${i + 1 + pageStart}. [${
									track.title
								}](${track.url})`;
							});
						message.reply({
							embeds: [
								new EmbedBuilder()
									.setTitle(`Lista de reproduccion`)
									.setDescription(
										`${tracks.join("\n")} ${
											queue.tracks.size > pageEnd
												? `\n...${
														queue.tracks.size -
														pageEnd
												  } mas canciones`
												: ""
										}`,
									)
									.addFields({
										name: `Reproduciendo ahora`,
										value: `${currentTrack.title}`,
									})
									.setColor(
										Math.floor(Math.random() * 16777214) +
											1,
									)
									.setFooter({ text: "CyopnBot" })
									.setTimestamp(),
							],
						});
					} else {
						message.reply({
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
					`Ocurrio un error al intentar mostrar la cola de reproduccion: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `queue`,
	alias: [`q`],
	type: `misc`,
	description: `Muestra la cola de reproduccion actual.`,
	fulldesc: `Comando para mostrar la cola de reproduccion actual en el canal de voz.`,
};
