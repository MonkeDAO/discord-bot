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
const wait = require("node:timers/promises").setTimeout;
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

function findImageUrisByName(data, name) {
  return data
    .filter((entry) => entry.mint.name === name)
    .map((entry) => entry.mint.imageUri);
}

function findTraitByName(data, name, traitt) {
  const entry = data.find((entry) => entry.mint.name === name);
  if (entry) {
    const trait = entry.mint.attributes.find(
      (attr) => attr.trait_type === traitt
    );
    return trait ? trait.value : null;
  } else {
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

    let imageUri, type, clothes, ears, mouth, eyes, hat;

    if (generation === 2) {
      const inputName = `SMB #${number}`;
      imageUri = findImageUrisByName(jsonData, inputName).toString();
      type = findTraitByName(jsonData, inputName, "Type");
      clothes = findTraitByName(jsonData, inputName, "Clothes");
      ears = findTraitByName(jsonData, inputName, "Ears");
      mouth = findTraitByName(jsonData, inputName, "Mouth");
      eyes = findTraitByName(jsonData, inputName, "Eyes");
      hat = findTraitByName(jsonData, inputName, "Hat");
    }

    if (generation === 3) {
      const inputName = `SMB #${number}`;
      imageUri = findImageUrisByName(jsonData, inputName).toString();
      type = findTraitByName(jsonData, inputName, "Type");
      clothes = findTraitByName(jsonData, inputName, "Clothes");
      ears = findTraitByName(jsonData, inputName, "Ears");
      mouth = findTraitByName(jsonData, inputName, "Mouth");
      eyes = findTraitByName(jsonData, inputName, "Eyes");
      hat = findTraitByName(jsonData, inputName, "Hat");
    }

    const embed = new EmbedBuilder()
      .setTitle(`Dress Up Your Monke!`)
      .setColor("#0099ff")
      .setDescription(
        `Hello Gen${generation} Monke #${number}! Choose how you want to dress up your Monke`
      )
      .setThumbnail(
        "https://utfs.io/f/fe2b27a4-d815-4801-bd46-748166eecb3b-18ddfq.png"
      )
      .setImage(imageUri)
      .addFields(
        { name: "Type", value: type, inline: true },
        { name: "Clothes", value: clothes, inline: true },
        { name: "Ears", value: ears, inline: true },
        { name: "Mouth", value: mouth, inline: true },
        { name: "Eyes", value: eyes, inline: true },
        { name: "Hat", value: hat, inline: true }
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
      .setLabel("Wallpaper")
      .setStyle(ButtonStyle.Success);
    const banner = new ButtonBuilder()
      .setCustomId("banner")
      .setLabel("Banner")
      .setStyle(ButtonStyle.Success);
    const watchface = new ButtonBuilder()
      .setCustomId("watchface")
      .setLabel("Watchface")
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

    const response = await interaction.reply({
      embeds: [embed],
      components: [row1, row2],
    });

    await wait(2_000);
    let newRow;
    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        // time: 60_000,
      });

      if (confirmation.customId === "background") {
        const holiday = new ButtonBuilder()
          .setCustomId("holiday")
          .setLabel("Holiday")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(holiday, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "outfit") {
        const kit = new ButtonBuilder()
          .setCustomId("kit")
          .setLabel("Outfit")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(kit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "sombrero") {
        const outfit = new ButtonBuilder()
          .setCustomId("outfit")
          .setLabel("Outfit")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(outfit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "gif") {
        const outfit = new ButtonBuilder()
          .setCustomId("outfit")
          .setLabel("Outfit")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(outfit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "wallpaper") {
        const outfit = new ButtonBuilder()
          .setCustomId("outfit")
          .setLabel("Outfit")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(outfit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "banner") {
        const outfit = new ButtonBuilder()
          .setCustomId("outfit")
          .setLabel("Outfit")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(outfit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "watchface") {
        const outfit = new ButtonBuilder()
          .setCustomId("outfit")
          .setLabel("Outfit")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(outfit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "save") {
        const outfit = new ButtonBuilder()
          .setCustomId("outfit")
          .setLabel("Outfit")
          .setStyle(ButtonStyle.Primary);
        const nobg = new ButtonBuilder()
          .setCustomId("nobg")
          .setLabel("No Background")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(outfit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      }
    } catch (e) {
      console.log(e);
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
      });
    }
  },
};
