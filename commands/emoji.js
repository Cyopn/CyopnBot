const { createEmbed } = require("../lib/functions");
module.exports.run = async (client, message, args) => {
	try {
		let name = args.join(" ");
		if (!name || name.length <= 0)
			return message.reply({
				embeds: [
					await createEmbed(
						"Advertencia",
						"Advertencia",
						"Debes ingresar un nombre para el(los) emoji(s).",
					),
				],
			});
		const attachments = message.attachments.map((a) => a.url);
		if (attachments.length <= 0)
			return message.relpy({
				embeds: [
					await createEmbed(
						"Advertencia",
						"Advertencia",
						"Debes enviar una imagen.",
					),
				],
			});
		attachments.forEach((attachment) => {
			message.guild.emojis
				.create({
					attachment: attachment,
					name: name,
				})
				.then(async (emoji) => {
					message.reply({
						embeds: [
							await createEmbed(
								"Random",
								"Emoji creado",
								`Se ha creado el emoji ${emoji.name}.`,
							),
						],
					});
				})
				.catch(async (e) => {
					console.log(e);
					message.reply({
						embeds: [
							await createEmbed(
								"Error",
								"Error",
								`Ocurrio un error al intentar crear el emoji: \n${e}`,
							),
						],
					});
				});
		});
	} catch (e) {
		console.log(e);
		message.reply({
			embeds: [
				await createEmbed(
					"Error",
					"Error",
					`Ocurrio un error al intentar crear el emoji: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `emoji`,
	alias: [`e`],
	type: `misc`,
	description: `Crear un emoji personalizado.`,
	fulldesc: `Comando para crear un emoji personalizado en el servidor.`,
};
