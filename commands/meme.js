const { EmbedBuilder } = require("discord.js");
const axios = require("axios").default;
module.exports.run = async (client, message, args) => {
	try {
		const response = await axios.get(
			"https://www.reddit.com/r/ChingaTuMadreNoko.json",
		);
		const data = response.data.data.children;
		const random = Math.floor(Math.random() * data.length);
		const meme = data[random].data;
		message.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(`**${meme.title}**`)
					.setDescription(
						`Publicado por: ${meme.author} en [r/ChingaTuMadreNoko](https://www.reddit.com/r/ChingaTuMadreNoko/)`,
					)
					.setColor(Math.floor(Math.random() * 16777214) + 1)
					.setImage(meme.url)
					.setFooter({ text: "CyopnBot" })
					.setTimestamp(),
			],
		});
	} catch (e) {
		console.log(e);
		message.reply({
			embeds: [
				await createEmbed(
					"Error",
					"Error",
					`Ocurrio un error al intentar enviar la publicacion: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: `meme`,
	alias: [`m`],
	type: `misc`,
	description: `Muestra un meme aleatorio de r/ChingaTuMadreNoko`,
	fulldesc: `nose`,
};
