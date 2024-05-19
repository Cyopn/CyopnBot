const { EmbedBuilder } = require("discord.js");
const axios = require("axios").default;
module.exports.run = async (client, message, args) => {
		message.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(`**Enlace de invitacion**`)
					.setDescription(
						`Presiona la [Invitacion](https://discord.com/oauth2/authorize?client_id=799017226983440474&scope=bot&permissions=1099511627775) para agregarme a tu servidor.`,
					)
					.setColor(Math.floor(Math.random() * 16777214) + 1)
					.setFooter({ text: "CyopnBot" })
					.setTimestamp(),
			],
		});
};

module.exports.config = {
	name: `invite`,
	alias: [`in`, `invitacion`],
	type: `misc`,
	description: `Obten la invitacion del bot.`,
	fulldesc: `nose`,
};
