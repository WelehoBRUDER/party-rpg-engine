class Character {
  constructor(base) {
    this.id = base.id;
    this.name = base.name || "Unnamed";
    this.stats = { ...base.stats };
  }

  getStats() {
    // TODO: Add modifiers
    return this.stats;
  }
}
