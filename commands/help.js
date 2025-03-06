const { EmbedBuilder } = require("discord.js");
require("dotenv").config();
const { prefix, owner } = process.env;
const { getCommands } = require("../lib/functions.js");
module.exports.run = async (client, message, args) => {
	const commands = await getCommands();
	let txt = `*Comandos* 
*Prefijo*: [  ${prefix}  ] 
_yo_ : https://instagram.com/Cyopn_

*Informacion*
Escribe ${prefix} seguido de cualquiera de los comandos, recuerda que puedes usar el nombre del comando o su alias.
_Uso: ${prefix}[Comando] [Texto/Enlace/Otros]_
Se deben sustituir los parentesis/corchetes segun corresponda.

*Comandos disponibles*:`;
	let fields = [];
	commands.forEach((cmd) => {
		if (cmd.type === "ign" || cmd.type === "admin" || cmd.type === "test")
			return;
		fields.push({
			name: cmd.name,
			value: `**Alias: ${cmd.alias.toString().replaceAll(",", ", ")}**\n${cmd.description}`,
			inline: true
		})
	});
	let embed = new EmbedBuilder()
		.setTitle("CyopnBot")
		.addFields(fields)
		.setDescription(txt)
		.setFooter({ text: "CyopnBot" })
		.setColor("Random")
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
