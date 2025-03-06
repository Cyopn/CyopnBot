const { EmbedBuilder } = require("discord.js");
const fs = require("fs/promises");
/**
 * Funcion asincrona para obtener los comandos existententes en el directorio ./commands.
 * @returns Diccionario con todos los comandos con su respectivo alias, tipo, descripcion y descripcion detallada.
 */
const getCommands = async () => {
	let cmds = []
	const files = await fs.readdir("./commands/");
	const jsfile = files.filter((f) => f.split(".").pop() === "js")
	jsfile.forEach((f) => {
		let pull = require(`../commands/${f}`)
		cmds.push(pull.config)
	})
	return cmds;
};

/**
 * Crea un mensaje incrustado
 * @param {String} type Tipo de mensage
 * @param {String} title Titulo del mensaje
 * @param {String} args Texto en la descripcion
 * @return {Object} Mensaje incrustado
 */
const createEmbed = async (type, title, args) => {
	let color = "";
	if (type == "Advertencia") {
		color = "Orange";
	} else if (type == "Error") {
		color = "Red";
	} else {
		color = "Random";
	}

	let embed = new EmbedBuilder()
		.setTitle(title)
		.setDescription(args)
		.setColor(color)
		.setFooter({ text: "CyopnBot" })
		.setTimestamp();
	return embed;
};

module.exports = { createEmbed, getCommands };
