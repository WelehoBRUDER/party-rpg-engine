class Trait {
  constructor(trait) {
    this.id = trait.id;
    const base = traits[trait.id];
    this.modifiers = { ...base.modifiers };
  }
}

const traits = {
  // Counts most humanlike races, except for goblins.
  humanoidConstitution: {
    id: "humanoidConstitution",
    modifiers: {
      hpMaxV: 50,
      mpMaxV: 20,
      epMaxV: 30,
    },
  },
  // Goblins are small and weak. Rats are small and weak. Coincidence?
  goblinoidConstitution: {
    id: "goblinoidConstitution",
    modifiers: {
      hpMaxV: 30,
      mpMaxV: 10,
      epMaxV: 20,
      evasionV: 5,
    },
  },
};
