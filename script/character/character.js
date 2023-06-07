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
    this.classes = [...base.classes];
    // Race determines the starting attributes.
    this.race = new Race(base.race);

    // Mutations
    // Mutations are a special type of trait that can be gained or lost.
    this.mutations = [...base.mutations];

    this.equipment = { ...base.equipment };

    // Stores all modifiers, including those from traits and effects.
    this.allModifiers = {};

    this.updateClasses();
    this.updateAllModifiers();
    this.restoreStats();
  }

  updateAllModifiers() {
    this.allModifiers = getAllModifiers(this);
  }

  updateClasses() {
    this.classes.forEach((classrole, index) => {
      this.classes[index] = new Classrole(classrole);
    });
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

  getAttributes(options = {}) {
    const attributes = { ...this.attributes };
    const allModifiers = options?.modifiers || this.allModifiers;
    Object.keys(attributes).forEach((attribute) => {
      const bonus = allModifiers[`${attribute}V`] || 0;
      const multiplier = allModifiers[`${attribute}P`] || 1;
      attributes[attribute] = Math.floor((attributes[attribute] + bonus) * multiplier);
    });
    return attributes;
  }

  getMutationsLimit() {
    return 3 + this.allModifiers.mutationsLimitV || 0;
  }

  getMutationsBasePoints() {
    return 2 + this.allModifiers.mutationPointsV || 0;
  }

  getMaxStats() {
    const stats = Object.keys(this.stats);
    const maxStats = {};
    stats.forEach((stat) => {
      let base = this.allModifiers[`${stat}MaxV`] || 0;
      let modifier = this.allModifiers[`${stat}MaxP`] || 1;
      maxStats[stat] = Math.floor(base * modifier);
    });
    return maxStats;
  }

  getDefenses() {
    const defenses = {};
    const defTypes = ["armor", "ward", "resolve"];
    defTypes.forEach((defType) => {
      let base = this.allModifiers[`${defType}V`] || 0;
      let multiplier = this.allModifiers[`${defType}P`] || 1;
      defenses[defType] = Math.floor(base * multiplier);
    });
    return defenses;
  }

  getResistances() {
    const resistances = {};
    Object.entries(damageTypes).forEach(([type, damageType]) => {
      resistances[type] = {};
      damageType.subTypes.forEach((subType) => {
        let base = this.allModifiers[`${subType}ResistanceV`] || 0;
        let multiplier = this.allModifiers[`${subType}ResistanceP`] || 1;
        resistances[type][subType] = Math.floor(base * multiplier);
      });
    });
    return resistances;
  }

  // Also includes resilience, not just evasion.
  getEvasion() {
    const dodge = {};
    Object.values(damageTypes).forEach((damageType) => {
      damageType.dodge.forEach((dodgeType) => {
        let base = this.allModifiers[`${dodgeType}V`] || 0;
        let multiplier = this.allModifiers[`${dodgeType}P`] || 1;
        dodge[dodgeType] = Math.floor(base * multiplier);
      });
    });
    return dodge;
  }

  getAccuracy() {
    let base = this.allModifiers.accuracyV || 0;
    let multiplier = this.allModifiers.accuracyP || 1;
    return Math.floor(base * multiplier);
  }

  getCrit() {
    const crit = { chance: 0, power: 0 };
    crit.chance = this.allModifiers.critChanceV || 0;
    crit.power = this.allModifiers.critPowerV || 0;
    return crit;
  }

  getPenetration() {
    const penetration = {};
    Object.values(damageTypes).forEach((damageType) => {
      const penetrationType = damageType.penetration;
      let base = this.allModifiers[`${penetrationType}V`] || 0;
      let multiplier = this.allModifiers[`${penetrationType}P`] || 1;
      penetration[penetrationType] = Math.floor(base * multiplier);
    });
    return penetration;
  }

  getPower() {
    const power = {};
    Object.keys(damageTypes).forEach((damageType) => {
      const base = this.allModifiers[`${damageType}PowerV`] || 0;
      const multiplier = this.allModifiers[`${damageType}PowerP`] || 1;
      power[damageType] = Math.floor(base * multiplier);
    });
    return power;
  }

  // Weapon damage / Natural weapons damage
  // Does not include modifiers from traits or effects, nor attributes.
  getBaseDamage() {
    let damage = {};
    if (this.equipment.weapon) {
      damage = { ...this.equipment.weapon.damage };
    } else {
      if (this.allModifiers.naturalWeaponsDamage) {
        damage = { ...this.allModifiers.naturalWeaponsDamage };
      } else {
        const baseFistDamage = 10 + (this.allModifiers.fistDamageV || 0);
        damage.bludgeoning = Math.floor(baseFistDamage * (1 + (this.allModifiers.fistDamageP || 0)));
      }
    }
    return damage;
  }
}
