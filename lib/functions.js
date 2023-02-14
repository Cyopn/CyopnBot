const { EmbedBuilder } = require("discord.js");
const axios=require("axios")
const path = require('path')
const fsPromises = require('fs/promises')

/**
 * Crea un mensaje incrustado
 * @param {String} type Tipo de mensage
 * @param {String} args Texto en la descripcion
 * @return {Object} Mensaje incrustado
 */
const createEmbed = async (type, args) => {
  let color = "";
  if (type == "Advertencia") {
    color = "Orange";
  } else if (type == "Error") {
    color = "Red";
  } else {
    color = "Random";
  }

  let embed = new EmbedBuilder()
    .setTitle(type)
    .setDescription(args)
    .setColor(color)
    .setFooter({ text: "CyopnBot" })
    .setTimestamp();
  return embed;
};

/**
 * 
 * @returns Archivo JSON actualizado
 */
const loadJson = async () => {
  const filePath = path.resolve("./temp/praw.json")
  try {
      const data = await fsPromises.readFile(filePath);

      const obj = JSON.parse(data);

      return obj
  } catch (err) {
      console.log(err);
  }
}


module.exports = { createEmbed, loadJson };
