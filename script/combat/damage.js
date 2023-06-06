const damageTypes = {
  physical: {
    defense: "armor",
    dodge: ["evasion", "physicalResilience"],
    subTypes: ["piercing", "bludgeoning"],
  },
  magical: {
    defense: "ward",
    dodge: ["magicalResilience"],
    subTypes: ["fire", "ice", "lightning", "poison", "dark", "light"],
  },
  mental: {
    defense: "resolve",
    dodge: ["mentalResilience"],
    subTypes: ["fear", "charm", "confusion", "sleep", "silence", "blindness", "paralysis", "slow", "stun"],
  },
};

function checkHit(attacker, defender, attack) {
  // For now, we're not checking for attack types.
  const evadeBonus = defender.getEvasion().evasion;
  const accuracy = attacker.getAccuracy();
  const hitChance = accuracy - evadeBonus;
  const hitRoll = Math.floor(Math.random() * 100) + hitChance;
  const hit = hitRoll >= 10;
  console.log(`Attacker accuracy: ${accuracy} (evade bonus: ${evadeBonus})`);
  console.log(`Hit roll: ${hitRoll} (hit chance: ${hitChance})` + (hit ? " HIT!" : " MISS!"));
  return hit;
}
