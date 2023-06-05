const defaultModifiers = {
  strengthModifiers: {
    strengthDamageP: 5,
    armorPenetrationV: 1,
    armorV: 1,
  },
  agilityModifiers: {
    agilityDamageP: 5,
    epMaxV: 3,
    evasionV: 1,
    initiativeV: 1,
  },
  vitalityModifiers: {
    hpMaxV: 5,
    physicalResistanceV: 1,
  },
  intelligenceModifiers: {
    magicalDamageP: 5,
    magicalPenetrationV: 1,
    mpMaxV: 3,
    wardV: 1,
  },
  willpowerModifiers: {
    mentalDamageP: 5,
    resolveV: 1,
    mentalResistanceV: 1,
    hpMaxV: 2,
    epMaxV: 1,
    mpMaxV: 1,
  },
  expGainP: 1,
  goldGainP: 1,
  luckP: 1,
  physicalDamageP: 1,
  meleeDamageP: 1,
  rangedDamageP: 1,
  magicalDamageP: 1,
  mentalDamageP: 1,
  initiativeV: 0,
  evasionV: 0,
  armorP: 1,
  physicalResistanceP: 1,
  wardP: 1,
  magicalResistanceP: 1,
  resolveP: 1,
  mentalResistanceP: 1,
  armorV: 0,
  physicalResistanceV: 0,
  wardV: 0,
  magicalResistanceV: 0,
  resolveV: 0,
  mentalResistanceV: 0,
};

const baseAttributes = ["strength", "agility", "vitality", "intelligence", "willpower"];

function getAllModifiers(char) {
  const modifiers = { ...defaultModifiers };
  char.traits.forEach((trait) => {
    Object.entries(trait.modifiers).forEach(([key, value]) => {
      applyModifierToTotal(key, value, modifiers);
    });
  });
  Object.entries(char.baseRace.modifiers).forEach(([key, value]) => {
    applyModifierToTotal(key, value, modifiers);
  });
  Object.values(char.body).forEach((part) => {
    Object.entries(part.modifiers).forEach(([key, value]) => {
      applyModifierToTotal(key, value, modifiers);
    });
  });
  return modifiers;
}

function applyModifierToTotal(key, value, total) {
  if (!total?.[key]) {
    total[key] = value;
    if (typeof value === "number") {
      if (key.endsWith("P")) {
        total[key] = 1 + total[key] / 100;
      }
    }
  } else if (typeof value === "number") {
    if (key.endsWith("P")) {
      total[key] += value / 100;
    } else if (key.endsWith("V")) total[key] += value;
  } else {
    total[key] = mergeObjects(total[key], value);
  }
}

// This function was found here:
// https://stackoverflow.com/a/53509503
const mergeObjects = (obj1, obj2, options) => {
  return Object.entries(obj1).reduce(
    (prev, [key, value]) => {
      if (typeof value === "number") {
        if (options?.subtract) {
          prev[key] = value - (prev[key] || 0);
          if (!prev[key]) prev[key] = value;
        } else {
          prev[key] = value + (prev[key] || 0);
        }
      } else {
        if (obj2 === undefined) obj2 = {};
        prev[key] = mergeObjects(value, obj2[key]);
      }
      return prev;
    },
    { ...obj2 }
  ); // spread to avoid mutating obj2
};

const updateObject = (key, object, mods) => {
  return Object.entries(object).map(([_key, value]) => {
    if (typeof value === "number") {
      const bonus = mods?.[key]?.[_key + "V"] ?? 0;
      const modifier = 1 + (mods?.[key]?.[_key + "P"] / 100 || 0);
      return +(((value || 0) + bonus) * modifier).toFixed(2);
    } else if (typeof value === "object") {
      return updateObject(_key, value, mods?.[key]);
    }
  });
};

const updateObjectWithoutReturn = (key, object, mods) => {
  return Object.entries(object).map(([_key, value]) => {
    if (typeof value === "number") {
      const bonus = mods?.[key]?.[_key + "V"] ?? 0;
      const modifier = 1 + (mods?.[key]?.[_key + "P"] / 100 || 0);
      object[_key] + (((value || 0) + bonus) * modifier).toFixed(2);
    } else if (typeof value === "object") {
      return updateObject(_key, value, mods?.[key]);
    }
  });
};
