// Just a test function for the player
function attack() {
  const target = encounters.goblinDuo.enemies[0];
  const attacker = player;
  const skill = attacker.skills[0];
  calculateAttack(attacker, target, skill);
}

function calculateAttack(attacker, target, skill) {
  const attackHits = checkHit(attacker, target, skill);
  if (attackHits) {
    const damage = calculateDamage(attacker, target, skill);
    const totalDamage = Object.values(damage).reduce((a, b) => a + b);
    console.log(`You dealt ${totalDamage} damage to ${target.name}!`);
  } else {
    console.log(`You missed ${target.name}!`);
  }
}
