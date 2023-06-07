class Race {
  constructor(race) {
    this.id = race.id;
    const base = races[this.id];
    if (!base) {
      throw new Error(`Race ${this.id} does not exist.`);
    }
    this.name = base.name;
    this.modifiers = { ...base.modifiers };
  }
}

// These are just the main archetypes, not the subraces or chimeras.
// All starter races have 6 attribute points to distribute.
const races = {
  // Starter race
  // Fairly well balanced, suited for most classes.
  human: {
    id: "human",
    name: "Human",
    modifiers: {
      strengthV: 1,
      agilityV: 1,
      vitalityV: 1,
      intelligenceV: 1,
      willpowerV: 1,
      charismaV: 1,
    },
  },
  // Starter race
  // Strong and tough, suited for melee classes.
  orc: {
    id: "orc",
    name: "Orc",
    modifiers: {
      strengthV: 3,
      vitalityV: 2,
      agilityV: 1,
    },
  },
  // Starter race
  // Fast and agile, suited for ranged classes.
  beastman: {
    id: "beastman",
    name: "Beastman",
    modifiers: {
      agilityV: 3,
      willpowerV: 2,
      vitalityV: 1,
    },
  },
  // Starter race
  // Intelligent and wise, suited for magic classes.
  elf: {
    id: "elf",
    name: "Elf",
    modifiers: {
      intelligenceV: 3,
      willpowerV: 2,
      agilityV: 1,
    },
  },
  // Initially very weak, but can become very powerful.
  goblin: {
    id: "goblin",
    name: "Goblin",
    modifiers: {
      strengthV: -1,
      vitalityV: -1,
      agilityV: 2,
      intelligenceV: 2,
      critChanceV: 15,
    },
  },
};
