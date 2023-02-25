const { EmbedBuilder } = require("discord.js");
const db = require('megadb');
let bu = new db.crearDB({
    nombre: 'dataArtc',
    carpeta: './database'
})
module.exports.run = async (client, message, args, player) => {
    try {
        let args1 = args.join(' ')
        let obj = args[0]
        let ct = args[1]
        let tt
        if (!obj) return message.channel.send('Ingrsa el objeto a comprar')
        if (!bu.tiene(message.guild.id)) bu.establecer(message.guild.id, {})
        if (!bu.tiene(`${message.guild.id}.${message.author.id}`)) bu.establecer(`${message.guild.id}.${message.author.id}`, { dinero: 0, criko: 0, toston: 0, pbm: 0, pnm: 0, pdm: 0, jarron: 0, mlp: 0 })
        if (args1.includes('criko')) {
            if (ct) {
                let to = ct * 10
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.criko`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` criko(s) por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }

        } else if (args1.includes('toston')) {
            if (ct) {
                let to = ct * 50
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.toston`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` toston(es) por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }
        } else if (args1.includes('paquete basico de mona')) {
            if (ct) {
                let to = ct * 15
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.pbm`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` paquete(s) basico(s) de mona por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }
        } else if (args1.includes('paquete normal de mona')) {
            if (ct) {
                let to = ct * 25
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.pnm`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` paquete(s) normal(es) de mona por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }
        } else if (args1.includes('paquete delux de mona')) {
            if (ct) {
                let to = ct * 40
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.pdm`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` paquete(s) delux de mona por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }
        } else if (args1.includes('jarron')) {
            if (ct) {
                let to = ct * 5
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.jarron`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` jarron(es) por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }
        } else if (args1.includes('muñeco my little pony')) {
            if (ct) {
                let to = ct * 15
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.mlp`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` muñeco(s) de my litle pony por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }
        } else if (args1.includes('coca')) {
            if (ct) {
                let to = ct * 30
                tt = to - 1
                let { dinero } = await bu.obtener(`${message.guild.id}.${message.author.id}`)
                if (dinero <= 0) {
                    const embed = new EmbedBuilder()
                        .setTitle('PejeCoins insuficientes!')
                        .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                        .setFooter({ text: 'CyopnBot' })
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setTimestamp()
                    message.reply({ embeds: [embed] })
                } else {
                    if (dinero <= tt) {
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Necesitas \`${to}\` PejeCoins para realizar la compra, PejeCoins actuales: \`${dinero}\``)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    } else {
                        bu.sumar(`${message.guild.id}.${message.author.id}.mlp`, parseInt(ct))
                        bu.restar(`${message.guild.id}.${message.author.id}.dinero`, to)
                        const embed = new EmbedBuilder()
                            .setTitle('PejeCoins insuficientes!')
                            .setDescription(`Adquirio \`${ct}\` coca(s) por \`${to}\` PejeCoins`)
                            .setFooter({ text: 'CyopnBot' })
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setTimestamp()
                        message.reply({ embeds: [embed] })
                    }
                }
            } else {
                const embed = new EmbedBuilder()
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(`Articulos`)
                    .setDescription(`Intrpduce la cantidad de articulos a comprar \nArticulos disponibles por el momento`)
                    .addFields(
                        { name: 'Criko', value: '10 PejeCoins', inline: true },
                        { name: 'Jarron', value: '5 PejeCoins', inline: true },
                        { name: 'Toston', value: '50 PejeCoins', inline: true },
                        { name: 'Paquete basico de mona', value: '**Descripcion** \nThiner a la mitad y un trapito \n**Costo** \n15 PejeCoins', inline: true },
                        { name: 'Paquete normal de mona', value: '**Descripcion** \nThiner a la mitad y un trapo nuevo \n**Costo** \n25 PejeCoins', inline: true },
                        { name: 'Paquete delux de mona', value: '**Descripcion** \nThiner lleno y una rata recien muerta \n**Costo**\n40 PejeCoins', inline: true },
                        { name: 'Muñeco my litle pony', value: '15 PejeCoins', inline: true },
                        { name: 'Coca', value: '**Descripcion** \nUna bolsita de coca cola \n**Costo** \n30 Pejecoins', inline: false }
                    )
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter({ text: 'CyopnBot' })
                    .setTimestamp()
                message.reply({ embeds: [embed] });
            }
        } else {
            message.channel.send('El articulo a comprar no existe')
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports.config = {
    name: "buy",
    aliases: ['by']
}