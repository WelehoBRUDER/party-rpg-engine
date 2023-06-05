class Body {
  constructor(base) {
    this.eyes = base.eyes || { type: "human", color: "brown", count: 2 };
    this.ears = base.ears || { type: "human", shape: "pointy", count: 2 };
    this.nose = base.nose || { type: "human", shape: "pointy" };
    this.mouth = base.mouth || { type: "human", shape: "pointy" };
    this.hair = base.hair || { type: "human", color: "brown", length: "short" };
    this.face = base.face || { type: "human", shape: "pointy" };
    this.skin = base.skin || { type: "human", color: "brown" };
    this.horns = base.horns || { type: "none" };
    this.wings = base.wings || { type: "none" };
    this.tail = base.tail || { type: "none" };
    this.arms = base.arms || { type: "human", count: 2 };
    this.legs = base.legs || { type: "human", count: 2 };
    this.feet = base.feet || { type: "human", count: 2 };

    this.updateModifiers();
  }
  updateModifiers() {
    Object.entries(this).forEach(([key, value]) => {
      this[key].modifiers = { ...bodyParts[key][value.type]?.modifiers } ?? {};
    });
  }
}
