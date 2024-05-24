const { heliusTk } = require("../config.json");
const url = `https://mainnet.helius-rpc.com/?api-key=${heliusTk}`;
const fs = require("fs");
const path = require("path");

const getAssetsByGroup = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAssetsByGroup",
      params: {
        groupKey: "collection",
        groupValue: "8Rt3Ayqth4DAiPnW9MDFi63TiQJHmohfTWLMQFHi4KZH",
        // page: 1,
        // limit: 1000,
      },
    }),
  });
  const { result } = await response.json();

  fs.writeFileSync(
    "../data/gen3List.json",
    JSON.stringify(result, null, 2),
    "utf-8"
  );
};

setInterval(() => {
  getAssetsByGroup();
}, 1 * 1000); // This is currently set to run every second for testing, need to set it to required time limit for production
