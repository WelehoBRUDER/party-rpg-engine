class Skill {
  constructor(skill) {
    this.id = skill.id;
    this.type = skill.type;
    this.attackDamages = skill.attackDamages ? [...skill.attackDamages] : [];
    this.attackType = skill.attackType ?? "weapon";
    this.cooldown = skill.cooldown ?? 0;
    this.onCooldown = skill.onCooldown ?? 0;
    this.modifiers = { ...skill.modifiers };
  }

  updateStats(owner) {
    let id = this.id;
    const skillBase = { ...skills[id] };
    id = "skill_" + id;
    Object.entries(this).forEach(([key, value]) => {
      if (typeof value !== "number" || typeof value === "object") return;
      if (typeof value === "number") {
        if (key === "onCooldown") return;
        let bonus = owner.allModifiers[id]?.[key + "V"] ?? 0;
        let modifier = 1 + (owner.allModifiers[id]?.[key + "P"] / 100 || 0);
        const base = skillBase[key] !== undefined ? skillBase[key] : 0;
        const genericModifier = owner.allModifiers[`all_${key}P`];
        const genericBonus = owner.allModifiers[`all_${key}V`];
        if (genericModifier) modifier *= genericModifier;
        if (genericBonus) bonus += genericBonus;
        this[key] = +(((base || 0) + bonus) * modifier).toFixed(2);
      } else if (typeof value === "object" && !Array.isArray(value)) {
        this[key] = { ...updateObject(key, value, owner.allModifiers[id]) };
      }
    });
  }

  getAttackDamages(owner) {
    const attackDamagesArray = [...this.attackDamages];
    attackDamagesArray.forEach((type, index) => {
      if (type.fromWeapon) {
        attackDamagesArray.splice(index, 1, { ...owner.getBaseDamage() });
      }
    });
    const attackDamages = {};
    attackDamagesArray.forEach((type) => {
      Object.entries(type).forEach(([key, value]) => {
        if (!attackDamages[key]) attackDamages[key] = 0;
        attackDamages[key] += value;
      });
    });
    return attackDamages;
  }
}

const skills = {
  attack: {
    id: "attack",
    type: "attack",
    attackDamages: [{ fromWeapon: true }],
    attackType: "weapon",
    cooldown: 0,
  },
  focusedBlow: {
    id: "focusedBlow",
    type: "attack",
    attackDamages: [{ fromWeapon: true }],
    attackType: "weapon",
    cooldown: 3,
    modifiers: {
      physicalPowerV: 100,
      accuracyV: 20,
    },
  },
};
