const { Client, Intents, IntentsBitField } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
const token = require("./config.json");
const heliusTk = require("./config.json");

const myIntents = new IntentsBitField();
myIntents.add(Intents.FLAGS.GUILDS);
myIntents.add(Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });

let g3list = [];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  updateGen3();
  setInterval(updateGen3, 10 * 60 * 1000);
});

async function updateGen3() {
  await client.readyAt;
  const link = `https://rpc.helius.xyz/?api-key=${heliusTk}`;
  const gen3List = [];
  let page = 1;

  while (true) {
    const payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "getAssetsByGroup",
      params: {
        groupKey: "collection",
        groupValue: "8Rt3Ayqth4DAiPnW9MDFi63TiQJHmohfTWLMQFHi4KZH",
        page: page,
        limit: 1000,
      },
    };

    try {
      const result = await axios.post(link, payload);
      const json = result.data;

      for (const item of json.result.items) {
        try {
          const neededData = {
            name: item.content.metadata.name,
            imageUri: item.content.files[0].uri,
            attributes: item.content.metadata.attributes,
            onchainId: item.id,
          };
          gen3List.append(neededData);
        } catch (error) {
          console.error("Error processing item:", error);
        }
      }

      if (json.result.total < json.result.limit) {
        break;
      }
      page += 1;
    } catch (error) {
      console.error("Error fetching data:", error);
      break;
    }
  }

  g3list = gen3List;
}

export async function fetchGen3List() {
  return g3list;
}

client.login(token);
