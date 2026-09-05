import { AttributeModifier, AttributeType, ModifierType } from '../core/types';

/**
 * base=0isFloat=true/Buff/
 */
const EXTERNAL_SECONDARY_ATTRS = new Set<AttributeType>([
  AttributeType.ARMOR_PENETRATION,
  AttributeType.MAGIC_PENETRATION,
  AttributeType.CRIT_RESIST,
  AttributeType.CRIT_DAMAGE_REDUCTION,
  AttributeType.HEAL_AMPLIFY,
  AttributeType.HEAL_RECEIVED_REDUCTION,
]);

function curve(x: number, scale: number, cap: number): number {
  const value = Math.max(0, x);
  return cap * value / (value + scale);
}

/**
 *  -
 *
 * 6
 * OVERRIDE> BASE() → FIXED → ADD → MULTIPLY → FINAL
 *
 * baseValueFn getBaseValue()
 * setBaseValue()
 */
class Attribute {
  readonly type: AttributeType;
  private _baseValue: number;
  private _baseValueFn?: () => number;
  private _modifiers: AttributeModifier[] = [];
  private _isFloat: boolean;

  constructor(
    type: AttributeType,
    baseValue: number,
    isFloat = false,
    baseValueFn?: () => number,
  ) {
    this.type = type;
    this._baseValue = baseValue;
    this._isFloat = isFloat;
    this._baseValueFn = baseValueFn;
  }

  /** base  */
  isDerived(): boolean {
    return !!this._baseValueFn;
  }

  private _computeBase(): number {
    return this._baseValueFn ? this._baseValueFn() : this._baseValue;
  }

  getFinalValue(): number {
    const override = this._modifiers.find(
      (m) => m.type === ModifierType.OVERRIDE,
    );
    if (override) {
      return this._isFloat
        ? Math.max(0, override.value)
        : Math.max(0, Math.floor(override.value));
    }

    let final = this._computeBase();

    // FIXED:
    final += this._modifiers
      .filter((m) => m.type === ModifierType.FIXED)
      .reduce((sum, m) => sum + m.value, 0);

    // ADD:
    const addBonus = this._modifiers
      .filter((m) => m.type === ModifierType.ADD)
      .reduce((sum, m) => sum + m.value, 0);
    final *= 1 + addBonus;

    // MULTIPLY:
    const multBonus = this._modifiers
      .filter((m) => m.type === ModifierType.MULTIPLY)
      .reduce((product, m) => product * m.value, 1);
    final *= multBonus;

    // FINAL:
    const finalMod = this._modifiers.find((m) => m.type === ModifierType.FINAL);
    if (finalMod) final += finalMod.value;

    return this._isFloat ? Math.max(0, final) : Math.max(0, Math.floor(final));
  }

  /**
   *  modifier
   * ""
   */
  getBaseValue(): number {
    return this._computeBase();
  }

  /**
   *
   *  baseValueFn base
   */
  setBaseValue(value: number): void {
    if (this._baseValueFn) return;
    if (value < 0) throw new Error(`Base value cannot be negative: ${value}`);
    this._baseValue = value;
  }

  addModifier(modifier: AttributeModifier): void {
    this._modifiers.push(modifier);
  }

  removeModifier(modifierId: string): void {
    this._modifiers = this._modifiers.filter((m) => m.id !== modifierId);
  }

  clearModifiers(): void {
    this._modifiers = [];
  }

  getModifiers(): AttributeModifier[] {
    return [...this._modifiers];
  }

  setModifiers(modifiers: AttributeModifier[]): void {
    this._modifiers = modifiers;
  }
}

/**
 *  +
 *
 *  10
 * - VITALITY  ()    —
 * - STRENGTH  ()    —
 * - SPIRIT    ()    —
 * - ENDURANCE ()    —
 * - SPEED     ()    —
 * - WILLPOWER ()    —
 *
 * base=modifier
 * - ATK                   = 40 + STRENGTH×3.5
 * - DEF                   = 10 + ENDURANCE×1.75
 * - MAGIC_ATK             = 40 + SPIRIT×3.5
 * - MAGIC_DEF             = 10 + WILLPOWER×1.75 + VITALITY×0.25
 * - ACTION_SPEED          = SPEED
 * - CRIT_RATE               = 0.05
 * - CRIT_DAMAGE_MULT      = 1.5
 * - EVASION_RATE            = 0.02 + curve(SPEED, 240, 0.24)
 * - ACCURACY                  = 0.05 + curve(SPEED, 240, 0.27)
 * - CONTROL_HIT           = 0.04 + curve(WILLPOWER, 240, 0.30)
 * - CONTROL_RESISTANCE    = 0.04 + curve(WILLPOWER, 240, 0.34)
 * - MAX_HP                = 400 + VITALITY×20 + ENDURANCE×3
 * - MAX_MP                = 200 + SPIRIT×4 + WILLPOWER×10
 *
 * base=0/Buff/
 * - ARMOR_PENETRATIONMAGIC_PENETRATIONCRIT_RESISTCRIT_DAMAGE_REDUCTIONHEAL_AMPLIFY
 */
