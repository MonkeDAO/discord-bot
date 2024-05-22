const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentAssertions,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  handleButtonInteraction,
} = require("../../utils/handleButtonInteraction");

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

    const file = new AttachmentBuilder(
      "https://utfs.io/f/1571c870-c11d-42d4-a767-bd7599ed8d8e-o6rynl.png"
    );

    const embed = new EmbedBuilder()
      .setTitle(`Dress Up Your Monke!`)
      .setColor("#0099ff")
      .setDescription(
        `Hello Gen${generation} Monke #${number}! Choose how you want to dress up your Monke`
      )
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

    const background = new ButtonBuilder()
      .setCustomId("background")
      .setLabel("Background")
      .setStyle(ButtonStyle.Success);
    const outfit = new ButtonBuilder()
      .setCustomId("outfit")
      .setLabel("Outfit")
      .setStyle(ButtonStyle.Success);
    const sombrero = new ButtonBuilder()
      .setCustomId("sombrero")
      .setLabel("Sombrero")
      .setStyle(ButtonStyle.Success);
    const gif = new ButtonBuilder()
      .setCustomId("gif")
      .setLabel("GIFs")
      .setStyle(ButtonStyle.Success);
    const wallpaper = new ButtonBuilder()
      .setCustomId("wallpaper")
      .setLabel("Save as Wallpaper")
      .setStyle(ButtonStyle.Success);
    const banner = new ButtonBuilder()
      .setCustomId("banner")
      .setLabel("Save as Banner")
      .setStyle(ButtonStyle.Success);
    const watchface = new ButtonBuilder()
      .setCustomId("Save as Watchface")
      .setLabel("Background")
      .setStyle(ButtonStyle.Success);
    const save = new ButtonBuilder()
      .setCustomId("save")
      .setLabel("Save as Is")
      .setStyle(ButtonStyle.Success);

    const row1 = new ActionRowBuilder().addComponents(
      background,
      outfit,
      sombrero,
      gif,
      wallpaper
    );
    const row2 = new ActionRowBuilder().addComponents(banner, watchface, save);

    if (generation === 2 && number > 5000) {
      return interaction.reply("You can't have a Monke that big!");
    }

    if (generation === 2) {
      const inputName = `SMB #${number}`;
      console.log(inputName);
      const imageUri = findImageByName(inputName);

      console.log(imageUri);
    }
    await interaction.reply({
      embeds: [embed],
      //   files: [file],
      components: [row1, row2],
    });

    // let newRow;

    // if (interaction.customId === "background") {
    //   newRow = new ActionRowBuilder().addComponents(
    //     new ButtonBuilder()
    //       .setCustomId("holiday")
    //       .setLabel("Holiday")
    //       .setStyle(ButtonStyle.Primary),
    //     new ButtonBuilder()
    //       .setCustomId("nobg")
    //       .setLabel("No Background")
    //       .setStyle(ButtonStyle.Primary)
    //   );
    // } else if (interaction.customId === "outfit") {
    //   newRow = new ActionRowBuilder().addComponents(
    //     new ButtonBuilder()
    //       .setCustomId("outfit")
    //       .setLabel("Outfit")
    //       .setStyle(ButtonStyle.Primary),
    //     new ButtonBuilder()
    //       .setCustomId("nobg")
    //       .setLabel("No Background")
    //       .setStyle(ButtonStyle.Primary)
    //   );
    // }

    // await interaction.followUp({
    //   content: "Customize your selection!",
    //   components: [newRow],
    // });
  },
};
