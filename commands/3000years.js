const Discord = require("discord.js");
const ameClient = require("amethyste-api")
const ameApi = new ameClient(process.env.tokename)
module.exports.run = async(client, message, args) => {
    try {
        let miembro = message.mentions.users.first();
        if (!miembro) {
            const buffer = await ameApi.generate("3000years", {
                "url": message.author.displayAvatarURL({ format: "png", size: 512 })
            })
            const attachment = new Discord.MessageAttachment(buffer, "3000years.png");
            message.channel.send(attachment);
        } else {
            const buffer = await ameApi.generate("3000years", {
                "url": miembro.displayAvatarURL({ format: "png", size: 512 })
            })
            const attachment = new Discord.MessageAttachment(buffer, "3000years.png");
            message.channel.send(attachment);
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.config = {
    name: "3years",
    aliases: ['3y']
}