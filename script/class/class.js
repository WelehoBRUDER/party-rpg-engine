class Classrole {
  constructor(base) {
    this.id = base.id;
    this.hpOnLevelUp = base.hpOnLevelUp || 10;
    this.level = base.level || 1;
  }

  heyWorld() {
    console.log("Hey world!");
  }
}

// Multiclassing is allowed, but might be very unbalanced.
const sampleClasses = {
  fighter: {
    id: "fighter",
    hpOnLevelUp: 15,
  },
  rogue: {
    id: "rogue",
    hpOnLevelUp: 13,
  },
  wizard: {
    id: "wizard",
    hpOnLevelUp: 8,
  },
  defender: {
    id: "defender",
    hpOnLevelUp: 18,
  },
  // Beast is a special class only for beast type enemies (like wolves, bears, etc.)
  beast: {
    id: "beast",
    hpOnLevelUp: 10,
  },
  // Savage is a special class only for savage type enemies (like wild goblins, orcs, etc.)
  savage: {
    id: "savage",
    hpOnLevelUp: 12,
  },
};
