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
const {
  findImageUrisByName,
  findGen3ImageUrisByName,
  findTraitByName,
  findGen3TraitByName,
} = require("../../utils/fetchfuncs.js");

const monkeDataPath = path.join(__dirname, "..", "..", "data", "monkeList.json");

const {
  background,
  outfit,
  sombrero,
  gif,
  wallpaper,
  banner,
  watchface,
  save,
  argentina,
  australia,
  belgium,
  blacksuit,
  bluesuit,
  brazil,
  canada,
  costarica,
  croatia,
  daovotepin,
  england,
  france,
  germany,
  italy,
  mexico,
  monkestronger,
  netherlands,
  pinksuit,
  portugalsolana,
  santahat,
  serbia,
  southkorea,
  spain,
  usa,
  votepin,
  votepinbrero,
  cape,
  elf,
  ghost,
  halo,
  horns,
  masters,
  portugal,
  pumpkin,
  santa,
  black,
  easter,
  mexicosombrero,
  pink,
  santasombrero,
  solana,
  plain,
  gm,
  gm2,
  gn,
  gn2,
  welcome,
  blackfade,
  blackstack,
  blackwp,
  bluestack,
  greenicons,
  greenmd,
  greenstack,
  whitebluemd,
  whiteicons,
  bluewp,
  greenwp,
  yellow,
  bluebananas,
  bluegreenwave,
  greenbananas,
  greenwave,
  greenwhite,
  whitebananas,
  whitegreen,
  wordmarkblue,
  wordmarkgreen,
  yellowblue,
  blackb,
  blue,
  green,
  white,
  blackstackwf,
  bluebananaswf,
  bluestackwf,
  greenbananaswf,
  greenmdwf,
  greenmonke,
  greenstackwf,
  whitebananaswf,
  whitebluemdwf,
  bluewf,
  bluechristmas,
  greenchristmas,
  redchristmas,
} = require("../../utils/uiComps.js");

const gen3DataPath = path.join(__dirname, "..", "..", "data", "gen3List.json");

