class Skill {
  constructor(skill) {
    this.id = skill.id;
    this.type = skill.type;
    this.attackPower = skill.attackPower ?? 0;
    this.attackPenetration = skill.attackPenetration ?? 0;
    this.attackDamageTypes = skill.attackDamageTypes ? [...skill.attackDamageTypes] : [];
    this.cooldown = skill.cooldown ?? 0;
    this.onCooldown = skill.onCooldown ?? 0;
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
}

const skills = {
  attack: {
    id: "attack",
    type: "attack",
    attackPower: 1,
    attackPenetration: 0,
    attackDamageTypes: ["fromWeapon"],
    cooldown: 0,
  },
};
