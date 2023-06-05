class Armor extends Item {
  constructor(armor) {
    super(armor);
    const base = { ...items[this.id] };
    this.defense = { ...base.defense };
    this.modifiers = base.modifiers ? { ...base.modifiers } : {};
  }
}
