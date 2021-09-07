const Discord = require('discord.js');
lyricsParse = require("lyrics-finder");
module.exports.run = async (client, message, args) => {
	try {
    const track = client.player.nowPlaying(message)
      const [songName, artistName] = track.title.split("|");
      const songNameFormated = songName
				.toLowerCase()
				.replace(/\(lyrics\)|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
				.split(" ").join("%20");

			let lyrics = await lyricsParse(songNameFormated);
      if(lyrics.length > 2040) {
				lyrics = lyrics.substr(0, 2000)
        let embed = new Discord.MessageEmbed()
				.setTitle(`Letra de: ${track.title}`)
				.setDescription(lyrics)
				.setColor('RANDOM')
				.setFooter('CyopnBot')
				.setTimestamp();
			message.channel.send(embed);
      } else if(!lyrics.length) {
        message.channel.send('Sin resultados!')
			}
	} catch (e) {
		console.log(e);
	}
};
module.exports.config = {
	name: 'lyric',
	aliases: ['ly']
};
