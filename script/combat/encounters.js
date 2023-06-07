class Encounter {
  constructor(base) {
    this.id = base.id;
    this.enemies = base.enemies;

    this.nameEnemies();
  }

  nameEnemies() {
    const idCount = {};
    this.enemies.forEach((enemy) => {
      if (!idCount[enemy.id]) {
        idCount[enemy.id] = 0;
      }
      enemy.name = game.getText(enemy.id) + " " + count[idCount[enemy.id]];
      idCount[enemy.id]++;
    });
  }
}
// More than 10 enemies of the same type will break this :D
const count = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const encounters = {
  goblinDuo: new Encounter({
    id: "goblinDuo",
    enemies: [new Character({ ...enemies.goblin, name: "Goblin A" }), new Character({ ...enemies.goblin, name: "Goblin B" })],
  }),
};
