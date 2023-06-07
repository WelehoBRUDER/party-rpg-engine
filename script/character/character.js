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
      this.stats[stat] = Math.floor(maxStats[stat] * Math.random());
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

  getMutationsLimit() {
    return 3 + this.allModifiers.mutationsLimitV || 0;
  }

  getMutationsBasePoints() {
    return 2 + this.allModifiers.mutationPointsV || 0;
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

  getEffectsFromAttributes(key) {
    const attributes = this.getAttributes();
    let base = 0;
    let multiplier = 0;
    baseAttributes.forEach((attribute) => {
      const attributeModifiers = this.allModifiers[`${attribute}Modifiers`];
      if (attributeModifiers[`${key}V`]) {
        base += attributeModifiers[`${key}V`] * attributes[attribute];
      }
      if (attributeModifiers[`${key}P`]) {
        multiplier += (attributeModifiers[`${key}P`] * attributes[attribute]) / 100;
      }
    });
    return { baseVal: base, multiplierVal: multiplier };
  }

  getDefenses() {
    const defenses = {};
    const defTypes = ["armor", "ward", "resolve"];
    defTypes.forEach((defType) => {
      let base = this.allModifiers[`${defType}V`] || 0;
      let multiplier = this.allModifiers[`${defType}P`] || 1;
      const attributeEffects = this.getEffectsFromAttributes(defType);
      base += attributeEffects.baseVal;
      multiplier += attributeEffects.multiplierVal;
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
        const attributeEffects = this.getEffectsFromAttributes(subType + "Resistance");
        base += attributeEffects.baseVal;
        multiplier += attributeEffects.multiplierVal;
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
        const attributeEffects = this.getEffectsFromAttributes(dodgeType);
        base += attributeEffects.baseVal;
        multiplier += attributeEffects.multiplierVal;
        dodge[dodgeType] = Math.floor(base * multiplier);
      });
    });
    return dodge;
  }

  getAccuracy() {
    let base = this.allModifiers.accuracyV || 0;
    let multiplier = this.allModifiers.accuracyP || 1;
    const attributeEffects = this.getEffectsFromAttributes("accuracy");
    base += attributeEffects.baseVal;
    multiplier += attributeEffects.multiplierVal;
    return Math.floor(base * multiplier);
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
}
