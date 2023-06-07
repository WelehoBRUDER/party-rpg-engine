const enemies = {
  goblin: {
    id: "goblin",
    name: "Goblin",
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
    traits: [traits.goblinoidConstitution],
    skills: [new Skill(skills.attack)],
    classes: [sampleClasses.rogue],
    race: races.goblin,
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
  },
};
