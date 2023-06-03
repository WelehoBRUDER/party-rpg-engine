// Creates sidebar elements
function updateScreen() {
  leftCharacters.innerHTML = "";
  // For now just create elements for each character
  sampleCharacters.forEach((character) => {
    const characterElement = createCharacterElement(character);
    if (!characterElement) throw new Error("Character element not created");
    leftCharacters.appendChild(characterElement);
  });
}

function createCharacterElement(character) {
  const characterElement = document.createElement("div");
  characterElement.classList.add("character");
  const characterName = document.createElement("p");
  characterName.classList.add("character-name");
  characterName.textContent = character.name;
  characterElement.appendChild(characterName);

  // Stat bars
  const statBars = document.createElement("div");
  statBars.classList.add("stat-bars");
  const bars = ["hp", "mp", "ep"];
  bars.forEach((type) => {
    const barElement = document.createElement("div");
    const barFill = document.createElement("div");
    const barNumber = document.createElement("p");
    barElement.classList = `${type} bar`;
    barNumber.classList.add("bar-number");
    barFill.classList = `${type} bar-fill`;
    barNumber.textContent = `${character.stats[type]} / ${character.stats[type + "Max"]} ${type}`;
    barFill.style.width = `${(character.stats[type] / character.stats[type + "Max"]) * 100}%`;
    barElement.append(barNumber, barFill);
    statBars.appendChild(barElement);
  });
  characterElement.appendChild(statBars);
  return characterElement;
}

const sampleCharacters = [
  {
    name: "Arthur Lockwood",
    stats: {
      hp: 100,
      mp: 100,
      ep: 100,
      hpMax: 100,
      mpMax: 100,
      epMax: 100,
    },
    level: 1,
    xp: 0,
  },
  {
    name: "Bandur Ironfist",
    stats: {
      hp: 100,
      mp: 100,
      ep: 100,
      hpMax: 100,
      mpMax: 100,
      epMax: 100,
    },
    level: 1,
    xp: 0,
  },
];

updateScreen();