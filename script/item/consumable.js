class Consumable extends Item {
  constructor(consumable) {
    super(consumable);
    const base = { ...items[this.id] };
    this.modifiers = base.modifiers ? { ...base.modifiers } : {};
    this.effect = base.effect;
  }
}