let jsonData, gen3JsonData;
try {
  jsonData = JSON.parse(fs.readFileSync(monkeDataPath, "utf-8"));
  console.log(" Gen 2 JSON data loaded successfully");
  gen3JsonData = JSON.parse(fs.readFileSync(gen3DataPath, "utf-8"));
  console.log(" Gen 3 JSON data loaded successfully");
} catch (error) {
  console.error("Error reading monke data:", error);
  process.exit(1);
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

    let imageUri, type, clothes, ears, mouth, eyes, hat, fields, embed;

    if (generation === 2) {
      const inputName = `SMB #${number}`;
      imageUri = findImageUrisByName(jsonData, inputName).toString();
      type = findTraitByName(jsonData, inputName, "Type");
      clothes = findTraitByName(jsonData, inputName, "Clothes");
      ears = findTraitByName(jsonData, inputName, "Ears");
      mouth = findTraitByName(jsonData, inputName, "Mouth");
      eyes = findTraitByName(jsonData, inputName, "Eyes");
      hat = findTraitByName(jsonData, inputName, "Hat");
      console.log(imageUri);

      embed = new EmbedBuilder()
        .setTitle(`Dress Up Your Monke!`)
        .setColor("#0099ff")
        .setDescription(
          `Hello Gen${generation} Monke #${number}! Choose how you want to dress up your Monke`
        )
        .setThumbnail("https://utfs.io/f/fe2b27a4-d815-4801-bd46-748166eecb3b-18ddfq.png")
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
    }

    let species, eyewear, backgroundd;

    if (generation === 3) {
      const inputName = `SMB Gen3 #${number}`;
      imageUri = findGen3ImageUrisByName(gen3JsonData, inputName).toString();
      species = findGen3TraitByName(gen3JsonData, inputName, "Species");
      hat = findGen3TraitByName(gen3JsonData, inputName, "Hat");
      eyewear = findGen3TraitByName(gen3JsonData, inputName, "Eyewear");
      clothes = findGen3TraitByName(gen3JsonData, inputName, "Clothes");
      mouth = findGen3TraitByName(gen3JsonData, inputName, "Mouth");
      backgroundd = findGen3TraitByName(gen3JsonData, inputName, "Background");
      eyes = findGen3TraitByName(gen3JsonData, inputName, "Eyes");
      back = findGen3TraitByName(gen3JsonData, inputName, "Back");
      console.log(imageUri);

      embed = new EmbedBuilder()
        .setTitle(`Dress Up Your Monke!`)
        .setColor("#0099ff")
        .setDescription(
          `Hello ${interaction.user.username}! Choose how you want to dress up your Gen${generation} Monke #${number}`
        )
        .setThumbnail("https://utfs.io/f/fe2b27a4-d815-4801-bd46-748166eecb3b-18ddfq.png")
        .setImage(imageUri)
        .addFields(
          { name: "Species", value: species, inline: true },
          { name: "Hat", value: hat, inline: true },
          { name: "Eyewear", value: eyewear, inline: true },
          { name: "Clothes", value: clothes, inline: true },
          { name: "Mouth", value: mouth, inline: true },
          { name: "Eyes", value: eyes, inline: true },
          { name: "Background", value: backgroundd, inline: true },
          { name: "Back", value: back, inline: true }
        )
        .setFooter({
          text: "If the interaction fails, press the desired button again",
        })
        .setTimestamp();
    }

    const row1 = new ActionRowBuilder().addComponents(background, outfit, sombrero, gif, wallpaper);
    const row2 = new ActionRowBuilder().addComponents(banner, watchface, save);

    if (generation === 2 && number > 5000) {
      return interaction.reply("You can't have a Monke that big!");
    }

    const response = await interaction.reply({
      // Main interaction
      embeds: [embed],
      components: [row1, row2],
      ephemeral: true,
    });

    await wait(2_000);
    let newRow, newRow2, newRow3, newRow4, newRow5, newRow6, newRow7;
    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        // time: 60_000,
      });

      if (confirmation.customId === "background") {
        newRow = new ActionRowBuilder().addComponents(bluechristmas, greenchristmas, redchristmas);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "outfit") {
        newRow = new ActionRowBuilder().addComponents(
          argentina,
          australia,
          belgium,
          blacksuit,
          bluesuit
        );
        newRow2 = new ActionRowBuilder().addComponents(
          brazil,
          canada,
          costarica,
          croatia,
          daovotepin
        );
        newRow3 = new ActionRowBuilder().addComponents(england, france, germany, italy, mexico);
        newRow4 = new ActionRowBuilder().addComponents(
          monkestronger,
          netherlands,
          pinksuit,
          portugalsolana,
          santahat
        );
        newRow5 = new ActionRowBuilder().addComponents(serbia, southkorea, spain, usa, votepin);
        newRow6 = new ActionRowBuilder().addComponents(votepinbrero, cape, elf, ghost, halo);
        newRow7 = new ActionRowBuilder().addComponents(horns, masters, portugal, pumpkin, santa);
        await confirmation.update({
          components: [
            newRow,
            newRow2,
            newRow3,
            newRow4,
            newRow5,
            // newRow6,
            // newRow7,
          ],
        });
      } else if (confirmation.customId === "sombrero") {
        newRow = new ActionRowBuilder().addComponents(
          black,
          easter,
          mexicosombrero,
          pink,
          santasombrero
        );
        newRow2 = new ActionRowBuilder().addComponents(solana, plain);
        await confirmation.update({
          components: [newRow, newRow2],
        });
      } else if (confirmation.customId === "gif") {
        newRow = new ActionRowBuilder().addComponents(gm, gm2, gn, gn2, welcome);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "wallpaper") {
        newRow = new ActionRowBuilder().addComponents(
          blackfade,
          blackstack,
          blackwp,
          bluestack,
          greenicons
        );
        newRow2 = new ActionRowBuilder().addComponents(
          greenmd,
          greenstack,
          whitebluemd,
          whiteicons,
          bluewp
        );
        newRow3 = new ActionRowBuilder().addComponents(greenwp, yellow);
        await confirmation.update({
          components: [newRow, newRow2, newRow3],
        });
      } else if (confirmation.customId === "banner") {
        newRow = new ActionRowBuilder().addComponents(
          bluebananas,
          bluegreenwave,
          greenbananas,
          greenwave,
          greenwhite
        );
        newRow2 = new ActionRowBuilder().addComponents(
          whitebananas,
          whitegreen,
          wordmarkblue,
          wordmarkgreen,
          yellowblue
        );
        newRow3 = new ActionRowBuilder().addComponents(white, blackb, blue, green);
        await confirmation.update({
          components: [newRow, newRow2, newRow3],
        });
      } else if (confirmation.customId === "watchface") {
        newRow = new ActionRowBuilder().addComponents(
          blackstackwf,
          bluebananaswf,
          bluestackwf,
          greenbananaswf,
          greenmdwf
        );
        newRow2 = new ActionRowBuilder().addComponents(
          greenmonke,
          greenstackwf,
          whitebananaswf,
          whitebluemdwf,
          bluewf
        );

        await confirmation.update({
          components: [newRow, newRow2],
        });
      } else if (confirmation.customId === "save") {
        interaction.followUp({
          content: "Here's your Monke!",
          files: [imageUri],
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
