const bodyParts = {
  eyes: {
    human: {},
    orc: {},
    feline: {
      shape: "vertical slit",
      modifiers: {
        accuracyV: 2,
      },
    },
    elven: {
      modifiers: {
        magicalDamageP: 5,
      },
    },
  },
  ears: {
    human: {},
    feline: {
      shape: "pointy",
    },
    elven: {
      shape: "pointy",
      modifiers: {
        evasionV: 2,
      },
    },
  },
  nose: {
    human: {},
    feline: {
      shape: "pointy",
    },
  },
  mouth: {
    human: {},
    orc: {
      shape: "tusks",
    },
    feline: {},
  },
  hair: {
    human: {},
  },
  face: {
    human: {},
    feline: {},
  },
  skin: {
    human: {},
    orc: {
      rough: true,
      modifiers: {
        armorV: 10,
      },
    },
    fur: {
      modifiers: {
        evasionV: 2,
      },
    },
    toughFur: {
      modifiers: {
        armorV: 20,
      },
    },
  },
  horns: {},
  wings: {},
  tail: {
    feline: {},
  },
  arms: {
    human: {},
    feline: {
      modifiers: {
        accuracyV: 1,
      },
      naturalWeapons: [
        {
          name: "claws",
          damage: {
            piercing: 20,
          },
        },
      ],
    },
    elf: {},
  },
  legs: {
    human: {},
    feline: {
      modifiers: {
        evasionV: 1,
      },
    },
    elf: {},
  },
  feet: {
    human: {},
    feline: {
      modifiers: {
        evasionV: 1,
      },
    },
    elf: {},
  },
};
Object.keys(bodyParts).forEach((part) => {
  Object.keys(bodyParts[part]).forEach((key) => {
    bodyParts[part][key].type = key;
  });
});

const bodyPartTypes = Object.keys(bodyParts);
const racialTemplates = {
  human: {
    eyes: bodyParts.eyes.human,
    ears: bodyParts.ears.human,
    nose: bodyParts.nose.human,
    mouth: bodyParts.mouth.human,
    hair: bodyParts.hair.human,
    face: bodyParts.face.human,
    skin: bodyParts.skin.human,
    horns: { type: "none" },
    wings: { type: "none" },
    tail: { type: "none" },
    arms: bodyParts.arms.human,
    legs: bodyParts.legs.human,
    feet: bodyParts.feet.human,
  },
  orc: {
    eyes: bodyParts.eyes.orc,
    ears: bodyParts.ears.elven,
    nose: bodyParts.nose.human,
    mouth: bodyParts.mouth.orc,
    hair: bodyParts.hair.human,
    face: bodyParts.face.human,
    skin: bodyParts.skin.orc,
    horns: { type: "none" },
    wings: { type: "none" },
    tail: { type: "none" },
    arms: bodyParts.arms.human,
    legs: bodyParts.legs.human,
    feet: bodyParts.feet.human,
  },
  beastman: {
    eyes: bodyParts.eyes.feline,
    ears: bodyParts.ears.feline,
    nose: bodyParts.nose.feline,
    mouth: bodyParts.mouth.feline,
    hair: bodyParts.hair.human,
    face: bodyParts.face.feline,
    skin: bodyParts.skin.fur,
    horns: { type: "none" },
    wings: { type: "none" },
    tail: bodyParts.tail.feline,
    arms: bodyParts.arms.feline,
    legs: bodyParts.legs.feline,
    feet: bodyParts.feet.feline,
  },
};
