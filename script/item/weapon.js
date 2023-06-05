class Weapon extends Item {
  constructor(weapon) {
    super(weapon);
    const base = { ...items[this.id] };
    this.damage = { ...base.damage };
    this.modifiers = base.modifiers ? { ...base.modifiers } : {};
  }
}