export class AttributeSet {
  private _attributes = new Map<AttributeType, Attribute>();

  /**
   * Create a new AttributeSet with optional base values.
   * @param baseValues - Partial record of primary attribute base values
   */
  constructor(baseValues: Partial<Record<AttributeType, number>>) {
    // ──  10──
    const primaryAttrs = [
      AttributeType.VITALITY,
      AttributeType.STRENGTH,
      AttributeType.SPIRIT,
      AttributeType.ENDURANCE,
      AttributeType.SPEED,
      AttributeType.WILLPOWER,
    ];
    for (const attrType of primaryAttrs) {
      this._attributes.set(
        attrType,
        new Attribute(attrType, baseValues[attrType] ?? 10, false),
      );
    }

    // ── base ──
    this._attributes.set(
      AttributeType.ATK,
      new Attribute(
        AttributeType.ATK,
        0,
        true,
        () =>
          Math.floor(
            40 + this.getValue(AttributeType.STRENGTH) * 3.5,
          ),
      ),
    );

    this._attributes.set(
      AttributeType.DEF,
      new Attribute(
        AttributeType.DEF,
        0,
        true,
        () =>
          Math.floor(
            10 + this.getValue(AttributeType.ENDURANCE) * 1.75,
          ),
      ),
    );

    this._attributes.set(
      AttributeType.MAGIC_ATK,
      new Attribute(
        AttributeType.MAGIC_ATK,
        0,
        true,
        () =>
          Math.floor(
            40 + this.getValue(AttributeType.SPIRIT) * 3.5,
          ),
      ),
    );

    this._attributes.set(
      AttributeType.MAGIC_DEF,
      new Attribute(
        AttributeType.MAGIC_DEF,
        0,
        true,
        () =>
          Math.floor(
            10 +
              this.getValue(AttributeType.WILLPOWER) * 1.75 +
              this.getValue(AttributeType.VITALITY) * 0.25,
          ),
      ),
    );

    this._attributes.set(
      AttributeType.ACTION_SPEED,
      new Attribute(
        AttributeType.ACTION_SPEED,
        0,
        true,
        () => this.getValue(AttributeType.SPEED),
      ),
    );

    this._attributes.set(
      AttributeType.CRIT_RATE,
      new Attribute(AttributeType.CRIT_RATE, 0, true, () => 0.05),
    );

    this._attributes.set(
      AttributeType.CRIT_DAMAGE_MULT,
      new Attribute(AttributeType.CRIT_DAMAGE_MULT, 0, true, () => 1.5),
    );

    this._attributes.set(
      AttributeType.EVASION_RATE,
      new Attribute(AttributeType.EVASION_RATE, 0, true, () =>
        0.02 + curve(this.getValue(AttributeType.SPEED), 240, 0.24),
      ),
    );

    this._attributes.set(
      AttributeType.ACCURACY,
      new Attribute(AttributeType.ACCURACY, 0, true, () =>
        0.05 + curve(this.getValue(AttributeType.SPEED), 240, 0.27),
      ),
    );

    this._attributes.set(
      AttributeType.CONTROL_HIT,
      new Attribute(AttributeType.CONTROL_HIT, 0, true, () =>
        0.04 + curve(this.getValue(AttributeType.WILLPOWER), 240, 0.30),
      ),
    );

    this._attributes.set(
      AttributeType.CONTROL_RESISTANCE,
      new Attribute(AttributeType.CONTROL_RESISTANCE, 0, true, () =>
        0.04 + curve(this.getValue(AttributeType.WILLPOWER), 240, 0.34),
      ),
    );

    this._attributes.set(
      AttributeType.MAX_HP,
      new Attribute(
        AttributeType.MAX_HP,
        0,
        false,
        () =>
          Math.floor(
            400 +
              this.getValue(AttributeType.VITALITY) * 20 +
              this.getValue(AttributeType.ENDURANCE) * 3,
          ),
      ),
    );

    this._attributes.set(
      AttributeType.MAX_MP,
      new Attribute(
        AttributeType.MAX_MP,
        0,
        false,
        () =>
          Math.floor(
            200 +
              this.getValue(AttributeType.SPIRIT) * 4 +
              this.getValue(AttributeType.WILLPOWER) * 10,
          ),
      ),
    );

    // ── base=0──
    for (const attrType of EXTERNAL_SECONDARY_ATTRS) {
      this._attributes.set(attrType, new Attribute(attrType, 0, true));
    }
  }

