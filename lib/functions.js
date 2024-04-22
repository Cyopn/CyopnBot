const { EmbedBuilder } = require("discord.js");
const sleep = require("ko-sleep");
const fs = require("fs");
/**
 * Funcion asincrona para obtener los comandos existententes en el directorio ./commands.
 * @returns Diccionario con todos los comandos con su respectivo alias, tipo, descripcion y descripcion detallada.
 */
const getCommands = async () => {
	let command = [];
	let alias = [];
	let type = [];
	let desc = [];
	let fulldesc = [];
	fs.readdir("./commands/", (err, files) => {
		if (err) return console.error(err);
		let jsfile = files.filter((f) => f.split(".").pop() === "js");
		if (jsfile.length <= 0)
			return console.log("No se encontro ningun comando");
		jsfile.forEach((f) => {
			let pull = require(`../commands/${f}`);
			command.push(pull.config.name);
			alias.push(pull.config.alias);
			type.push(pull.config.type);
			desc.push(pull.config.description);
			fulldesc.push(pull.config.fulldesc);
		});
	});
	await sleep(1 * 1000);
	const dict = {
		command: command,
		alias: alias,
		type: type,
		desc: desc,
		fulldesc: fulldesc,
	};
	return dict;
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
