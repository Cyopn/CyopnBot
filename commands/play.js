const { createEmbed } = require("../lib/functions.js");

const isPlaylistLikeQuery = (query) => {
	const value = String(query || "").toLowerCase();
	return (
		(value.includes("youtube.com") && value.includes("list=")) ||
		/spotify\.com\/(?:intl-[a-z]{2}(?:-[a-z]{2})?\/)?playlist\//i.test(value) ||
		/spotify\.com\/(?:intl-[a-z]{2}(?:-[a-z]{2})?\/)?album\//i.test(value) ||
		/spotify:(?:playlist|album):/i.test(value)
	);
};

module.exports.run = async (client, message, args, player) => {
	let query = args.join(" ");
	let processingMessage = null;
	try {
		const voiceChannel = message.member.voice.channel
			? message.member.voice.channel
			: null;
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
			const queue = player.getQueue(message.guild.id);
			if (queue && queue.metadata.vc.id !== voiceChannel.id)
				return message.reply({
					embeds: [
						await createEmbed(
							"Advertencia",
							"Advertencia",
							"Debes estar en el mismo canal de voz que yo.",
						),
					],
				});
			if (!query || query.length <= 0)
				return message.reply({
					embeds: [
						await createEmbed(
							"Advertencia",
							"Advertencia",
							"Debes ingresar una busqueda o un enlace.",
						),
					],
				});

			if (isPlaylistLikeQuery(query)) {
				processingMessage = await message.reply({
					embeds: [
						await createEmbed(
							"random",
							"Reproductor",
							"Procesando playlist, esto puede tardar unos segundos...",
						),
					],
				});
			}

			const result = await player.enqueue(
				message.guild,
				{ channel: message.channel, vc: voiceChannel },
				voiceChannel,
				query,
				message.member.id,
			);
			if (!result.addedTracks.length)
				return message.reply({
					embeds: [
						await createEmbed(
							"Advertencia",
							"Advertencia",
							"No se pudo encontrar contenido reproducible (puede que los videos esten caidos o no disponibles).",
						),
					],
				});

			if (processingMessage) {
				await processingMessage.edit({
					embeds: [
						await createEmbed(
							"random",
							"Reproductor",
							`Playlist procesada. Se agregaron ${result.addedTracks.length} canciones a la cola.`,
						),
					],
				});
			}
		}
	} catch (e) {
		console.log(e);
		const details = e && e.message ? e.message : String(e);
		const shortDetails = details.length > 600 ? `${details.slice(0, 600)}...` : details;
		if (processingMessage) {
			await processingMessage.edit({
				embeds: [
					await createEmbed(
						"Error",
						"Error",
						`Ocurrio un error al procesar la playlist.\n${shortDetails}`,
					),
				],
			});
			return;
		}
		message.reply({
			embeds: [
				await createEmbed(
					"Error",
					"Error",
					`Ocurrio un error al intentar reproducir.\n${shortDetails}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `play`,
	alias: [`p`],
	type: `misc`,
	description: `Reporoduce una canción con su enlace o escribiendo una busqueda.`,
	fulldesc: `Comando para reproducir una canción con su enlace (youtube, deezer, soundcloud, etc) o escribiendo una busqueda.`,
};
