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
// All starter races have 5 attribute points to distribute.
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
    },
  },
  // Starter race
  // Strong and tough, suited for melee classes.
  orc: {
    id: "orc",
    name: "Orc",
    modifiers: {
      strengthV: 2,
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
      agilityV: 2,
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
      intelligenceV: 2,
      willpowerV: 2,
      agilityV: 1,
    },
  },
};

const racialScores = {
  human: {
    scoreRequired: 10,
    parts: {
      eyes: { type: "human", score: 1 },
      ears: { type: "human", score: 1 },
      nose: { type: "human", score: 1 },
      mouth: { type: "human", score: 1 },
      hair: { type: "human", score: 1 },
      face: { type: "human", score: 1 },
      skin: { type: "human", score: 1 },
      horns: { type: "none", score: 1 },
      wings: { type: "none", score: 1 },
      tail: { type: "none", score: 1 },
      arms: { type: "human", score: 1 },
      legs: { type: "human", score: 1 },
      feet: { type: "human", score: 1 },
    },
  },
  orc: {
    scoreRequired: 14,
    parts: {
      eyes: { type: "orc", score: 1 },
      ears: { type: "elven", score: 1 },
      nose: { type: "human", score: 1 },
      mouth: { type: "orc", score: 2 },
      hair: { type: "human", score: 1 },
      face: { type: "human", score: 1 },
      skin: { type: "orc", score: 2 },
      horns: { type: "none", score: 1 },
      wings: { type: "none", score: 1 },
      tail: { type: "none", score: 1 },
      arms: { type: "human", score: 1 },
      legs: { type: "human", score: 1 },
      feet: { type: "human", score: 1 },
    },
  },
  beastman: {
    scoreRequired: 14,
    parts: {
      eyes: { type: "feline", score: 2 },
      ears: { type: "feline", score: 2 },
      nose: { type: "feline", score: 1 },
      mouth: { type: "feline", score: 1 },
      hair: { type: "human", score: 1 },
      face: { type: "feline", score: 1 },
      skin: { type: "fur", score: 2 },
      horns: { type: "none", score: 1 },
      wings: { type: "none", score: 1 },
      tail: { type: "feline", score: 1 },
      arms: { type: "feline", score: 2 },
      legs: { type: "feline", score: 2 },
      feet: { type: "feline", score: 2 },
    },
  },
  elf: {
    scoreRequired: 14,
    parts: {
      eyes: { type: "elven", score: 1 },
      ears: { type: "elven", score: 2 },
      nose: { type: "human", score: 1 },
      mouth: { type: "human", score: 1 },
      hair: { type: "human", score: 1 },
      face: { type: "human", score: 1 },
      skin: { type: "human", score: 1 },
      horns: { type: "none", score: 1 },
      wings: { type: "none", score: 1 },
      tail: { type: "none", score: 1 },
      arms: { type: "elven", score: 2 },
      legs: { type: "elven", score: 2 },
      feet: { type: "elven", score: 2 },
    },
  },
};
