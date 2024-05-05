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
						"Debes ingresar un nombre para el(los) sticker(s).",
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
			message.guild.stickers
				.create({
					file: attachment,
					name: name,
					tags: "nose",
				})
				.then(async (sticker) => {
					message.reply({
						embeds: [
							await createEmbed(
								"Random",
								"Sticker creado",
								`Se ha creado el sticker ${sticker.name}.`,
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
								`Ocurrio un error al intentar crear el sticker: \n${e}`,
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
					`Ocurrio un error al intentar crear el sticker: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `sticker`,
	alias: [`s`],
	type: ``,
	description: ``,
	fulldesc: ``,
};
