/* const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.send('Hello World');
});
let port = process.env.PORT || 3000;
app.listen(port);

require('dotenv').config();
 */
////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const config = process.env;
const { Player } = require('discord-player');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = process.env;
const fs = require('fs');
const fse = require('fs-extra');
const Canvas = require('canvas');
const MessageEmbed = require('discord.js');
const { MessageAttachment } = require('discord.js');

fs.readdir('./commands/', (err, files) => {
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0) return console.log('No se encontro ningun comando');
    jsfile.forEach((f, i) => {
        console.log(`Cargado ${f}`);
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name);
        });
    });
});

//Evento Nuevo miembro
client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(
        ch => ch.name === 'member-log'
    );
    if (!channel) return;
    try {
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        const back = await Canvas.loadImage('https://i.imgur.com/rdUJ65p.png');
        const applyText = (canvas, text) => {
            let fontSize = 70;
            do {
                ctx.font = `${(fontSize -= 10)}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 300);
            return ctx.font;
        };
        ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(
            'Bienvenid@ al servidor,',
            canvas.width / 2.5,
            canvas.height / 3.5
        );
        ctx.font = applyText(
            canvas,
            member.user.username + '#' + member.user.discriminatore
        );
        ctx.fillStyle = '#ffffff';
        ctx.fillText(
            member.user.username + '#' + member.user.discriminator,
            canvas.width / 2.5,
            canvas.height / 1.8
        );
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({ format: 'jpg' })
        );
        ctx.drawImage(avatar, 25, 25, 200, 200);
        const att = new Discord.MessageAttachment(canvas.toBuffer(), 'wel-img.png');
        channel.send(`Bienvenid@ al servidor, ${member}!`, att);
    } catch (e) {}
});

client.on('ready', () => {
    console.log('Bot listo');
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: `+help | Presente en ${client.guilds.cache.size} servidores!`,
            type: 'WATCHING',
            url: 'https://www.instagram.com/Cyopn_'
        }
    });
});

client.on('message', async message => {
    const { lvlFunc } = require('./dataBase/lvl.js');
    lvlFunc(message);

    //////////////////////////////
    if (!message.guild || message.author.bot) return;
    if (message.content.indexOf(config.prefix) != 0) return;
    let args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(' ');
    const command = args.shift().toLowerCase();
    const commandFile =
        client.commands.get(command) ||
        client.commands.get(client.aliases.get(command));
    if (!commandFile) return;
    try {
        commandFile.run(client, message, args, config.prefix);
    } catch (e) {
        return message.channel.send(
            `Un error ocurrio en ${command}: \n ${e.message}`
        );
    }
});

client.player = new Player(client, {
    ytdlDownloadOptions: {
        filter: 'audioonly'
    },
    leaveOnEnd: false,
    leaveOnEmpty: true,
    useSafeSearch: true,
    leaveOnStop: false,
    leaveOnEndCooldown: 500,
    leaveOnEmptyCooldown: 500,
    useSafeSearch: true,
    enableLive: true
});

client.player
    .on('trackStart', (message, track) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Reproduciendo ${track.title}`)
            .setDescription(`Pedido por ${message.author.username}`)
            .setColor('RANDOM')
            .setFooter('CyopnBot')
            .setTimestamp();
        message.channel.send(embed);
    })
    .on('trackAdd', (message, queue, track) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Se añadio ${track.title} a la lista de reproduccion`)
            .setDescription(`Pedido por ${message.author.username}`)
            .setColor('RANDOM')
            .setFooter('CyopnBot')
            .setTimestamp();
        message.channel.send(embed);
    })
    .on('error', (error, message) => {
        console.log(
            `Error en el servidor ${message.guild.name} \nMotivo: ${error}`
        );
    })
    .on('playlistAdd', (message, queue, playlist) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`${playlist.title} Se añadio a la cola`)
            .setDescription(
                `**Con ${playlist.tracks.length} Canciones** \nPedido por:${
					message.author.username
				}`
            )
            .setColor('RANDOM')
            .setFooter('CyopnBot')
            .setTimestamp();
        message.channel.send(embed);
    })
    .on('searchResults', (message, query, tracks) => {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Resultados para ${query}`)
                .setDescription(
                    `${tracks
					.map((t, i) => `**${i + 1}** - ${t.title}`)
					.join('\n')}\nPedido por:${message.author.username}`
			)
			.setColor('RANDOM')
			.setFooter('CyopnBot')
			.setTimestamp();
		message.channel.send(embed);
	});
client.login(config.token);