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
					if (queue.node.isPlaying()) {
						await queue.node.setPaused(true);
						await message.react("⏸");
					} else {
						message.reply({
							embeds: [
								await createEmbed(
									"Advertencia",
									"Advertencia",
									"El reproductor ya esta en pausa.",
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
					`Ocurrio un error al intentar pausar: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `pause`,
	alias: [`ps`],
	type: `misc`,
	description: `Pausa la reproduccion actual.`,
	fulldesc: `Comando para pausar la reproduccion actual.`,
};
