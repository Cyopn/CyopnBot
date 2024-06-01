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
					if (queue.node.isPlaying() && queue.node.isPlaying()) {
						const v = parseInt(args.join(""));
						if (!v || isNaN(v)) {
							message.reply({
								embeds: [
									await createEmbed(
										"random",
										"Reproductor",
										`El volumen justo ahora es ${queue.node.volume}, si deseas cambiarlo, escribe un numero entre 0 y 100.`,
									),
								],
							});
						} else {
							if (v < 0 || v > 100) {
								message.reply({
									embeds: [
										await createEmbed(
											"Advertencia",
											"Reproductor",
											"El volumen debe estar dentro del rango: 0 a 100",
										),
									],
								});
							} else {
								const sc = queue.node.setVolume(
									parseInt(args[0]),
								);
								if (sc) {
									message.react("👍");
								}
							}
						}
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
					`Ocurrio un error al intentar ajustar el volumen: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `volume`,
	alias: [`v`],
	type: `misc`,
	description: `Cambiar el volumen del reproductor.`,
	fulldesc: `Comando para cambiar el volumen del reproductor. El rango de volumen es de 0 a 100.`,
};
