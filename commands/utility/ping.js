const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  cooldown: 86400,
  data: new SlashCommandBuilder().setName("gm").setDescription("GM!"),
  async execute(interaction) {
    await interaction.reply("GM!");
  },
};
