const { EmbedBuilder } = require("discord.js");
require("dotenv").config();
const { prefix, owner } = process.env;
const { getCommands } = require("../lib/functions.js");
module.exports.run = async (client, message, args) => {
	const { command, alias, type, desc, fulldesc } = await getCommands();
	let txt = `*Comandos* 
*Prefijo*: [  ${prefix}  ] 
_yo_ : https://instagram.com/Cyopn_

*Informacion*
Escribe ${prefix} seguido de cualquiera de los comandos, recuerda que puedes usar el nombre del comando o su alias.
_Uso: ${prefix}[Comando] [Texto/Enlace/Otros]_
Se deben sustituir los parentesis/corchetes segun corresponda.

*Comandos disponibles*:`;
	let fields = [];
	command.forEach((name) => {
		const sr = command.indexOf(name);
		if (type[sr] === "ign" || type[sr] === "admin" || type[sr] === "test")
			return;
		fields.push({
			name: name,
			value: `**Alias: ${alias[sr].toString().replaceAll(",", ", ")}**\n${desc[sr]}`,
			inline: true,
		});
	});
	let embed = new EmbedBuilder()
		.setTitle("CyopnBot")
		.setDescription(txt)
		.addFields(fields)
		.setFooter({ text: "CyopnBot" })
		.setColor(Math.floor(Math.random() * 16777214) + 1)
		.setTimestamp();

	message.reply({ embeds: [embed] });
};

module.exports.config = {
	name: `help`,
	alias: [`h`, `ayuda`],
	type: `help`,
	description: `Muestra este mensaje`,
	fulldesc: `nose`,
};
