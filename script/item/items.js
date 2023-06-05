const weapons = {
  ironDagger: {
    id: "ironDagger",
    name: "Iron Dagger",
    type: "weapon",
    icon: "ironDagger",
    value: 10,
    damage: {
      piercing: 15,
    },
  },
};
const armors = {};
const accessories = {};
const consumables = {};

const items = {
  ...weapons,
  ...armors,
  ...accessories,
  ...consumables,
};
