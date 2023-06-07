class Player extends Character {
  constructor(base) {
    super(base);
  }
}

const player = new Player({
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
  classes: [sampleClasses.fighter],
  race: races.beastman,
  mutations: [],
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

const party = [player, new Character(companions.rinium)];
updateScreen();
