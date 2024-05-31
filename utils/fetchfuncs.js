const fs = require("fs");
const path = require("path");
const gen3DataPath = path.join(__dirname, "..", "data", "gen3List.json");
const monkeDataPath = path.join(__dirname, "..", "data", "monkeList.json");

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
  findImageUrisByName,
  findGen3ImageUrisByName,
  findTraitByName,
  findGen3TraitByName,
  jsonData: jsonData,
  gen3JsonData: gen3JsonData,
};
