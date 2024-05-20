const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command.")
    .addStringOption((option) =>
      option
        .setName("reload")
        .setDescription("The command to reload.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const commandName = interaction.options.getStrin;
  },
};