  /**
   * Get all base attribute values as a record.
   * For derived attributes, returns the formula-computed base.
   * @returns Record mapping attribute types to their base values
   */
  getAllBaseValues(): Record<AttributeType, number> {
    const result = {} as Record<AttributeType, number>;
    this._attributes.forEach((attr, type) => {
      result[type] = attr.getBaseValue();
    });
    return result;
  }

  /**
   * Get the final value of an attribute after applying all modifiers.
   * @param attrType - The attribute type to query
   * @returns The final attribute value (0 if attribute doesn't exist)
   */
  getValue(attrType: AttributeType): number {
    return this._attributes.get(attrType)?.getFinalValue() ?? 0;
  }

  /**
   * Get the base value of an attribute without modifiers.
   * For derived attributes, returns the formula-computed base (panel floor value).
   * @param attrType - The attribute type to query
   * @returns The base attribute value (0 if attribute doesn't exist)
   */
  getBaseValue(attrType: AttributeType): number {
    return this._attributes.get(attrType)?.getBaseValue() ?? 0;
  }

  /**
   * Set the base value of a primary attribute.
   * Has no effect on derived attributes (their base is formula-driven).
   * @param attrType - The attribute type to modify
   * @param value - The new base value (must be non-negative)
   */
  setBaseValue(attrType: AttributeType, value: number): void {
    this._attributes.get(attrType)?.setBaseValue(value);
  }

  /**
   * Add a modifier to an attribute.
   * @param modifier - The modifier to add
   */
  addModifier(modifier: AttributeModifier): void {
    this._attributes.get(modifier.attrType)?.addModifier(modifier);
  }

  /**
   * Remove a modifier from all attributes by its ID.
   * @param modifierId - The ID of the modifier to remove
   */
  removeModifier(modifierId: string): void {
    this._attributes.forEach((attr) => attr.removeModifier(modifierId));
  }

  /**
   * Remove modifiers by source object reference.
   * @param source - The source object to match
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeModifierBySource(source: any): void {
    this._attributes.forEach((attr) => {
      attr.setModifiers(attr.getModifiers().filter((m) => m.source !== source));
    });
  }

  /**
   * Clear all modifiers from all attributes.
   */
  clearModifiers(): void {
    this._attributes.forEach((attr) => attr.clearModifiers());
  }

  getModifiers(): AttributeModifier[] {
    return [...this._attributes.values()].flatMap((attribute) =>
      attribute.getModifiers(),
    );
  }

  /**
   * Get all final attribute values as a record.
   * @returns Record mapping attribute types to their final values
   */
  getAllValues(): Record<AttributeType, number> {
    const result = {} as Record<AttributeType, number>;
    this._attributes.forEach((attr, type) => {
      result[type] = attr.getFinalValue();
    });
    return result;
  }

  /**
   *  = 340 + VITALITY×16.2
   */
  getMaxHp(): number {
    return this.getValue(AttributeType.MAX_HP);
  }

  /**
   *  = 200 + SPIRIT×10.8 + WILLPOWER×5.4
   */
  getMaxMp(): number {
    return this.getValue(AttributeType.MAX_MP);
  }

  /**
   * Create a deep clone of this AttributeSet.
   * Derived attribute formulas are re-bound automatically via constructor.
   * Only primary attribute base values and all modifiers need to be copied.
   */
  clone(): AttributeSet {
    const cloned = new AttributeSet({});
    this._attributes.forEach((attr, type) => {
      // Only copy base values for primary (non-derived) attributes
      if (!attr.isDerived()) {
        cloned.setBaseValue(type, attr.getBaseValue());
      }
      // Always copy all modifiers (Buff-applied modifiers affect any attribute)
      attr.getModifiers().forEach((mod) => cloned.addModifier({ ...mod }));
    });
    return cloned;
  }
}
