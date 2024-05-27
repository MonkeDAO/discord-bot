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

function findImageUrisByName(data, name) {
  return data
    .filter((entry) => entry.mint.name === name)
    .map((entry) => entry.mint.imageUri);
}

function findGen3ImageUrisByName(data, name) {
  return data
    .filter((entry) => entry.content.metadata.name === name)
    .map((entry) => entry.content.links.image);
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

function findGen3TraitByName(data, name, traitt) {
  const entry = data.find((entry) => entry.content.metadata.name === name);
  if (entry) {
    const trait = entry.content.metadata.attributes.find(
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
        .setThumbnail(
          "https://utfs.io/f/fe2b27a4-d815-4801-bd46-748166eecb3b-18ddfq.png"
        )
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
        const bluechristmas = new ButtonBuilder()
          .setCustomId("bluechristmasbg")
          .setLabel("Blue Christmas")
          .setStyle(ButtonStyle.Primary);
        const greenchristmas = new ButtonBuilder()
          .setCustomId("greenchristmasbg")
          .setLabel("Green Christmas")
          .setStyle(ButtonStyle.Primary);
        const redchristmas = new ButtonBuilder()
          .setCustomId("redchristmasbg")
          .setLabel("Red Christmas")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(
          bluechristmas,
          greenchristmas,
          redchristmas
        );
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "outfit") {
        const argentina = new ButtonBuilder()
          .setCustomId("argentinaoutf")
          .setLabel("Argentina")
          .setStyle(ButtonStyle.Primary);
        const australia = new ButtonBuilder()
          .setCustomId("australiaoutf")
          .setLabel("Australia")
          .setStyle(ButtonStyle.Primary);
        const belgium = new ButtonBuilder()
          .setCustomId("belgiaoutf")
          .setLabel("Belgium")
          .setStyle(ButtonStyle.Primary);
        const blacksuit = new ButtonBuilder()
          .setCustomId("blacksuitoutf")
          .setLabel("Black Suit")
          .setStyle(ButtonStyle.Primary);
        const bluesuit = new ButtonBuilder()
          .setCustomId("bluesuitoutf")
          .setLabel("Blue Suit")
          .setStyle(ButtonStyle.Primary);
        const brazil = new ButtonBuilder()
          .setCustomId("braziloutf")
          .setLabel("Brazil")
          .setStyle(ButtonStyle.Primary);
        const canada = new ButtonBuilder()
          .setCustomId("canadaoutf")
          .setLabel("Canada")
          .setStyle(ButtonStyle.Primary);
        const costarica = new ButtonBuilder()
          .setCustomId("costaricaoutf")
          .setLabel("Costa Rica")
          .setStyle(ButtonStyle.Primary);
        const croatia = new ButtonBuilder()
          .setCustomId("croatiaoutf")
          .setLabel("Croatia")
          .setStyle(ButtonStyle.Primary);
        const daovotepin = new ButtonBuilder()
          .setCustomId("daovotepinoutf")
          .setLabel("Dao Vote Pin")
          .setStyle(ButtonStyle.Primary);
        const england = new ButtonBuilder()
          .setCustomId("englandoutf")
          .setLabel("England")
          .setStyle(ButtonStyle.Primary);
        const france = new ButtonBuilder()
          .setCustomId("franceoutf")
          .setLabel("France")
          .setStyle(ButtonStyle.Primary);
        const germany = new ButtonBuilder()
          .setCustomId("germanyoutf")
          .setLabel("Germany")
          .setStyle(ButtonStyle.Primary);
        const italy = new ButtonBuilder()
          .setCustomId("italyoutf")
          .setLabel("Italy")
          .setStyle(ButtonStyle.Primary);
        const mexico = new ButtonBuilder()
          .setCustomId("mexicooutf")
          .setLabel("Mexico")
          .setStyle(ButtonStyle.Primary);
        const monkestronger = new ButtonBuilder()
          .setCustomId("monkestrongeroutf")
          .setLabel("Monkes Stronger Together")
          .setStyle(ButtonStyle.Primary);
        const netherlands = new ButtonBuilder()
          .setCustomId("netherlandsoutf")
          .setLabel("Netherlands")
          .setStyle(ButtonStyle.Primary);
        const pinksuit = new ButtonBuilder()
          .setCustomId("pinksuitoutf")
          .setLabel("Pink Suit")
          .setStyle(ButtonStyle.Primary);
        const portugalsolana = new ButtonBuilder()
          .setCustomId("portugalsolanaoutf")
          .setLabel("Portugal Solana")
          .setStyle(ButtonStyle.Primary);
        const santahat = new ButtonBuilder()
          .setCustomId("santahatoutf")
          .setLabel("Santa Hat")
          .setStyle(ButtonStyle.Primary);
        const serbia = new ButtonBuilder()
          .setCustomId("serbiaoutf")
          .setLabel("Serbia")
          .setStyle(ButtonStyle.Primary);
        const southkorea = new ButtonBuilder()
          .setCustomId("southkoreaoutf")
          .setLabel("South Korea")
          .setStyle(ButtonStyle.Primary);
        const spain = new ButtonBuilder()
          .setCustomId("spainoutf")
          .setLabel("Spain")
          .setStyle(ButtonStyle.Primary);
        const usa = new ButtonBuilder()
          .setCustomId("usaoutf")
          .setLabel("USA")
          .setStyle(ButtonStyle.Primary);
        const votepin = new ButtonBuilder()
          .setCustomId("votepinoutf")
          .setLabel("Vote Pin")
          .setStyle(ButtonStyle.Primary);
        const votepinbrero = new ButtonBuilder()
          .setCustomId("votepinbrerooutf")
          .setLabel("Vote Pinbrero")
          .setStyle(ButtonStyle.Primary);
        const cape = new ButtonBuilder()
          .setCustomId("capeoutf")
          .setLabel("Cape")
          .setStyle(ButtonStyle.Primary);
        const elf = new ButtonBuilder()
          .setCustomId("elfoutf")
          .setLabel("Elf")
          .setStyle(ButtonStyle.Primary);
        const ghost = new ButtonBuilder()
          .setCustomId("ghostoutf")
          .setLabel("Ghost")
          .setStyle(ButtonStyle.Primary);
        const halo = new ButtonBuilder()
          .setCustomId("halooutf")
          .setLabel("Halo")
          .setStyle(ButtonStyle.Primary);
        const horns = new ButtonBuilder()
          .setCustomId("hornsoutf")
          .setLabel("Horns")
          .setStyle(ButtonStyle.Primary);
        const masters = new ButtonBuilder()
          .setCustomId("mastersoutf")
          .setLabel("Masters")
          .setStyle(ButtonStyle.Primary);
        const portugal = new ButtonBuilder()
          .setCustomId("portugaloutf")
          .setLabel("Portugal")
          .setStyle(ButtonStyle.Primary);
        const pumpkin = new ButtonBuilder()
          .setCustomId("pumpkinoutf")
          .setLabel("Pumpkin")
          .setStyle(ButtonStyle.Primary);
        const santa = new ButtonBuilder()
          .setCustomId("santaoutf")
          .setLabel("Santa")
          .setStyle(ButtonStyle.Primary);
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
        newRow3 = new ActionRowBuilder().addComponents(
          england,
          france,
          germany,
          italy,
          mexico
        );
        newRow4 = new ActionRowBuilder().addComponents(
          monkestronger,
          netherlands,
          pinksuit,
          portugalsolana,
          santahat
        );
        newRow5 = new ActionRowBuilder().addComponents(
          serbia,
          southkorea,
          spain,
          usa,
          votepin
        );
        newRow6 = new ActionRowBuilder().addComponents(
          votepinbrero,
          cape,
          elf,
          ghost,
          halo
        );
        newRow7 = new ActionRowBuilder().addComponents(
          horns,
          masters,
          portugal,
          pumpkin,
          santa
        );
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
        const black = new ButtonBuilder()
          .setCustomId("blacksombrero")
          .setLabel("Black Sombrero")
          .setStyle(ButtonStyle.Primary);
        const easter = new ButtonBuilder()
          .setCustomId("eastersombrero")
          .setLabel("Easter Sombrero")
          .setStyle(ButtonStyle.Primary);
        const mexico = new ButtonBuilder()
          .setCustomId("mexicosombrero")
          .setLabel("Easter Sombrero")
          .setStyle(ButtonStyle.Primary);
        const pink = new ButtonBuilder()
          .setCustomId("pinksombrero")
          .setLabel("Pink Sombrero")
          .setStyle(ButtonStyle.Primary);
        const santa = new ButtonBuilder()
          .setCustomId("santasombrero")
          .setLabel("Santa Sombrero")
          .setStyle(ButtonStyle.Primary);
        const solana = new ButtonBuilder()
          .setCustomId("solanasombrero")
          .setLabel("Solana Sombrero")
          .setStyle(ButtonStyle.Primary);
        const plain = new ButtonBuilder()
          .setCustomId("plainsombrero")
          .setLabel("Sombrero")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(
          black,
          easter,
          mexico,
          pink,
          santa
        );
        newRow2 = new ActionRowBuilder().addComponents(solana, plain);
        await confirmation.update({
          components: [newRow, newRow2],
        });
      } else if (confirmation.customId === "gif") {
        const gm = new ButtonBuilder()
          .setCustomId("gmgif")
          .setLabel("GM")
          .setStyle(ButtonStyle.Primary);
        const gm2 = new ButtonBuilder()
          .setCustomId("gm2gif")
          .setLabel("GM 2")
          .setStyle(ButtonStyle.Primary);
        const gn = new ButtonBuilder()
          .setCustomId("gngif")
          .setLabel("GN")
          .setStyle(ButtonStyle.Primary);
        const gn2 = new ButtonBuilder()
          .setCustomId("gn2gif")
          .setLabel("GN 2")
          .setStyle(ButtonStyle.Primary);
        const welcome = new ButtonBuilder()
          .setCustomId("welcomegif")
          .setLabel("Welcome")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(outfit, nobg);
        await confirmation.update({
          components: [newRow],
        });
      } else if (confirmation.customId === "wallpaper") {
        const blackfade = new ButtonBuilder()
          .setCustomId("blackfadewp")
          .setLabel("Black Fade")
          .setStyle(ButtonStyle.Primary);
        const blackstack = new ButtonBuilder()
          .setCustomId("blackstackwp")
          .setLabel("Black Stack")
          .setStyle(ButtonStyle.Primary);
        const black = new ButtonBuilder()
          .setCustomId("blackwp")
          .setLabel("Black")
          .setStyle(ButtonStyle.Primary);
        const bluestack = new ButtonBuilder()
          .setCustomId("blackwp")
          .setLabel("Black")
          .setStyle(ButtonStyle.Primary);
        const greenicons = new ButtonBuilder()
          .setCustomId("greeniconswp")
          .setLabel("Black")
          .setStyle(ButtonStyle.Primary);
        const greenmd = new ButtonBuilder()
          .setCustomId("greenmdwp")
          .setLabel("Green MD")
          .setStyle(ButtonStyle.Primary);
        const greenstack = new ButtonBuilder()
          .setCustomId("greenstackwp")
          .setLabel("Green Stack")
          .setStyle(ButtonStyle.Primary);
        const whitebluemd = new ButtonBuilder()
          .setCustomId("whitebluemdwp")
          .setLabel("White Blue MD")
          .setStyle(ButtonStyle.Primary);
        const whiteicons = new ButtonBuilder()
          .setCustomId("whiteiconswp")
          .setLabel("White Icons")
          .setStyle(ButtonStyle.Primary);
        const blue = new ButtonBuilder()
          .setCustomId("bluewp")
          .setLabel("Blue")
          .setStyle(ButtonStyle.Primary);
        const green = new ButtonBuilder()
          .setCustomId("greenwp")
          .setLabel("Green")
          .setStyle(ButtonStyle.Primary);
        const yellow = new ButtonBuilder()
          .setCustomId("yellowwp")
          .setLabel("Yellow")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(
          blackfade,
          blackstack,
          black,
          bluestack,
          greenicons
        );
        newRow2 = new ActionRowBuilder().addComponents(
          greenmd,
          greenstack,
          whitebluemd,
          whiteicons,
          blue
        );
        newRow3 = new ActionRowBuilder().addComponents(green, yellow);
        await confirmation.update({
          components: [newRow, newRow2, newRow3],
        });
      } else if (confirmation.customId === "banner") {
        const bluebananas = new ButtonBuilder()
          .setCustomId("bluebananasb")
          .setLabel("Blue Bananas")
          .setStyle(ButtonStyle.Primary);
        const bluegreenwave = new ButtonBuilder()
          .setCustomId("bluegreenwaveb")
          .setLabel("Blue Green Wave")
          .setStyle(ButtonStyle.Primary);
        const greenbananas = new ButtonBuilder()
          .setCustomId("greenbananasb")
          .setLabel("Green Bananas")
          .setStyle(ButtonStyle.Primary);
        const greenwave = new ButtonBuilder()
          .setCustomId("greenwaveb")
          .setLabel("Green Wave")
          .setStyle(ButtonStyle.Primary);
        const greenwhite = new ButtonBuilder()
          .setCustomId("greenwhiteb")
          .setLabel("Green White")
          .setStyle(ButtonStyle.Primary);
        const whitebananas = new ButtonBuilder()
          .setCustomId("whitebananasb")
          .setLabel("White Bananas")
          .setStyle(ButtonStyle.Primary);
        const whitegreen = new ButtonBuilder()
          .setCustomId("whitegreenb")
          .setLabel("White Green")
          .setStyle(ButtonStyle.Primary);
        const wordmarkblue = new ButtonBuilder()
          .setCustomId("wordmarkblueb")
          .setLabel("Wordmark Blue")
          .setStyle(ButtonStyle.Primary);
        const wordmarkgreen = new ButtonBuilder()
          .setCustomId("wordmarkgreenb")
          .setLabel("Wordmark Green")
          .setStyle(ButtonStyle.Primary);
        const yellowblue = new ButtonBuilder()
          .setCustomId("yellowblueb")
          .setLabel("Yellow Blue")
          .setStyle(ButtonStyle.Primary);
        const black = new ButtonBuilder()
          .setCustomId("blackb")
          .setLabel("Black")
          .setStyle(ButtonStyle.Primary);
        const blue = new ButtonBuilder()
          .setCustomId("blueb")
          .setLabel("Blue")
          .setStyle(ButtonStyle.Primary);
        const green = new ButtonBuilder()
          .setCustomId("greenb")
          .setLabel("Green")
          .setStyle(ButtonStyle.Primary);
        const white = new ButtonBuilder()
          .setCustomId("whiteb")
          .setLabel("White")
          .setStyle(ButtonStyle.Primary);
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
        newRow3 = new ActionRowBuilder().addComponents(
          white,
          black,
          blue,
          green
        );
        await confirmation.update({
          components: [newRow, newRow2, newRow3],
        });
      } else if (confirmation.customId === "watchface") {
        const blackstack = new ButtonBuilder()
          .setCustomId("blackstackwf")
          .setLabel("Black Stack")
          .setStyle(ButtonStyle.Primary);
        const bluebananas = new ButtonBuilder()
          .setCustomId("bluebananaswf")
          .setLabel("Blue Bananas")
          .setStyle(ButtonStyle.Primary);
        const bluestack = new ButtonBuilder()
          .setCustomId("bluestackwf")
          .setLabel("Blue Stack")
          .setStyle(ButtonStyle.Primary);
        const greenbananas = new ButtonBuilder()
          .setCustomId("greenbananaswf")
          .setLabel("Green Bananas")
          .setStyle(ButtonStyle.Primary);
        const greenmd = new ButtonBuilder()
          .setCustomId("greenmdwf")
          .setLabel("Green MD")
          .setStyle(ButtonStyle.Primary);
        const greenmonke = new ButtonBuilder()
          .setCustomId("greenmonkewf")
          .setLabel("Green Monke")
          .setStyle(ButtonStyle.Primary);
        const greenstack = new ButtonBuilder()
          .setCustomId("greenstackwf")
          .setLabel("Blue Bananas")
          .setStyle(ButtonStyle.Primary);
        const whitebananas = new ButtonBuilder()
          .setCustomId("whitebananaswf")
          .setLabel("Blue Bananas")
          .setStyle(ButtonStyle.Primary);
        const whitebluemd = new ButtonBuilder()
          .setCustomId("whitebluemdwf")
          .setLabel("Blue Bananas")
          .setStyle(ButtonStyle.Primary);
        const blue = new ButtonBuilder()
          .setCustomId("bluewf")
          .setLabel("Blue Bananas")
          .setStyle(ButtonStyle.Primary);
        newRow = new ActionRowBuilder().addComponents(
          blackstack,
          bluebananas,
          bluestack,
          greenbananas,
          greenmd
        );
        newRow2 = new ActionRowBuilder().addComponents(
          greenmonke,
          greenstack,
          whitebananas,
          whitebluemd,
          blue
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
