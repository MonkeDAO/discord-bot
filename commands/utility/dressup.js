const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const monkeDataPath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "monkeList.json"
);

let jsonData;
try {
  jsonData = JSON.parse(fs.readFileSync(monkeDataPath, "utf-8"));
  console.log("JSON data loaded successfully");
} catch (error) {
  console.error("Error reading monke data:", error);
  process.exit(1);
}

function findImageByName(monkename) {
  if (jsonData.mint) {
    console.log("Mint object found!", jsonData.mint);
    if (jsonData.mint.name === monkename) {
      return jsonData.mint.imageUri;
    } else {
      console.log(`Name "${monkename}" does not match "${jsonData.mint.name}"`);
      return null;
    }
  } else {
    console.log("Mint object not found in JSON data");
    return null;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dressup")
    .setDescription("Dress up your Monke or generate assets with your Monke")
    .addNumberOption((option) =>
      option
        .setName("generation")
        .setDescription("Which generation is your Monke")
        .setRequired(true)
        .setMaxValue(3)
        .setMinValue(2)
    )
    .addNumberOption((option) =>
      option
        .setName("monke")
        .setDescription("What number is your Monke")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(10000)
    ),

  async execute(interaction) {
    const generation = interaction.options.getNumber("generation");
    const number = interaction.options.getNumber("monke");

    const background = new ButtonBuilder().setLabel("Background");

    if (generation === 2 && number > 5000) {
      return interaction.reply("You can't have a Monke that big!");
    }

    if (generation === 2) {
      const inputName = `SMB #${number}`;
      console.log(inputName);
      const imageUri = findImageByName(inputName);

      console.log(imageUri);
      const file = new AttachmentBuilder(
        "https://utfs.io/f/1571c870-c11d-42d4-a767-bd7599ed8d8e-o6rynl.png"
      );

      const embed = new EmbedBuilder()
        .setTitle(`Your Monke`)
        .setColor("#0099ff")
        .setDescription(`Gen2 Monke #${number}`)
        .setThumbnail(
          "https://utfs.io/f/fe2b27a4-d815-4801-bd46-748166eecb3b-18ddfq.png"
        )
        .setImage(
          "https://utfs.io/f/83aad697-0aa7-456f-8bc2-4e35aa06ab02-2fyg.png"
        ) // Need to include the particular user's monke pic.
        .addFields(
          { name: "Type", value: "xyz", inline: true },
          { name: "Clothes", value: "xyz", inline: true },
          { name: "Ears", value: "xyz", inline: true },
          { name: "Mouth", value: "xyz", inline: true },
          { name: "Eyes", value: "xyz", inline: true },
          { name: "Hat", value: "xyz", inline: true }
        )
        .setTimestamp();
      await interaction.reply({
        content: `Hello Gen${generation} #${number} Monke! Welcome to Monke Dress Up! Choose how you want to dress up your Monke`,
        embeds: [embed],
        files: [file],
      });
    }
  },
};
