const Discord = require('discord.js');
const star = require('star-labs');
module.exports.run = async (client, message, args) => {
	try {
		let cry = await star.cry();
		let embed = new Discord.MessageEmbed()
			.setTitle(`**${message.author.username}** empezo a llorar`)
			.setDescription('¿Que tiene mi princesa?')
			.setColor('RANDOM')
			.setFooter('CyopnBot')
			.setTimestamp()
			.setImage(cry);
		message.channel.send(embed);
	} catch (e) {
		console.log(e);
	}
};
module.exports.config = {
	name: 'cry',
	aliases: ['cr']
};
