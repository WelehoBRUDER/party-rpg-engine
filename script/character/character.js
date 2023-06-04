class Character {
  constructor(base) {
    this.id = base.id;
    this.name = base.name || "Unnamed";
    this.attributes = { ...base.attributes };
    this.stats = { ...base.stats };
    this.traits = [...base.traits];

    // These are temporary effects, unlike traits.
    this.combatEffects = [];
    this.passiveEffects = [];

    this.skills = [...base.skills];

    // Stores all modifiers, including those from traits and effects.
    this.allModifiers = {};

    this.updateAllModifiers();
    this.restoreStats();
  }

  updateAllModifiers() {
    this.allModifiers = getAllModifiers(this);
  }

  updateSkillModifiers() {
    this.skills.forEach((skill) => {
      skill.updateStats(this);
    });
  }

  restoreStats() {
    const maxStats = this.getMaxStats();
    Object.keys(this.stats).forEach((stat) => {
      this.stats[stat] = maxStats[stat];
    });
  }

  getAttributes() {
    const attributes = { ...this.attributes };
    Object.keys(attributes).forEach((attribute) => {
      const bonus = this.allModifiers[`${attribute}V`] || 0;
      const multiplier = this.allModifiers[`${attribute}P`] || 1;
      attributes[attribute] = Math.floor((attributes[attribute] + bonus) * multiplier);
    });
    return attributes;
  }

  getMaxStats() {
    const stats = Object.keys(this.stats);
    const currentAttributes = this.getAttributes();
    const maxStats = {};
    stats.forEach((stat) => {
      let base = this.allModifiers[`${stat}MaxV`] || 0;
      let modifier = this.allModifiers[`${stat}MaxP`] || 1;
      baseAttributes.forEach((attribute) => {
        const attributeModifiers = this.allModifiers[`${attribute}Modifiers`];
        if (attributeModifiers[`${stat}MaxV`]) {
          base += attributeModifiers[`${stat}MaxV`] * currentAttributes[attribute];
        }
        if (attributeModifiers[`${stat}MaxP`]) {
          modifier += (attributeModifiers[`${stat}MaxP`] * currentAttributes[attribute]) / 100;
        }
      });
      maxStats[stat] = Math.floor(base * modifier);
    });
    return maxStats;
  }
}

const player = new Character({
  id: "player",
  name: "Player",
  attributes: {
    strength: 0,
    agility: 0,
    vitality: 0,
    intelligence: 0,
    willpower: 0,
  },
  stats: {
    hp: 0,
    ep: 0,
    mp: 0,
  },
  traits: [traits.humanoidConstitution],
  skills: [new Skill(skills.attack)],
});

const sampleCharacters = [player];
updateScreen();
