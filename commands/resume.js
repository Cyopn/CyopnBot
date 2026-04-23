const { createEmbed } = require("../lib/functions.js");
module.exports.run = async (client, message, args, player) => {
	try {
		const voiceChannel = message.member.voice.channel
			? message.member.voice.channel
			: null;
		const queue = player.getQueue(message.guild.id);
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
					if (player.isPaused(queue)) {
						player.resume(queue);
						await message.react("▶️");
					} else {
						message.reply({
							embeds: [
								await createEmbed(
									"Advertencia",
									"Advertencia",
									"El reproductor no esta en pausa.",
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
					`Ocurrio un error al intentar reanudar la reproduccion: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `resume`,
	alias: [`rs`],
	type: `misc`,
	description: `Continua con la reproduccion actual.`,
	fulldesc: `Comando para continuar con la reproduccion actual en el canal de voz.`,
};
