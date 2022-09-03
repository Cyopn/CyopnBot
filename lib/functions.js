const { EmbedBuilder } = require("discord.js");
const axios=require("axios")
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
 * Funcion obtener imagen de reddit
 * @param {String} subReddit Reddit a recuperar
 * @return url de imagen
 */
 const getRed = async(subReddit) => {
  return await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddit}`)
}

module.exports = { createEmbed, getRed };
