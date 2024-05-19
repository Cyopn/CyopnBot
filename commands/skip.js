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
						queue.node.skip();
						await message.react("⏭️");
					} else {
						await message.reply({
							embeds: [
								await createEmbed(
									"Advertencia",
									"Advertencia",
									"No hay mas elementos en la lista de reproduccion.",
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
					`Ocurrio un error al intentar saltar la cancion en reproduccion: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `skip`,
	alias: [`sk`],
	type: `misc`,
	description: `Salta a la siguiente cancion en la cola de reproduccion.`,
	fulldesc: `Comando para saltar a la siguiente cancion en la cola de reproduccion en el canal de voz actual.`,
};
