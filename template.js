const {createEmbed }=require("../lib/functions")
module.exports.run = async (client, message, args) => {
	try {
		
	} catch (e) {
		console.log(e);
		message.reply({
			embeds: [
				await createEmbed(
					"Error",
					"Error",
					`Ocurrio un error al intentar reproducir: \n${e}`,
				),
			],
		});
	}
};

module.exports.config = {
	name: ``,
	alias: [``],
	type: ``,
	description: ``,
	fulldesc: ``,
};
