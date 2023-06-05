class Item {
  constructor(item) {
    this.id = item.id;
    const base = { ...items[this.id] };
    this.value = base.value;
    this.unique = base.unique;
    this.type = base.type;
    this.icon = base.icon;
    this.modifiers = base.modifiers ? { ...base.modifiers } : {};
  }

  affirmClass() {
    // This function returns a new instance of the correct class based on the item's type.
    // Classes aren't stored fully in order to save space.
    if (this.type !== "generic") {
      const itemClasses = [Armor, Accessory, Consumable, Weapon];
      return new itemClasses[itemClasses.findIndex((itemClass) => itemClass.name === this.type)](this);
    } else return new Item(this);
  }
}

const equipmentSlots = ["weapon", "offhand", "head", "shoulders", "body", "arms", "legs", "ring", "necklace"];
