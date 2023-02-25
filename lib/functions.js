const { EmbedBuilder } = require("discord.js");
const path = require('path')
const fsPromises = require('fs/promises')
const db = require('megadb')
const lvldB = new db.crearDB({
  nombre: 'dataLevel',
  carpeta: './database'
})

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

/**
 * 
 * @param {Object} client Cliente/bot
 * @param {Object} message Mensaje recibido
 */
const lvlFunc = async (message) => {
  const guild = message.guildId
  const sid = message.author.id
  const body = message.content

  if (body === '') return

  if (lvldB.has(guild) && lvldB.has(`${guild}.${sid}`)) {

    let { xp, level } = await lvldB.get(`${guild}.${sid}`)
    const sxp = ((Math.random() * body.length / 10)).toFixed(0)
    let lvlup = 5 * (level ** 2) + 50 * level + 100

    if ((parseInt(xp) + parseInt(sxp)) >= lvlup) {
      await lvldB.set(`${guild}.${sid}`, {
        xp: (parseInt(xp) + parseInt(sxp)) - parseInt(lvlup),
        level: parseInt(level) + 1
      })
      let a = await lvldB.get(`${guild}.${sid}`)
      let embed = new EmbedBuilder()
        .setTitle(`Nivel`)
        .setDescription(`Felicidades <@${sid}> has avanzado de nivel: ${a.level} \nSigue asi!`)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setFooter({ text: "CyopnBot" })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } else {
      await lvldB.add(`${guild}.${sid}.xp`, parseInt(sxp) + 1)
    }
  } else {
    await lvldB.set(`${guild}.${sid}`, {
      xp: 0,
      level: 1
    })
  }
}


module.exports = { createEmbed, loadJson, lvlFunc };
