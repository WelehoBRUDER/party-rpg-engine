// The idea for mutations was totally inspired by Caves of Qud.
class Mutation {
  constructor(base) {
    this.id = base.id;
    const mutation = { ...mutations[this.id] };
    if (!mutation) {
      throw new Error(`Mutation ${this.id} does not exist.`);
    }
    this.forRace = mutation.forRace || null;
    this.mutuallyExclusive = mutation.mutuallyExclusive || [];
    this.cost = mutation.cost; // Can be negative.
    this.modifiers = { ...mutation.modifiers };
  }
}
// forRace limits the mutation to the specified race.
const mutations = {
  // Strength mutations
  muscularHypertrophy: {
    id: "muscularHypertrophy",
    cost: 1,
    modifiers: {
      strengthV: 1,
    },
  },
  muscularAtrophy: {
    id: "muscularAtrophy",
    cost: -1,
    modifiers: {
      strengthV: -1,
    },
  },
  thickSkin: {
    id: "thickSkin",
    cost: 1,
    modifiers: {
      armorV: 10,
    },
  },
  steelBones: {
    id: "steelBones",
    mutuallyExclusive: ["brittleBones"],
    cost: 2,
    modifiers: {
      armorV: 30,
      agilityV: -1,
    },
  },
  brittleBones: {
    id: "brittleBones",
    mutuallyExclusive: ["steelBones"],
    cost: -1,
    modifiers: {
      armorV: -10,
    },
  },
  flexible: {
    id: "flexible",
    cost: 1,
    modifiers: {
      agilityV: 1,
    },
  },
  sharpClaws: {
    id: "sharpClaws",
    forRace: "beastman",
    const: 2,
    modifiers: {
      naturalWeaponsDamage: {
        piercing: 25,
      },
    },
  },
};
