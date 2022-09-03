const Discord = require('discord.js');
const star = require('star-labs');
module.exports.run = async (client, message, args, player) => {
	try {
		let cry = await star.cry();
		let embed = new EmbedBuilder()
			.setTitle(`**${message.author.username}** empezo a llorar`)
			.setDescription('¿Que tiene mi princesa?')
			.setColor(Math.floor(Math.random() * 16777214) + 1)
			.setFooter({ text: 'CyopnBot' })
			.setTimestamp()
			.setImage(cry);
		message.reply({ embeds: [embed] });
	} catch (e) {
		console.log(e);
	}
};
module.exports.config = {
	name: 'cry',
	aliases: ['cr']
};
