class Trait {
  constructor(trait) {
    this.id = trait.id;
    const base = traits[trait.id];
    this.modifiers = { ...base.modifiers };
  }
}

const traits = {
  humanoidConstitution: {
    id: "humanoidConstitution",
    modifiers: {
      hpMaxV: 50,
      mpMaxV: 20,
      epMaxV: 30,
    },
  },
};
