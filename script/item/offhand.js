class Offhand extends Item {
  constructor(offhand) {
    super(offhand);
    const base = { ...items[this.id] };
    this.damage = { ...base.damage };
    this.defense = { ...base.defense };
    this.modifiers = base.modifiers ? { ...base.modifiers } : {};
  }
}
