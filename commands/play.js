const { createEmbed } = require("../lib/functions.js");
const { useQueue, Playlist } = require("discord-player");
const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args, player) => {
	let queue = null;
	let query = args.join(" ");
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
			queue = useQueue(message.guild.id);
			if (queue == undefined) {
				queue = await player.nodes.create(voiceChannel.guild, {
					leaveOnEnd: false,
					leaveOnStop: false,
					metadata: {
						channel: message.channel,
						vc: voiceChannel,
					},
				});
			}
			if (queue.metadata.vc.id !== voiceChannel.id)
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
			if (!queue.connection) await queue.connect(voiceChannel);

			const track = await player
				.search(query, {
					requestedBy: message.member.id,
				})
			if (!track)
				return message.reply({
					embeds: [
						await createEmbed(
							"Advertencia",
							"Advertencia",
							"No se pudo encontrar la canción.",
						),
					],
				});
			await queue.play(track);
		}
	} catch (e) {
		console.log(e);
		message.reply({
			embeds: [
				await createEmbed(
					"Error",
					"Error",
					`Ocurrio un error al intentar reproducir: \n${e}`,
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
