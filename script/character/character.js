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
    // Base race determines the starting attributes.
    // Race can be quite fluid, so it needs to be tracked separately.
    this.baseRace = new Race(base.baseRace);

    // Body
    this.body = new Body(base.body);

    this.equipment = { ...base.equipment };

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

  getDefenses() {
    const defenses = {};
    const attributes = this.getAttributes();
    const defTypes = ["armor", "ward", "resolve"];
    defTypes.forEach((defType) => {
      let base = this.allModifiers[`${defType}V`] || 0;
      let multiplier = this.allModifiers[`${defType}P`] || 1;
      baseAttributes.forEach((attribute) => {
        const attributeModifiers = this.allModifiers[`${attribute}Modifiers`];
        if (attributeModifiers[`${defType}V`]) {
          base += attributeModifiers[`${defType}V`] * attributes[attribute];
        }
        if (attributeModifiers[`${defType}P`]) {
          multiplier += (attributeModifiers[`${defType}P`] * attributes[attribute]) / 100;
        }
      });
      defenses[defType] = Math.floor(base * multiplier);
    });
    return defenses;
  }

  // Weapon damage / Natural weapons damage
  // Does not include modifiers from traits or effects, nor attributes.
  getBaseDamage() {
    let damage = {};
    if (this.equipment.weapon) {
      damage = { ...this.equipment.weapon.damage };
    } else if (this.body.arms.naturalWeapons) {
      this.body.arms.naturalWeapons.forEach((weapon) => {
        Object.entries(weapon.damage).forEach(([type, value]) => {
          if (damage[type]) {
            damage[type] += value;
          } else {
            damage[type] = value;
          }
        });
      });
    }
    return damage;
  }

  // This can become a very heavy function, so it should be called sparingly.
  countRacialScores() {
    const body = { ...this.body };
    const racialScoresCount = {};
    Object.entries(racialScores).forEach(([id, race]) => {
      racialScoresCount[id] = 0;
      Object.entries(race.parts).forEach(([partId, part]) => {
        // Now we need to compare our body to the requirement
        let countScore = true;
        if (body[partId].type !== part.type) {
          countScore = false;
        } else if (part.count) {
          if (body[partId].count < part.count || body[partId].count > part.count) {
            countScore = false;
          }
        }
        if (countScore) {
          racialScoresCount[id] += part.score;
        }
      });
    });
    this.racialScores = racialScoresCount;
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
  baseRace: races.beastman,
  body: { ...racialTemplates.beastman },
  equipment: {
    weapon: new Weapon(items.ironDagger),
    offhand: null,
    head: null,
    shoulders: null,
    body: null,
    arms: null,
    legs: null,
    ring: null,
    feet: null,
  },
});

player.countRacialScores();

const sampleCharacters = [player];
updateScreen();
