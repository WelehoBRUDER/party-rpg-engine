class Accessory extends Item {
  constructor(accessory) {
    super(accessory);
    const base = { ...items[this.id] };
    this.modifiers = base.modifiers ? { ...base.modifiers } : {};
    this.accessorySlot = base.accessorySlot;
  }
}
