const damageTypes = {
  physical: {
    id: "physical",
    defense: "armor",
    penetration: "armorPenetration",
    dodge: ["evasion", "physicalResilience"],
    subTypes: ["piercing", "bludgeoning"],
  },
  magical: {
    id: "magical",
    defense: "ward",
    penetration: "magicalPenetration",
    dodge: ["magicalResilience"],
    subTypes: ["fire", "ice", "lightning", "poison", "dark", "light"],
  },
  mental: {
    id: "mental",
    defense: "resolve",
    penetration: "mentalPenetration",
    dodge: ["mentalResilience"],
    subTypes: ["fear", "charm", "confusion", "sleep", "silence", "blindness", "paralysis", "slow", "stun"],
  },
};

function getEvasionFromAttackType(attackType) {
  if (attackType === "weapon" || attackType === "aoe") {
    return "evasion";
  }
  return attackType + "Resilience";
}

function getDamageArchetype(subType) {
  const damageType = Object.values(damageTypes).find((damageType) => damageType.subTypes.includes(subType));
  return damageType;
}

function checkHit(attacker, defender, attack) {
  const atkType = getEvasionFromAttackType(attack.attackType);
  const evadeBonus = defender.getEvasion()[atkType];
  const accuracy = attacker.getAccuracy();
  const hitChance = accuracy - evadeBonus;
  const hitRoll = Math.floor(Math.random() * 100) + hitChance;
  const hit = hitRoll >= 10;
  console.log(`Attacker accuracy: ${accuracy} (evade bonus: ${evadeBonus})`);
  console.log(`Hit roll: ${hitRoll} (hit chance: ${hitChance})` + (hit ? " HIT!" : " MISS!"));
  return hit;
}

// Defense reduces enemy damage as a hit point multiplier.
function getDefenseEffectiveness(defense, forDisplay = false) {
  let reduction = +((1 - defense / (defense + 100)) * 100).toFixed(2);
  if (forDisplay) {
    reduction = `${(100 - reduction).toFixed(2)}%`;
  }

  return reduction;
}

function calculateDamage(attacker, defender, attack) {
  const damage = attack.getAttackDamages(attacker);
  const defenses = defender.getDefenses();
  const resistances = defender.getResistances();
  const penetration = attacker.getPenetration();
  const power = attacker.getPower();
  Object.entries(damage).forEach(([damageType, value]) => {
    // Randomize damage by 15%
    value *= 0.85 + Math.random() * 0.3;
    let dmg = value;
    const damageArchetype = getDamageArchetype(damageType);
    const attackMultiplier = 1 + power[damageArchetype.id] / 100;
    const resistance = 1 - resistances[damageArchetype.id][damageType] / 100;
    let defense = defenses[damageArchetype.defense];
    if (defense > 0) {
      defense = Math.max(0, defense - penetration[damageArchetype.penetration]);
    }
    const reduction = getDefenseEffectiveness(defense) / 100;
    console.log("def", defense);
    console.log("pen", penetration[damageArchetype.penetration]);
    console.log("atk", attackMultiplier);
    console.log("base atk", dmg);
    // Apply multiplier to attack damage
    dmg *= attackMultiplier;
    console.log("multi atk", dmg);

    // Apply defense reduction
    console.log("reduction", reduction);
    dmg *= reduction;

    // Apply resistance reduction
    console.log("resistance", resistance);
    dmg *= resistance;

    console.log("final", dmg);
    damage[damageType] = Math.round(dmg);
  });
  return damage;
}
