//#region src/shared/engine/shared/tag-domain/GameplayTagContainer.ts
/**
* 标签容器：管理单位、技能、Buff 等对象的标签集合。
*/
var GameplayTagContainer = class GameplayTagContainer {
	_tags = /* @__PURE__ */ new Set();
	addTags(tags) {
		tags.forEach((tag) => this._tags.add(tag));
	}
	removeTags(tags) {
		tags.forEach((tag) => this._tags.delete(tag));
	}
	hasTag(tag) {
		if (this._tags.has(tag)) return true;
		return this._getParentTags(tag).some((parent) => this._tags.has(parent));
	}
	hasAnyTag(tags) {
		return tags.some((tag) => this.hasTag(tag));
	}
	hasAllTags(tags) {
		return tags.every((tag) => this.hasTag(tag));
	}
	getTags() {
		return Array.from(this._tags);
	}
	clear() {
		this._tags.clear();
	}
	clone() {
		const clone = new GameplayTagContainer();
		clone.addTags(this.getTags());
		return clone;
	}
	_getParentTags(tag) {
		const parts = tag.split(".");
		const parents = [];
		for (let i = 1; i < parts.length; i++) parents.push(parts.slice(0, i).join("."));
		return parents;
	}
};
//#endregion
//#region src/shared/engine/shared/tag-domain/creationTags.ts
var CreationTags = {
	MATERIAL: {
		ROOT: "Material",
		TYPE: "Material.Type",
		TYPE_SEED: "Material.Type.Seed",
		TYPE_HERB: "Material.Type.Herb",
		TYPE_ORE: "Material.Type.Ore",
		TYPE_MONSTER: "Material.Type.Monster",
		TYPE_MANUAL: "Material.Type.Manual",
		TYPE_GONGFA_MANUAL: "Material.Type.Manual.GongFa",
		TYPE_SKILL_MANUAL: "Material.Type.Manual.Skill",
		TYPE_SPECIAL: "Material.Type.Special",
		TYPE_AUXILIARY: "Material.Type.Auxiliary",
		QUALITY: "Material.Quality",
		ELEMENT: "Material.Element",
		SEMANTIC: "Material.Semantic",
		SEMANTIC_FLAME: "Material.Semantic.Flame",
		SEMANTIC_FREEZE: "Material.Semantic.Freeze",
		SEMANTIC_THUNDER: "Material.Semantic.Thunder",
		SEMANTIC_WIND: "Material.Semantic.Wind",
		SEMANTIC_BLADE: "Material.Semantic.Blade",
		SEMANTIC_GUARD: "Material.Semantic.Guard",
		SEMANTIC_BURST: "Material.Semantic.Burst",
		SEMANTIC_SUSTAIN: "Material.Semantic.Sustain",
		SEMANTIC_MANUAL: "Material.Semantic.Manual",
		SEMANTIC_SPIRIT: "Material.Semantic.Spirit",
		SEMANTIC_EARTH: "Material.Semantic.Earth",
		SEMANTIC_METAL: "Material.Semantic.Metal",
		SEMANTIC_WATER: "Material.Semantic.Water",
		SEMANTIC_WOOD: "Material.Semantic.Wood",
		SEMANTIC_POISON: "Material.Semantic.Poison",
		SEMANTIC_DIVINE: "Material.Semantic.Divine",
		SEMANTIC_SPACE: "Material.Semantic.Space",
		SEMANTIC_TIME: "Material.Semantic.Time",
		SEMANTIC_LIFE: "Material.Semantic.Life",
		SEMANTIC_ALCHEMY: "Material.Semantic.Alchemy",
		SEMANTIC_REFINING: "Material.Semantic.Refining",
		SEMANTIC_BEAST: "Material.Semantic.Beast",
		SEMANTIC_BLOOD: "Material.Semantic.Blood",
		SEMANTIC_BONE: "Material.Semantic.Bone",
		SEMANTIC_FORMATION: "Material.Semantic.Formation",
		SEMANTIC_ILLUSION: "Material.Semantic.Illusion",
		SEMANTIC_QI: "Material.Semantic.Qi",
		RECIPE: "Material.Recipe"
	},
	INTENT: {
		ROOT: "Intent",
		PRODUCT: "Intent.Product",
		PRODUCT_SKILL: "Intent.Product.Skill",
		PRODUCT_ARTIFACT: "Intent.Product.Artifact",
		PRODUCT_GONGFA: "Intent.Product.GongFa",
		OUTCOME: "Intent.Outcome",
		OUTCOME_ACTIVE: "Intent.Outcome.ActiveSkill",
		OUTCOME_PASSIVE: "Intent.Outcome.PassiveAbility"
	},
	RECIPE: {
		ROOT: "Recipe",
		PRODUCT_BIAS: "Recipe.ProductBias",
		PRODUCT_BIAS_SKILL: "Recipe.ProductBias.Skill",
		PRODUCT_BIAS_ARTIFACT: "Recipe.ProductBias.Artifact",
		PRODUCT_BIAS_GONGFA: "Recipe.ProductBias.GongFa",
		PRODUCT_BIAS_UTILITY: "Recipe.ProductBias.Utility",
		INTENT: "Recipe.Intent",
		MATCHED: "Recipe.Matched",
		GATED: "Recipe.Gated",
		UNLOCKED: "Recipe.Unlocked"
	},
	ENERGY: {
		ROOT: "Energy",
		BASE: "Energy.Base",
		BONUS: "Energy.Bonus",
		RESERVED: "Energy.Reserved"
	},
	AFFIX: {
		ROOT: "Affix",
		PREFIX: "Affix.Prefix",
		SUFFIX: "Affix.Suffix",
		CORE: "Affix.Core",
		SIGNATURE: "Affix.Signature",
		RESONANCE: "Affix.Resonance",
		SYNERGY: "Affix.Synergy",
		MYTHIC: "Affix.Mythic"
	},
	OUTCOME: {
		ROOT: "Outcome",
		ACTIVE_SKILL: "Outcome.ActiveSkill",
		PASSIVE_ABILITY: "Outcome.PassiveAbility",
		ARTIFACT: "Outcome.Artifact",
		GONGFA: "Outcome.GongFa"
	}
};
CreationTags.MATERIAL.SEMANTIC_FLAME, CreationTags.MATERIAL.SEMANTIC_FREEZE, CreationTags.MATERIAL.SEMANTIC_THUNDER, CreationTags.MATERIAL.SEMANTIC_WIND, CreationTags.MATERIAL.SEMANTIC_BLADE, CreationTags.MATERIAL.SEMANTIC_GUARD, CreationTags.MATERIAL.SEMANTIC_BURST, CreationTags.MATERIAL.SEMANTIC_SUSTAIN, CreationTags.MATERIAL.SEMANTIC_MANUAL, CreationTags.MATERIAL.SEMANTIC_SPIRIT, CreationTags.MATERIAL.SEMANTIC_EARTH, CreationTags.MATERIAL.SEMANTIC_METAL, CreationTags.MATERIAL.SEMANTIC_WATER, CreationTags.MATERIAL.SEMANTIC_WOOD, CreationTags.MATERIAL.SEMANTIC_POISON, CreationTags.MATERIAL.SEMANTIC_DIVINE, CreationTags.MATERIAL.SEMANTIC_SPACE, CreationTags.MATERIAL.SEMANTIC_TIME, CreationTags.MATERIAL.SEMANTIC_LIFE, CreationTags.MATERIAL.SEMANTIC_ALCHEMY, CreationTags.MATERIAL.SEMANTIC_REFINING, CreationTags.MATERIAL.SEMANTIC_BEAST, CreationTags.MATERIAL.SEMANTIC_BLOOD, CreationTags.MATERIAL.SEMANTIC_BONE, CreationTags.MATERIAL.SEMANTIC_FORMATION, CreationTags.MATERIAL.SEMANTIC_ILLUSION, CreationTags.MATERIAL.SEMANTIC_QI;
//#endregion
//#region src/shared/engine/shared/tag-domain/gameplayTags.ts
/**
* GameplayTags: creation-v2 与 battle-v5 共用的运行时语义词表。
*
* 约定：
* 1. 所有运行时标签都从这里取值，不允许手写字符串。
* 2. 叶子节点用于实际挂载与匹配，ROOT 仅用于表达父命名空间或做前缀判断。
* 3. Ability 轴已显式拆成 Function / Channel / Kind / Element / Target，避免再把“做什么”和“走哪条伤害通道”混为一谈。
*/
var GameplayTags = {
	UNIT: {
		ROOT: "Unit",
		TYPE: {
			ROOT: "Unit.Type",
			PLAYER: "Unit.Type.Player",
			ENEMY: "Unit.Type.Enemy",
			COMBATANT: "Unit.Type.Combatant"
		}
	},
	STATUS: {
		ROOT: "Status",
		IMMUNE: {
			ROOT: "Status.Immune",
			CONTROL: "Status.Immune.Control",
			DEBUFF: "Status.Immune.Debuff",
			FIRE: "Status.Immune.Fire"
		},
		STATE: {
			POISONED: "Status.Poisoned",
			BURNED: "Status.Burned",
			FROZEN: "Status.Frozen",
			BLEEDING: "Status.Bleeding",
			CHILLED: "Status.Chilled",
			SHOCKED: "Status.Shocked",
			BODY_ORGANS_SKILL_REFUNDED: "Status.BodyCultivation.OrgansSkillRefunded"
		},
		SECT: {
			ROOT: "Status.Sect",
			state: (sectId, stateId) => `Status.Sect.${sectId}.${stateId}`
		},
		CATEGORY: {
			BUFF: "Status.Buff",
			DEBUFF: "Status.Debuff",
			DOT: "Status.DOT",
			DEF_DEBUFF: "Status.DefDebuff",
			MYTHIC: "Status.Mythic",
			COMBO: "Status.Combo",
			MANA_EFF: "Status.ManaEff"
		},
		CONTROL: {
			ROOT: "Status.Control",
			STUNNED: "Status.Control.Stunned",
			NO_ACTION: "Status.Control.NoAction",
			NO_SKILL: "Status.Control.NoSkill",
			NO_BASIC: "Status.Control.NoBasic"
		}
	},
	ABILITY: {
		ROOT: "Ability",
		FUNCTION: {
			ROOT: "Ability.Function",
			DAMAGE: "Ability.Function.Damage",
			CONTROL: "Ability.Function.Control",
			HEAL: "Ability.Function.Heal",
			BUFF: "Ability.Function.Buff",
			DEBUFF: "Ability.Function.Debuff"
		},
		CHANNEL: {
			ROOT: "Ability.Channel",
			MAGIC: "Ability.Channel.Magic",
			PHYSICAL: "Ability.Channel.Physical",
			TRUE: "Ability.Channel.True"
		},
		MECHANIC: {
			ROOT: "Ability.Mechanic",
			IGNORE_SPIRITUAL_ROOT_MISMATCH: "Ability.Mechanic.IgnoreSpiritualRootMismatch"
		},
		KIND: {
			ROOT: "Ability.Kind",
			SKILL: "Ability.Kind.Skill",
			PASSIVE: "Ability.Kind.Passive",
			ARTIFACT: "Ability.Kind.Artifact",
			GONGFA: "Ability.Kind.GongFa",
			SECT: "Ability.Kind.Sect",
			BASIC: "Ability.Kind.Basic"
		},
		SECT: {
			ROOT: "Ability.Sect",
			namespace: (sectId) => `Ability.Sect.${sectId}`,
			path: (sectId, pathId) => `Ability.Sect.${sectId}.Path.${pathId}`,
			ability: (sectId, abilityId) => `Ability.Sect.${sectId}.Ability.${abilityId}`,
			mechanic: (sectId, mechanicId) => `Ability.Sect.${sectId}.Mechanic.${mechanicId}`,
			GENERATOR: "Ability.Sect.Role.Generator",
			COMBO: "Ability.Sect.Role.Combo",
			FINISHER: "Ability.Sect.Role.Finisher",
			DEFENSIVE: "Ability.Sect.Role.Defensive",
			UTILITY: "Ability.Sect.Role.Utility"
		},
		ELEMENT: {
			ROOT: "Ability.Element",
			FIRE: "Ability.Element.Fire",
			WATER: "Ability.Element.Water",
			WOOD: "Ability.Element.Wood",
			EARTH: "Ability.Element.Earth",
			METAL: "Ability.Element.Metal",
			WIND: "Ability.Element.Wind",
			ICE: "Ability.Element.Ice",
			THUNDER: "Ability.Element.Thunder"
		},
		TARGET: {
			ROOT: "Ability.Target",
			SINGLE: "Ability.Target.Single",
			AOE: "Ability.Target.AoE"
		}
	},
	BUFF: {
		ROOT: "Buff",
		TYPE: {
			ROOT: "Buff.Type",
			BUFF: "Buff.Type.Buff",
			DEBUFF: "Buff.Type.Debuff",
			CONTROL: "Buff.Type.Control"
		},
		DOT: {
			ROOT: "Buff.Dot",
			POISON: "Buff.Dot.Poison",
			BURN: "Buff.Dot.Burn",
			FREEZE: "Buff.Dot.Freeze",
			BLEED: "Buff.Dot.Bleed"
		},
		ELEMENT: {
			ROOT: "Buff.Element",
			FIRE: "Buff.Element.Fire",
			WATER: "Buff.Element.Water",
			WOOD: "Buff.Element.Wood",
			EARTH: "Buff.Element.Earth",
			METAL: "Buff.Element.Metal",
			WIND: "Buff.Element.Wind",
			ICE: "Buff.Element.Ice",
			THUNDER: "Buff.Element.Thunder",
			POISON: "Buff.Element.Poison"
		},
		SECT: {
			ROOT: "Buff.Sect",
			namespace: (sectId, buffId) => `Buff.Sect.${sectId}.${buffId}`
		}
	},
	TRAIT: {
		ROOT: "Trait",
		EXECUTE: "Trait.Execute",
		REFLECT: "Trait.Reflect",
		LIFESTEAL: "Trait.Lifesteal",
		MANA_THIEF: "Trait.ManaThief",
		SHIELD_MASTER: "Trait.Shield",
		BERSERKER: "Trait.Berserker",
		COOLDOWN: "Trait.Cooldown"
	},
	CONDITION: {
		ROOT: "Condition",
		LOW_HP: "Condition.LowHP",
		HIGH_HP: "Condition.HighHP",
		CRIT_READY: "Condition.CritReady",
		TARGET: {
			ROOT: "Condition.Target",
			LOW_HP: "Condition.Target.LowHP"
		},
		CASTER: {
			ROOT: "Condition.Caster",
			LOW_HP: "Condition.Caster.LowHP"
		}
	},
	EVENT: {
		ACTION_PRE: "ActionPreEvent",
		ACTION_POST: "ActionPostEvent",
		DAMAGE_TAKEN: "DamageSegmentAppliedEvent",
		DAMAGE_REQUEST: "DamageSegmentRequestedEvent",
		DAMAGE: "DamageSegmentRequestedEvent",
		SHIELD_BREAK: "ShieldBreakEvent",
		ROUND_PRE: "RoundPreEvent",
		ROUND_POST: "RoundPostEvent",
		ROUND_START: "RoundStartEvent",
		SKILL_PRE_CAST: "SkillPreCastEvent",
		SKILL_CAST: "SkillCastEvent",
		HIT_CHECK: "HitCheckEvent",
		DODGE: "DodgeEvent",
		BUFF_ADD: "BuffAddEvent",
		BUFF_APPLIED: "BuffAppliedEvent",
		BUFF_REMOVED: "BuffRemovedEvent",
		BUFF_IMMUNE: "BuffImmuneEvent",
		BUFF_LAYER_CHANGED: "BuffLayerChangedEvent",
		CONTROL_RESIST: "ControlResistEvent",
		DEATH_PREVENT: "DeathPreventEvent",
		CONTROLLED_SKIP: "ControlledSkipEvent",
		COMBAT_RESOURCE_CHANGE: "CombatResourceChangeEvent",
		ABILITY_COST_PAID: "AbilityCostPaidEvent",
		HP_CHANGED: "HpChangedEvent"
	},
	SCOPE: {
		OWNER_AS_TARGET: "owner_as_target",
		OWNER_AS_ACTOR: "owner_as_actor",
		OWNER_AS_CASTER: "owner_as_caster",
		GLOBAL: "global"
	}
};
/**
* 将 ElementType 中文字符映射到对应的运行时 Ability.Element.* 标签。
* 供 AbilityTagAssembler 与 affix 条件构造使用。
*/
var ELEMENT_TO_RUNTIME_ABILITY_TAG = {
	金: GameplayTags.ABILITY.ELEMENT.METAL,
	木: GameplayTags.ABILITY.ELEMENT.WOOD,
	水: GameplayTags.ABILITY.ELEMENT.WATER,
	火: GameplayTags.ABILITY.ELEMENT.FIRE,
	土: GameplayTags.ABILITY.ELEMENT.EARTH,
	风: GameplayTags.ABILITY.ELEMENT.WIND,
	雷: GameplayTags.ABILITY.ELEMENT.THUNDER,
	冰: GameplayTags.ABILITY.ELEMENT.ICE
};
GameplayTags.ABILITY.CHANNEL.MAGIC, GameplayTags.ABILITY.CHANNEL.PHYSICAL, GameplayTags.ABILITY.CHANNEL.TRUE;
CreationTags.MATERIAL.SEMANTIC_FLAME, CreationTags.MATERIAL.SEMANTIC_FREEZE, CreationTags.MATERIAL.SEMANTIC_THUNDER, CreationTags.MATERIAL.SEMANTIC_WIND, CreationTags.MATERIAL.SEMANTIC_BLADE, CreationTags.MATERIAL.SEMANTIC_GUARD, CreationTags.MATERIAL.SEMANTIC_BURST, CreationTags.MATERIAL.SEMANTIC_SUSTAIN, CreationTags.MATERIAL.SEMANTIC_MANUAL, CreationTags.MATERIAL.SEMANTIC_SPIRIT, CreationTags.MATERIAL.SEMANTIC_EARTH, CreationTags.MATERIAL.SEMANTIC_METAL, CreationTags.MATERIAL.SEMANTIC_WATER, CreationTags.MATERIAL.SEMANTIC_WOOD, CreationTags.MATERIAL.SEMANTIC_POISON, CreationTags.MATERIAL.SEMANTIC_DIVINE, CreationTags.MATERIAL.SEMANTIC_SPACE, CreationTags.MATERIAL.SEMANTIC_TIME, CreationTags.MATERIAL.SEMANTIC_LIFE, CreationTags.MATERIAL.SEMANTIC_ALCHEMY, CreationTags.MATERIAL.SEMANTIC_REFINING, CreationTags.MATERIAL.SEMANTIC_BEAST, CreationTags.MATERIAL.SEMANTIC_BLOOD, CreationTags.MATERIAL.SEMANTIC_BONE, CreationTags.MATERIAL.SEMANTIC_FORMATION, CreationTags.MATERIAL.SEMANTIC_ILLUSION, CreationTags.MATERIAL.SEMANTIC_QI, CreationTags.MATERIAL.TYPE_HERB, CreationTags.MATERIAL.TYPE_ORE, CreationTags.MATERIAL.TYPE_MONSTER, CreationTags.MATERIAL.TYPE_MANUAL, CreationTags.MATERIAL.TYPE_GONGFA_MANUAL, CreationTags.MATERIAL.TYPE_SKILL_MANUAL, CreationTags.MATERIAL.TYPE_SPECIAL, CreationTags.MATERIAL.TYPE_AUXILIARY;
//#endregion
//#region src/shared/engine/battle-v5/core/events.ts
var EventPriorityLevel = /* @__PURE__ */ function(EventPriorityLevel) {
	EventPriorityLevel[EventPriorityLevel["ACTION_TRIGGER"] = 80] = "ACTION_TRIGGER";
	EventPriorityLevel[EventPriorityLevel["SKILL_PRE_CAST"] = 75] = "SKILL_PRE_CAST";
	EventPriorityLevel[EventPriorityLevel["SKILL_CAST"] = 70] = "SKILL_CAST";
	EventPriorityLevel[EventPriorityLevel["HIT_CHECK"] = 65] = "HIT_CHECK";
	EventPriorityLevel[EventPriorityLevel["DAMAGE_REQUEST"] = 60] = "DAMAGE_REQUEST";
	EventPriorityLevel[EventPriorityLevel["DAMAGE_APPLY"] = 55] = "DAMAGE_APPLY";
	EventPriorityLevel[EventPriorityLevel["DAMAGE_TAKEN"] = 50] = "DAMAGE_TAKEN";
	EventPriorityLevel[EventPriorityLevel["ROUND_POST_RECOVERY"] = 46] = "ROUND_POST_RECOVERY";
	EventPriorityLevel[EventPriorityLevel["ROUND_PRE"] = 45] = "ROUND_PRE";
	EventPriorityLevel[EventPriorityLevel["ROUND_POST_DRAIN"] = 44] = "ROUND_POST_DRAIN";
	EventPriorityLevel[EventPriorityLevel["BUFF_INTERCEPT"] = 40] = "BUFF_INTERCEPT";
	EventPriorityLevel[EventPriorityLevel["TAG_CHANGE"] = 35] = "TAG_CHANGE";
	EventPriorityLevel[EventPriorityLevel["POST_SETTLE"] = 30] = "POST_SETTLE";
	EventPriorityLevel[EventPriorityLevel["COMBAT_LOG"] = 10] = "COMBAT_LOG";
	return EventPriorityLevel;
}({});
//#endregion
//#region src/shared/engine/battle-v5/core/types.ts
var AttributeType = /* @__PURE__ */ function(AttributeType) {
	AttributeType["VITALITY"] = "vitality";
	AttributeType["STRENGTH"] = "strength";
	AttributeType["SPIRIT"] = "spirit";
	AttributeType["ENDURANCE"] = "endurance";
	AttributeType["SPEED"] = "speed";
	AttributeType["WILLPOWER"] = "willpower";
	AttributeType["ATK"] = "atk";
	AttributeType["DEF"] = "def";
	AttributeType["MAGIC_ATK"] = "magicAtk";
	AttributeType["MAGIC_DEF"] = "magicDef";
	AttributeType["ACTION_SPEED"] = "actionSpeed";
	AttributeType["CRIT_RATE"] = "critRate";
	AttributeType["CRIT_DAMAGE_MULT"] = "critDamageMult";
	AttributeType["EVASION_RATE"] = "evasionRate";
	AttributeType["ACCURACY"] = "accuracy";
	AttributeType["CONTROL_HIT"] = "controlHit";
	AttributeType["CONTROL_RESISTANCE"] = "controlResistance";
	AttributeType["MAX_HP"] = "maxHp";
	AttributeType["MAX_MP"] = "maxMp";
	AttributeType["ARMOR_PENETRATION"] = "armorPenetration";
	AttributeType["MAGIC_PENETRATION"] = "magicPenetration";
	AttributeType["CRIT_RESIST"] = "critResist";
	AttributeType["CRIT_DAMAGE_REDUCTION"] = "critDamageReduction";
	AttributeType["HEAL_AMPLIFY"] = "healAmplify";
	AttributeType["HEAL_RECEIVED_REDUCTION"] = "healReceivedReduction";
	return AttributeType;
}({});
var ModifierType = /* @__PURE__ */ function(ModifierType) {
	ModifierType["BASE"] = "base";
	ModifierType["FIXED"] = "fixed";
	ModifierType["ADD"] = "add";
	/**
	* 累乘修正：每个 MULTIPLY modifier 的 value 作为独立乘数，最终结果为所有 value 连乘。
	*
	* 计算公式（来自 AttributeSet.getFinalValue）：
	*   `final *= modifiers.filter(MULTIPLY).reduce((p, m) => p * m.value, 1)`
	*
	* 用途示例：
	* - value = 1.5 → 提升 50%（×1.5）
	* - value = 0.7 → 降低 30%（×0.7）
	*
	* 与 ADD 的区别：ADD 是百分比加法（`final *= 1 + sum`），MULTIPLY 是独立乘法（累乘）。
	*/
	ModifierType["MULTIPLY"] = "multiply";
	ModifierType["FINAL"] = "final";
	ModifierType["OVERRIDE"] = "override";
	return ModifierType;
}({});
var AbilityType = /* @__PURE__ */ function(AbilityType) {
	AbilityType["ACTIVE_SKILL"] = "active_skill";
	AbilityType["PASSIVE_SKILL"] = "passive_skill";
	AbilityType["DESTINY"] = "destiny";
	return AbilityType;
}({});
var DamageType = /* @__PURE__ */ function(DamageType) {
	DamageType["PHYSICAL"] = "physical";
	DamageType["MAGICAL"] = "magical";
	DamageType["TRUE"] = "true";
	DamageType["DOT"] = "dot";
	return DamageType;
}({});
var DamageSource = /* @__PURE__ */ function(DamageSource) {
	DamageSource["DIRECT"] = "direct";
	DamageSource["REFLECT"] = "reflect";
	DamageSource["COUNTER"] = "counter";
	DamageSource["FOLLOW_UP"] = "follow_up";
	DamageSource["DELAYED"] = "delayed";
	return DamageSource;
}({});
var BuffType = /* @__PURE__ */ function(BuffType) {
	BuffType["BUFF"] = "buff";
	BuffType["DEBUFF"] = "debuff";
	BuffType["CONTROL"] = "control";
	return BuffType;
}({});
//#endregion
//#region src/shared/engine/battle-v5/core/runtimeState.ts
function getBattleRuntimeState(unit) {
	return unit.runtime.states.getUnitState(unit);
}
function markDeathProtectedHit(unit, hitId, damageSource) {
	getBattleRuntimeState(unit).deathProtectedHit = {
		hitId,
		damageSource
	};
}
function isDeathProtectedHit(unit, hitId, damageSource) {
	const protectedHit = getBattleRuntimeState(unit).deathProtectedHit;
	return protectedHit?.hitId === hitId && protectedHit.damageSource === damageSource;
}
function queueSkippedActions(unit, count, reason, name = "调息", sourceAbility) {
	const state = getBattleRuntimeState(unit);
	for (let i = 0; i < Math.max(0, Math.trunc(count)); i++) state.skippedActions.push({
		reason,
		name,
		sourceAbility
	});
}
function consumeSkippedAction(unit) {
	return getBattleRuntimeState(unit).skippedActions.shift();
}
function setQueuedAction(unit, ability, options = {}) {
	getBattleRuntimeState(unit).queuedAction = {
		ability,
		sourceAbility: options.sourceAbility,
		cancelEffects: options.cancelEffects ?? [],
		interruptPolicy: options.interruptPolicy ?? "normal",
		hitPolicy: options.hitPolicy ?? "normal"
	};
}
function peekQueuedAction(unit) {
	return getBattleRuntimeState(unit).queuedAction;
}
function consumeQueuedAction(unit) {
	const state = getBattleRuntimeState(unit);
	const queued = state.queuedAction;
	state.queuedAction = void 0;
	return queued;
}
function clearPendingActionStates(unit) {
	const state = getBattleRuntimeState(unit);
	state.skippedActions.length = 0;
	state.queuedAction = void 0;
}
function getActionStateViews(unit) {
	if (!unit.isAlive()) return [];
	const state = getBattleRuntimeState(unit);
	const views = [];
	if (state.skippedActions.length > 0) {
		const next = state.skippedActions[0];
		views.push({
			type: "rest",
			name: next.name,
			remainingActions: state.skippedActions.length,
			sourceAbility: next.sourceAbility
		});
	}
	if (state.queuedAction) views.push({
		type: "queued_action",
		name: "蓄势",
		remainingActions: 1,
		sourceAbility: state.queuedAction.sourceAbility,
		ability: {
			id: state.queuedAction.ability.slug,
			name: state.queuedAction.ability.name
		},
		interruptPolicy: state.queuedAction.interruptPolicy,
		hitPolicy: state.queuedAction.hitPolicy
	});
	for (const mode of state.abilityModes.values()) views.push({
		type: "ability_mode",
		name: mode.displayName,
		remainingActions: mode.remainingUses
	});
	return views;
}
function readAbilityMode(unit, key) {
	return getBattleRuntimeState(unit).abilityModes.get(key);
}
function setAbilityMode(unit, mode) {
	getBattleRuntimeState(unit).abilityModes.set(mode.key, { ...mode });
}
function advanceAbilityMode(unit, key, scope) {
	const state = getBattleRuntimeState(unit);
	const current = state.abilityModes.get(key);
	if (!current) return void 0;
	const next = {
		...current,
		remainingUses: Math.max(0, current.remainingUses - 1)
	};
	if (next.remainingUses <= 0) {
		state.abilityModes.delete(key);
		for (const buffId of next.cleanupBuffIds ?? []) unit.buffs.removeBuff(buffId, scope);
		return;
	}
	state.abilityModes.set(key, next);
	return next;
}
function clearAbilityMode(unit, key, scope) {
	const state = getBattleRuntimeState(unit);
	const mode = state.abilityModes.get(key);
	state.abilityModes.delete(key);
	for (const buffId of mode?.cleanupBuffIds ?? []) unit.buffs.removeBuff(buffId, scope);
}
function claimActionAmount(unit, key, requested, cap) {
	const state = getBattleRuntimeState(unit);
	const current = state.actionAmounts.get(key);
	const used = current?.action === state.actionSequence ? current.amount : 0;
	const applied = Math.max(0, Math.min(requested, cap - used));
	state.actionAmounts.set(key, {
		action: state.actionSequence,
		amount: used + applied
	});
	return applied;
}
function markBuffAppliedAtCurrentAction(unit, buff) {
	unit.runtime.states.setBuffAppliedAtAction(buff, getBattleRuntimeState(unit).actionSequence);
}
function shouldTickBuffDuration(unit, buff) {
	return unit.runtime.states.getBuffAppliedAtAction(buff) !== getBattleRuntimeState(unit).actionSequence;
}
function beginRuntimeAction(unit) {
	getBattleRuntimeState(unit).actionSequence += 1;
}
function setRuntimeRound(unit, round) {
	getBattleRuntimeState(unit).round = Math.max(0, Math.trunc(round));
}
function readRuntimeCounter(unit, key) {
	return getBattleRuntimeState(unit).counters.get(key) ?? 0;
}
function writeRuntimeCounter(unit, key, value) {
	const normalized = Number.isFinite(value) ? Math.trunc(value) : 0;
	if (normalized === 0) {
		getBattleRuntimeState(unit).counters.delete(key);
		return 0;
	}
	getBattleRuntimeState(unit).counters.set(key, normalized);
	return normalized;
}
function rememberAmount(unit, key, amount, maxStored = Number.POSITIVE_INFINITY) {
	const memory = getBattleRuntimeState(unit).memories.get(key) ?? {
		amount: 0,
		count: 0
	};
	const before = memory.amount;
	memory.amount = Math.min(maxStored, memory.amount + Math.max(0, amount));
	memory.count += 1;
	getBattleRuntimeState(unit).memories.set(key, memory);
	return {
		before,
		after: memory.amount
	};
}
function readMemory(unit, key) {
	return getBattleRuntimeState(unit).memories.get(key) ?? {
		amount: 0,
		count: 0
	};
}
function clearMemory(unit, key) {
	getBattleRuntimeState(unit).memories.delete(key);
}
function claimGlobalUniqueEffect(unit, key, source) {
	const claims = getBattleRuntimeState(unit).globalUniqueEffects;
	const current = claims.get(key);
	if (current && current !== source) return false;
	claims.set(key, source);
	return true;
}
function releaseGlobalUniqueEffects(unit, source) {
	const claims = getBattleRuntimeState(unit).globalUniqueEffects;
	for (const [key, owner] of claims.entries()) if (owner === source) claims.delete(key);
}
function beginRuntimeGuard(unit, key) {
	const guards = getBattleRuntimeState(unit).activeEffectGuards;
	if (guards.has(key)) return false;
	guards.add(key);
	return true;
}
function endRuntimeGuard(unit, key) {
	getBattleRuntimeState(unit).activeEffectGuards.delete(key);
}
function nextRuntimeSequence(unit, key) {
	const state = getBattleRuntimeState(unit);
	const next = (state.sequences.get(key) ?? 0) + 1;
	state.sequences.set(key, next);
	return next;
}
function addAbilityTransform(unit, transform) {
	const state = getBattleRuntimeState(unit);
	state.transforms = state.transforms.filter((item) => item.id !== transform.id);
	state.transforms.push(transform);
}
function markDamageDealt(unit) {
	if (!unit) return;
	getBattleRuntimeState(unit).dealtDamageSinceLastCheck = true;
}
function hasCommittedDeath(unit) {
	return getBattleRuntimeState(unit).deathCommitted;
}
function markDeathCommitted(unit) {
	getBattleRuntimeState(unit).deathCommitted = true;
}
function consumeDamageDealtFlag(unit) {
	const state = getBattleRuntimeState(unit);
	const dealt = state.dealtDamageSinceLastCheck;
	state.dealtDamageSinceLastCheck = false;
	return dealt;
}
function matchesAbilityTags(transform, ability) {
	if (!transform.appliesToTags || transform.appliesToTags.length === 0) return true;
	return ability.tags.hasAnyTag(transform.appliesToTags);
}
function peekAbilityTransform(unit, ability) {
	if (!ability) return void 0;
	return getBattleRuntimeState(unit).transforms.find((transform) => matchesAbilityTags(transform, ability));
}
function consumeAbilityTransform(unit, ability) {
	const state = getBattleRuntimeState(unit);
	const index = state.transforms.findIndex((transform) => ability && matchesAbilityTags(transform, ability));
	if (index < 0) return void 0;
	const transform = state.transforms[index];
	transform.remainingTriggers -= 1;
	if (transform.remainingTriggers <= 0) state.transforms.splice(index, 1);
	return transform;
}
function beginAbilityTransform(unit, ability) {
	ability.bindRuntime(unit.runtime);
	const transform = consumeAbilityTransform(unit, ability);
	if (transform) unit.runtime.states.setActiveAbilityTransform(ability, transform);
	return transform;
}
function getActiveAbilityTransform(ability) {
	const runtime = ability?.getRuntime();
	return ability && runtime ? runtime.states.getActiveAbilityTransform(ability) : void 0;
}
function endAbilityTransform(ability) {
	ability.getRuntime()?.states.deleteActiveAbilityTransform(ability);
}
function setDelayedBuffEffects(buff, effects) {
	const owner = buff.getOwner();
	if (!owner) throw new Error(`Buff ${buff.id} must be owned before setup`);
	owner.runtime.states.setDelayedBuffEffects(buff, effects);
}
function getDelayedBuffEffects(buff) {
	return buff.getOwner()?.runtime.states.getDelayedBuffEffects(buff);
}
function rememberRemovedBuff(unit, buff) {
	const state = getBattleRuntimeState(unit);
	state.removedBuffs.unshift(buff.clone());
	state.removedBuffs = state.removedBuffs.slice(0, 5);
}
function readRecentRemovedBuff(unit, predicate) {
	return getBattleRuntimeState(unit).removedBuffs.find(predicate);
}
function exportBattleRuntimeState(unit) {
	const state = getBattleRuntimeState(unit);
	if (state.activeEffectGuards.size > 0) throw new Error("Checkpoint requires a quiescent effect boundary");
	return {
		memories: [...state.memories].map(([key, value]) => [key, { ...value }]),
		transforms: state.transforms.map((transform) => ({ ...transform })),
		counters: [...state.counters],
		deathPreventTriggers: [...state.deathPreventTriggers],
		deathCommitted: state.deathCommitted,
		sequences: [...state.sequences],
		dealtDamageSinceLastCheck: state.dealtDamageSinceLastCheck,
		actionSequence: state.actionSequence,
		round: state.round,
		triggerLedger: [...state.triggerLedger].map(([key, value]) => [key, { ...value }]),
		skippedActions: state.skippedActions.map((action) => ({ ...action })),
		queuedAction: state.queuedAction ? {
			...state.queuedAction,
			ability: { ...state.queuedAction.ability },
			cancelEffects: state.queuedAction.cancelEffects.map((effect) => ({ ...effect }))
		} : void 0,
		abilityModes: [...state.abilityModes].map(([key, value]) => [key, {
			...value,
			cleanupBuffIds: value.cleanupBuffIds?.slice()
		}]),
		actionAmounts: [...state.actionAmounts].map(([key, value]) => [key, { ...value }])
	};
}
function restoreBattleRuntimeState(unit, snapshot) {
	const state = getBattleRuntimeState(unit);
	state.memories = new Map(snapshot.memories.map(([key, value]) => [key, { ...value }]));
	state.transforms = snapshot.transforms.map((transform) => ({ ...transform }));
	state.counters = new Map(snapshot.counters);
	state.activeEffectGuards.clear();
	state.deathPreventTriggers = new Set(snapshot.deathPreventTriggers);
	state.deathProtectedHit = void 0;
	state.deathCommitted = snapshot.deathCommitted ?? false;
	state.sequences = new Map(snapshot.sequences);
	state.dealtDamageSinceLastCheck = snapshot.dealtDamageSinceLastCheck;
	state.actionSequence = snapshot.actionSequence;
	state.round = snapshot.round;
	state.triggerLedger = new Map(snapshot.triggerLedger.map(([key, value]) => [key, { ...value }]));
	state.damageSegmentCounters = /* @__PURE__ */ new Map();
	state.skippedActions = snapshot.skippedActions.map((action) => ({ ...action }));
	state.queuedAction = snapshot.queuedAction ? {
		...snapshot.queuedAction,
		ability: { ...snapshot.queuedAction.ability },
		cancelEffects: snapshot.queuedAction.cancelEffects.map((effect) => ({ ...effect }))
	} : void 0;
	state.abilityModes = new Map(snapshot.abilityModes.map(([key, value]) => [key, {
		...value,
		cleanupBuffIds: value.cleanupBuffIds?.slice()
	}]));
	state.actionAmounts = new Map(snapshot.actionAmounts.map(([key, value]) => [key, { ...value }]));
}
//#endregion
//#region src/shared/engine/battle-v5/core/conditionEvaluator.ts
function getScopedUnit(context, scope) {
	if (scope === "caster") return context.caster;
	return context.target;
}
function getAbilityTagsFromTriggerEvent(triggerEvent) {
	if (!triggerEvent || typeof triggerEvent !== "object") return;
	return triggerEvent.ability?.tags;
}
function getAbilityTags(context) {
	return getAbilityTagsFromTriggerEvent(context.triggerEvent) ?? context.ability?.tags;
}
function sourceHasTag(context, tag) {
	if (getAbilityTags(context)?.hasTag(tag)) return true;
	return (context.triggerEvent && typeof context.triggerEvent === "object" ? context.triggerEvent.buff : void 0)?.tags.hasTag(tag) ?? context.buff?.tags.hasTag(tag) ?? false;
}
function getAbilityMpCost(context) {
	const ability = (() => {
		if (context.triggerEvent && typeof context.triggerEvent === "object" && "ability" in context.triggerEvent) return context.triggerEvent.ability;
		return context.ability;
	})();
	if (!ability || typeof ability !== "object") return 0;
	const abilityLike = ability;
	if (typeof abilityLike.manaCost === "number") return Math.max(0, abilityLike.manaCost);
	if (Array.isArray(abilityLike.resourceCosts)) {
		const mpCost = abilityLike.resourceCosts.find((cost) => !!cost && typeof cost === "object" && cost.type === "mp" && typeof cost.amount === "number");
		return Math.max(0, mpCost?.amount ?? 0);
	}
	return 0;
}
function getDamageTypeFromTriggerEvent(triggerEvent) {
	if (!triggerEvent || typeof triggerEvent !== "object") return void 0;
	return triggerEvent.damageType;
}
function getShieldAbsorbedFromTriggerEvent(triggerEvent) {
	if (!triggerEvent || typeof triggerEvent !== "object") return void 0;
	return triggerEvent.shieldAbsorbed;
}
function getIsCriticalFromTriggerEvent(triggerEvent) {
	if (!triggerEvent || typeof triggerEvent !== "object") return false;
	return triggerEvent.isCritical === true;
}
function getIsLethalFromTriggerEvent(triggerEvent) {
	if (!triggerEvent || typeof triggerEvent !== "object") return false;
	return triggerEvent.hpReachedZeroBeforeReactions === true;
}
function countBuffs(unit, predicate, countsAsStatusOnly = true) {
	if (!unit?.buffs) return 0;
	return unit.buffs.getAllBuffs().filter((buff) => !countsAsStatusOnly || buff.countsAsStatus).filter(predicate).length;
}
function evaluateCondition(context, cond) {
	const scopedUnit = getScopedUnit(context, cond.params.scope);
	const threshold = cond.params.value ?? 0;
	const snapshotHpRatio = (() => {
		if (cond.params.timing !== "cast" || !context.castSnapshot) return void 0;
		return cond.params.scope === "caster" ? context.castSnapshot.casterHpRatioAfterCost : context.castSnapshot.targetHpRatioBeforeEffects;
	})();
	switch (cond.type) {
		case "has_tag": return cond.params.tag ? scopedUnit?.tags.hasTag(cond.params.tag) ?? false : true;
		case "has_not_tag": return cond.params.tag ? !(scopedUnit?.tags.hasTag(cond.params.tag) ?? false) : true;
		case "has_tag_on": {
			const unit = getScopedUnit(context, cond.params.scope);
			if (!unit || !cond.params.tag) return false;
			return unit.tags.hasTag(cond.params.tag);
		}
		case "ability_has_tag": {
			const abilityTags = getAbilityTags(context);
			if (!abilityTags || !cond.params.tag) return false;
			return abilityTags.hasTag(cond.params.tag);
		}
		case "ability_has_any_tag": {
			const abilityTags = getAbilityTags(context);
			const tags = cond.params.tags ?? [];
			return !!abilityTags && tags.some((tag) => abilityTags.hasTag(tag));
		}
		case "ability_has_exact_tag": {
			const abilityTags = getAbilityTags(context);
			if (!abilityTags || !cond.params.tag) return false;
			return abilityTags.getTags().includes(cond.params.tag);
		}
		case "ability_has_not_tag": {
			const abilityTags = getAbilityTags(context);
			if (!cond.params.tag) return true;
			if (!abilityTags) return true;
			return !abilityTags.hasTag(cond.params.tag);
		}
		case "source_has_tag": return cond.params.tag ? sourceHasTag(context, cond.params.tag) : false;
		case "hp_above": return snapshotHpRatio !== void 0 ? snapshotHpRatio > threshold : !!scopedUnit && scopedUnit.getCurrentHp() / scopedUnit.getMaxHp() > threshold;
		case "hp_below": return snapshotHpRatio !== void 0 ? snapshotHpRatio < threshold : !!scopedUnit && scopedUnit.getCurrentHp() / scopedUnit.getMaxHp() < threshold;
		case "mp_above": return !!scopedUnit && scopedUnit.getCurrentMp() / scopedUnit.getMaxMp() > threshold;
		case "mp_below": return !!scopedUnit && scopedUnit.getCurrentMp() / scopedUnit.getMaxMp() < threshold;
		case "ability_mp_cost_at_least": return getAbilityMpCost(context) >= threshold;
		case "has_shield": return !!scopedUnit && scopedUnit.getCurrentShield() > threshold;
		case "buff_count_at_least": return countBuffs(scopedUnit, (buff) => buff.type === BuffType.BUFF) >= threshold;
		case "buff_layer_at_least": return countBuffs(scopedUnit, (buff) => (cond.params.id ? buff.id === cond.params.id : true) && (cond.params.tag ? buff.tags.hasTag(cond.params.tag) : true) && buff.getLayer() >= threshold, false) >= 1;
		case "buff_layer_below": return countBuffs(scopedUnit, (buff) => (cond.params.id ? buff.id === cond.params.id : true) && (cond.params.tag ? buff.tags.hasTag(cond.params.tag) : true) && buff.getLayer() >= threshold, false) === 0;
		case "debuff_count_at_least": return countBuffs(scopedUnit, (buff) => buff.type === BuffType.DEBUFF || buff.type === BuffType.CONTROL) >= threshold;
		case "damage_type_is": {
			const expected = cond.params.damageType;
			if (!expected) return false;
			return getDamageTypeFromTriggerEvent(context.triggerEvent) === expected;
		}
		case "damage_source_is": return context.triggerEvent?.damageSource === cond.params.damageSource;
		case "shield_absorbed_at_least": return (getShieldAbsorbedFromTriggerEvent(context.triggerEvent) ?? 0) >= threshold;
		case "damage_taken_at_least": return (context.triggerEvent?.damageTaken ?? 0) >= threshold;
		case "resource_compare": {
			const left = getScopedUnit(context, cond.params.left);
			const right = getScopedUnit(context, cond.params.right);
			if (!left || !right) return false;
			const resource = cond.params.resource ?? "mp";
			const leftValue = resource === "hp" ? left.getCurrentHp() : left.getCurrentMp();
			const rightValue = resource === "hp" ? right.getCurrentHp() : right.getCurrentMp();
			switch (cond.params.op ?? "gt") {
				case "gte": return leftValue >= rightValue;
				case "lt": return leftValue < rightValue;
				case "lte": return leftValue <= rightValue;
				default: return leftValue > rightValue;
			}
		}
		case "attribute_compare": {
			const left = getScopedUnit(context, cond.params.left);
			const right = getScopedUnit(context, cond.params.right);
			if (!left || !right || !cond.params.attribute) return false;
			const leftValue = left.attributes.getValue(cond.params.attribute);
			const rightValue = right.attributes.getValue(cond.params.attribute);
			switch (cond.params.op ?? "gt") {
				case "gte": return leftValue >= rightValue;
				case "lt": return leftValue < rightValue;
				case "lte": return leftValue <= rightValue;
				default: return leftValue > rightValue;
			}
		}
		case "combat_resource_at_least": return !!(scopedUnit && cond.params.resourceId && scopedUnit.combatResources.getCurrent(cond.params.resourceId) >= threshold);
		case "combat_resource_below": return !!(scopedUnit && cond.params.resourceId && scopedUnit.combatResources.getCurrent(cond.params.resourceId) < threshold);
		case "runtime_counter_compare": {
			if (!scopedUnit || !cond.params.key) return false;
			const value = readRuntimeCounter(scopedUnit, cond.params.key);
			switch (cond.params.op ?? "gte") {
				case "gt": return value > threshold;
				case "lt": return value < threshold;
				case "lte": return value <= threshold;
				default: return value >= threshold;
			}
		}
		case "ability_mode_is": {
			if (!scopedUnit || !cond.params.key || !cond.params.mode) return false;
			const mode = readAbilityMode(scopedUnit, cond.params.key);
			if (cond.params.mode === "none") return mode === void 0;
			return mode?.mode === cond.params.mode && (cond.params.remainingUses === void 0 || mode.remainingUses === cond.params.remainingUses);
		}
		case "ability_cost_crossed": {
			const event = context.triggerEvent;
			const ratio = cond.params.value;
			return event?.type === "AbilityCostPaidEvent" && ratio !== void 0 && (event.beforeHpRatio ?? -1) >= ratio && (event.afterHpRatio ?? 1) < ratio;
		}
		case "combat_resource_change": {
			const event = context.triggerEvent;
			if (event?.type !== "CombatResourceChangeEvent") return false;
			if (cond.params.resourceId && event.resourceId !== cond.params.resourceId) return false;
			if (cond.params.operation && event.operation !== cond.params.operation) return false;
			const value = event[cond.params.eventField === "requested" || cond.params.eventField === "overflow" ? cond.params.eventField : "applied"] ?? 0;
			switch (cond.params.op ?? "gte") {
				case "gt": return value > threshold;
				case "lt": return value < threshold;
				case "lte": return value <= threshold;
				default: return value >= threshold;
			}
		}
		case "buff_layer_change": {
			const event = context.triggerEvent;
			if (event?.type !== "BuffLayerChangedEvent" || !event.buff) return false;
			if (cond.params.id && event.buff.id !== cond.params.id) return false;
			if (cond.params.tag && !event.buff.tags.hasTag(cond.params.tag)) return false;
			if (cond.params.reason && event.reason !== cond.params.reason) return false;
			const field = cond.params.eventField ?? "delta";
			if (field !== "previousLayer" && field !== "currentLayer" && field !== "delta") return false;
			const value = event[field] ?? 0;
			switch (cond.params.op ?? "gte") {
				case "gt": return value > threshold;
				case "lt": return value < threshold;
				case "lte": return value <= threshold;
				default: return value >= threshold;
			}
		}
		case "buff_removed_reason_is": {
			const event = context.triggerEvent;
			if (event?.type !== "BuffRemovedEvent" || !event.buff) return false;
			if (cond.params.id && event.buff.id !== cond.params.id) return false;
			if (cond.params.tag && !event.buff.tags.hasTag(cond.params.tag)) return false;
			return !cond.params.reason || event.reason === cond.params.reason;
		}
		case "chance": return context.caster.runtime.random.next() < threshold;
		case "is_critical": return getIsCriticalFromTriggerEvent(context.triggerEvent);
		case "is_hit": return context.triggerEvent?.isHit === true;
		case "is_lethal": return getIsLethalFromTriggerEvent(context.triggerEvent);
		default: return true;
	}
}
function checkConditions(context, conditions) {
	for (const cond of conditions) if (!evaluateCondition(context, cond)) return false;
	return true;
}
//#endregion
//#region src/shared/engine/battle-v5/abilities/Ability.ts
/**
* Ability 基类 - 遵循 GAS 设计原则
*
* 职责：
* - 定义能力的核心接口（canTrigger, execute）
* - 管理标签系统（用于条件判断和解耦）
* - 提供事件订阅辅助方法
*
* 生命周期：
* 1. 创建 → constructor()
* 2. 绑定所有者 → setOwner()
* 3. 激活 → setActive(true) → 调用 onActivate()
* 4. 执行 → canTrigger() 检查 → execute() 执行
* 5. 停用 → setActive(false) → 调用 onDeactivate()
* 6. 销毁 → destroy()
*
* 子类职责：
* - ActiveSkill: 添加冷却、消耗、目标策略
* - PassiveAbility: 订阅事件，响应触发
*/
var Ability = class Ability {
	id;
	_baseName;
	_baseDescription;
	type;
	_owner = null;
	_runtime = null;
	_serializableConfig;
	_active = false;
	_priority = 0;
	tags;
	_eventSubscriptions = [];
	constructor(id, name, type, description) {
		this.id = id;
		this._baseName = name;
		this._baseDescription = description;
		this.type = type;
		this.tags = new GameplayTagContainer();
	}
	get name() {
		return this._baseName;
	}
	get description() {
		return this._baseDescription;
	}
	get runtimePlanId() {}
	prepareCast(_context) {}
	cancelPreparedCast() {}
	setOwner(owner) {
		this._owner = owner;
		this._runtime = owner.runtime;
	}
	getOwner() {
		return this._owner;
	}
	bindRuntime(runtime) {
		this._runtime = runtime;
	}
	getRuntime() {
		return this._runtime;
	}
	setSerializableConfig(config) {
		this._serializableConfig = config;
	}
	getSerializableConfig() {
		return this._serializableConfig;
	}
	setActive(active) {
		if (this._active === active) return;
		this._active = active;
		if (active) this.onActivate();
		else this.onDeactivate();
	}
	isActive() {
		return this._active;
	}
	/**
	* 激活时调用
	* 子类可重写此方法进行初始化（如订阅事件）
	*/
	onActivate() {}
	/**
	* 停用时调用
	* 子类可重写此方法进行清理（如取消订阅）
	* 注意：基类会自动取消所有通过 subscribeEvent 订阅的事件
	*/
	onDeactivate() {
		for (const subscription of this._eventSubscriptions) this._eventBus.unsubscribe(subscription.eventType, subscription.handler);
		this._eventSubscriptions = [];
	}
	/**
	* 订阅事件（会在停用时自动取消）
	*/
	subscribeEvent(eventType, handler, priority) {
		this._eventBus.subscribe(eventType, handler, priority);
		this._eventSubscriptions.push({
			eventType,
			handler
		});
	}
	get _eventBus() {
		const runtime = this._owner?.runtime ?? this._runtime;
		if (!runtime) throw new Error(`Ability ${this.id} must have an owner`);
		return runtime.events;
	}
	/**
	* 检查是否可以触发
	* @param context 包含 caster 和 target 的上下文
	* @returns 是否可以执行
	*/
	canTrigger(context) {
		return this._owner !== null;
	}
	/**
	* 执行能力效果
	* @param context 包含 caster 和 target 的上下文
	*/
	execute(_context) {}
	get priority() {
		return this._priority;
	}
	setPriority(value) {
		this._priority = value;
	}
	/**
	* 克隆能力实例
	* 注意：不复制 owner 和 active 状态
	*/
	clone() {
		const cloned = new Ability(this.id, this.name, this.type, this.description);
		cloned._priority = this._priority;
		cloned.tags.addTags(this.tags.getTags());
		return cloned;
	}
	/**
	* 销毁能力，释放资源
	*/
	destroy() {
		this.setActive(false);
		this._owner = null;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/abilities/TargetPolicy.ts
/**
* 目标策略类
* 定义技能如何选择目标
*/
var TargetPolicy = class TargetPolicy {
	team;
	scope;
	filters;
	maxTargets;
	constructor(config) {
		this.team = config.team;
		this.scope = config.scope;
		this.filters = config.filters ?? [];
		this.maxTargets = config.maxTargets ?? 1;
	}
	/**
	* 默认目标策略：单体敌方
	*/
	static default() {
		return new TargetPolicy({
			team: "enemy",
			scope: "single"
		});
	}
	/**
	* 自身目标策略
	*/
	static self() {
		return new TargetPolicy({
			team: "self",
			scope: "single"
		});
	}
	/**
	* AOE 敌方策略
	*/
	static aoeEnemy(maxTargets = 5) {
		return new TargetPolicy({
			team: "enemy",
			scope: "aoe",
			maxTargets
		});
	}
};
//#endregion
//#region src/shared/engine/battle-v5/abilities/ActiveSkill.ts
/**
* 主动技能基类
*
* 职责：
* - 管理冷却时间
* - 管理资源消耗
* - 定义目标策略
*/
var ActiveSkill = class extends Ability {
	_resolution;
	_cooldown = 0;
	_maxCooldown = 0;
	_targetPolicy;
	_selectionProfile;
	_castConditions;
	_hitPolicy;
	constructor(id, name, config = {}) {
		super(id, name, AbilityType.ACTIVE_SKILL, config.description);
		this._maxCooldown = this.normalizeCooldownValue(config.cooldown ?? 0);
		if (config.costs?.length) this._costConfigs = config.costs.map((cost) => ({ ...cost }));
		else {
			if (config.mpCost) this._costConfigs.push({
				resource: "mp",
				mode: "flat",
				amount: config.mpCost
			});
			if (config.hpCost) this._costConfigs.push({
				resource: "hp",
				mode: "flat",
				amount: config.hpCost
			});
		}
		if (config.priority !== void 0) this.setPriority(config.priority);
		this._targetPolicy = config.targetPolicy ?? TargetPolicy.default();
		this._selectionProfile = config.selectionProfile;
		this._castConditions = config.castConditions ?? [];
		this._hitPolicy = config.hitPolicy ?? "normal";
	}
	_costConfigs = [];
	_castSnapshot;
	get targetPolicy() {
		return this._targetPolicy;
	}
	get selectionProfile() {
		return this._selectionProfile;
	}
	get castConditions() {
		return this._castConditions;
	}
	get hitPolicy() {
		return this._hitPolicy;
	}
	getCostConfigs(_caster) {
		return this._costConfigs;
	}
	get maxCooldown() {
		return this._maxCooldown;
	}
	get currentCooldown() {
		return this._cooldown;
	}
	isReady() {
		return this._cooldown <= 0;
	}
	startCooldown() {
		this._cooldown = this._maxCooldown;
	}
	tickCooldown() {
		if (this._cooldown > 0) this._cooldown = Math.max(0, this._cooldown - 1);
	}
	/**
	* 修改当前冷却时间
	* @param delta 变化量，正数为增加，负数为减少
	*/
	modifyCooldown(delta) {
		this._cooldown = Math.max(0, this._cooldown + this.normalizeCooldownValue(delta));
	}
	resetCooldown() {
		this._cooldown = 0;
	}
	get resourceCosts() {
		if (this._castSnapshot) return this._castSnapshot.costs.map((cost) => ({ ...cost }));
		const owner = this.getOwner();
		if (owner) return this.resolveCosts(owner);
		return this._costConfigs.flatMap((cost) => cost.mode === "flat" ? [{
			type: cost.resource,
			amount: Math.max(0, Math.ceil(cost.amount)),
			mode: cost.mode
		}] : []);
	}
	get costConfigs() {
		const owner = this.getOwner();
		return (owner ? this.getCostConfigs(owner) : this._costConfigs).map((cost) => ({ ...cost }));
	}
	get manaCost() {
		return this.resourceCosts.find((c) => c.type === "mp")?.amount ?? 0;
	}
	/**
	* 检查是否有足够资源
	*/
	hasEnoughResources(caster) {
		const transform = peekAbilityTransform(caster, this);
		let hpRequired = 0;
		let hpRetain = 0;
		let mpRequired = 0;
		for (const cost of this._castSnapshot?.costs ?? this.resolveCosts(caster)) switch (cost.type) {
			case "mp":
				if (transform?.freeManaCost) break;
				if (transform?.mpCostToHp) {
					hpRequired += cost.amount;
					hpRetain = Math.max(hpRetain, cost.retain ?? 1);
					break;
				}
				mpRequired += cost.amount;
				break;
			case "hp":
				hpRequired += cost.amount;
				hpRetain = Math.max(hpRetain, cost.retain ?? 1);
		}
		return caster.getCurrentMp() >= mpRequired && caster.getCurrentHp() - hpRequired >= hpRetain;
	}
	/**
	* 消耗资源
	*/
	consumeResources(caster) {
		const transform = peekAbilityTransform(caster, this);
		const costs = this._castSnapshot?.costs ?? this.resolveCosts(caster);
		const beforeHp = caster.getCurrentHp();
		const beforeMp = caster.getCurrentMp();
		let hpPaid = 0;
		let mpPaid = 0;
		for (const cost of costs) switch (cost.type) {
			case "mp":
				if (transform?.freeManaCost) break;
				if (transform?.mpCostToHp) hpPaid += cost.amount;
				else mpPaid += cost.amount;
				break;
			case "hp": hpPaid += cost.amount;
		}
		const payment = Object.freeze({
			beforeHp,
			afterHp: Math.max(0, beforeHp - hpPaid),
			beforeMp,
			afterMp: Math.max(0, beforeMp - mpPaid)
		});
		if (mpPaid > 0) caster.consumeMp(mpPaid);
		if (hpPaid > 0) caster.setHp(payment.afterHp, "ability_cost");
		return payment;
	}
	resolveCosts(caster) {
		return this.getCostConfigs(caster).filter((cost) => !cost.conditions?.length || checkConditions({
			caster,
			target: caster,
			ability: this
		}, cost.conditions)).map((cost) => {
			if (cost.mode === "flat") return {
				type: cost.resource,
				amount: Math.max(0, Math.ceil(cost.amount)),
				mode: cost.mode,
				retain: cost.retain
			};
			return {
				type: "hp",
				amount: Math.max(cost.minimum ?? 1, Math.ceil(caster.getCurrentHp() * cost.ratio)),
				mode: cost.mode,
				retain: cost.retain ?? 1
			};
		});
	}
	/**
	* 检查是否可以触发
	* 包含冷却检查和资源检查
	*/
	canTrigger(context) {
		if (!super.canTrigger(context)) return false;
		if (!this.isReady()) return false;
		const caster = this.getOwner();
		if (!caster) return false;
		if (!this.hasEnoughResources(caster)) return false;
		if (this.castConditions.length > 0 && !checkConditions({
			caster,
			target: context.target,
			ability: this
		}, this.castConditions)) return false;
		return true;
	}
	prepareCast(context) {
		const costs = this.resolveCosts(context.caster);
		const casterHp = context.caster.getCurrentHp();
		const casterMp = context.caster.getCurrentMp();
		const targetHp = context.target.getCurrentHp();
		this._castSnapshot = Object.freeze({
			planId: this.runtimePlanId,
			target: context.target,
			targetId: context.target.id,
			selectionProfile: this.selectionProfile,
			costs: Object.freeze(costs.map((cost) => Object.freeze({ ...cost }))),
			casterHpBeforeCost: casterHp,
			casterHpAfterCost: casterHp,
			casterHpRatioAfterCost: context.caster.getMaxHp() > 0 ? casterHp / context.caster.getMaxHp() : 0,
			casterMpBeforeCost: casterMp,
			casterMpAfterCost: casterMp,
			targetHpBeforeEffects: targetHp,
			targetHpRatioBeforeEffects: context.target.getMaxHp() > 0 ? targetHp / context.target.getMaxHp() : 0
		});
	}
	cancelPreparedCast() {
		this._castSnapshot = void 0;
	}
	get preparedTarget() {
		return this._castSnapshot?.target;
	}
	canExecutePreparedCast(caster) {
		return this.hasEnoughResources(caster);
	}
	get castSnapshot() {
		return this._castSnapshot;
	}
	/**
	* 执行技能
	* 负责资源消耗、冷却启动、效果执行
	*/
	execute(context) {
		this.executeMultiple(context.caster, [{
			target: context.target,
			shouldApplyEffects: context.shouldApplyEffects !== false
		}], context.resolution);
	}
	executeMultiple(caster, targets, resolution) {
		const primary = targets[0];
		if (!primary) return;
		const targetSnapshots = targets.map(({ target }) => ({
			target,
			hp: target.getCurrentHp(),
			hpRatio: target.getMaxHp() > 0 ? target.getCurrentHp() / target.getMaxHp() : 0
		}));
		const context = {
			caster,
			target: primary.target,
			resolution
		};
		this._resolution = resolution ?? primary.resolution;
		if (!this._resolution) throw new Error(`Active skill ${this.id} requires an explicit combat resolution`);
		if (!this._castSnapshot) this.prepareCast(context);
		if (!this.canExecutePreparedCast(caster)) {
			this.cancelPreparedCast();
			return;
		}
		const target = this._castSnapshot?.target ?? primary.target;
		const payment = this.consumeResources(caster);
		const beforeRatio = caster.getMaxHp() > 0 ? payment.beforeHp / caster.getMaxHp() : 0;
		const afterRatio = caster.getMaxHp() > 0 ? payment.afterHp / caster.getMaxHp() : 0;
		this._castSnapshot = Object.freeze({
			...this._castSnapshot,
			casterHpBeforeCost: payment.beforeHp,
			casterHpAfterCost: payment.afterHp,
			casterHpRatioAfterCost: afterRatio,
			casterMpBeforeCost: payment.beforeMp,
			casterMpAfterCost: payment.afterMp
		});
		const eventBus = caster.runtime.events;
		const costPaidEvent = eventBus.publish({
			type: "AbilityCostPaidEvent",
			timestamp: caster.runtime.clock.now(),
			caster,
			ability: this,
			beforeHp: payment.beforeHp,
			afterHp: payment.afterHp,
			beforeMp: payment.beforeMp,
			afterMp: payment.afterMp,
			hpPaid: payment.beforeHp - payment.afterHp,
			mpPaid: payment.beforeMp - payment.afterMp,
			beforeHpRatio: beforeRatio,
			afterHpRatio: afterRatio
		});
		eventBus.runInCausalContext({
			origin: costPaidEvent.origin,
			trace: costPaidEvent.trace
		}, () => this.executePaidCastMultiple(caster, target, targets, targetSnapshots));
	}
	executePaidCastMultiple(caster, primaryTarget, targets, targetSnapshots) {
		this.startCooldown();
		const transform = peekAbilityTransform(caster, this);
		if (transform?.cooldownModify) this.modifyCooldown(transform.cooldownModify);
		const activeTransform = beginAbilityTransform(caster, this);
		try {
			this.executeCastEffects(caster, primaryTarget);
			for (const [index, entry] of targets.entries()) {
				if (!caster.isAlive()) break;
				if (!entry.shouldApplyEffects || !entry.target.isAlive()) continue;
				const target = entry.target;
				this._resolution = entry.resolution ?? this._resolution;
				if (index > 0) {
					const snapshot = targetSnapshots[index];
					this._castSnapshot = Object.freeze({
						...this._castSnapshot,
						target,
						targetId: target.id,
						targetHpBeforeEffects: snapshot.hp,
						targetHpRatioBeforeEffects: snapshot.hpRatio
					});
				}
				this.executeSkill(caster, target);
			}
		} finally {
			if (activeTransform) endAbilityTransform(this);
			this.onCastFinished();
			this._castSnapshot = void 0;
			this._resolution = void 0;
		}
	}
	onCastFinished() {}
	get resolution() {
		return this._resolution;
	}
	executeCastEffects(_caster, _target) {}
	normalizeCooldownValue(value) {
		if (!Number.isFinite(value)) return 0;
		return Math.round(value);
	}
	clone() {
		const cloned = super.clone();
		cloned._maxCooldown = this._maxCooldown;
		cloned._costConfigs = this._costConfigs.map((cost) => ({ ...cost }));
		cloned._castSnapshot = void 0;
		return cloned;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/v3/events.ts
var CombatV3EventType = { RESULT_COMMITTED: "CombatResultCommittedEventV3" };
//#endregion
//#region src/shared/engine/battle-v5/v3/origin.ts
var CombatSystemSourceV3 = {
	ACTION_FLOW: {
		kind: "system",
		id: "action_flow",
		name: "行动流程"
	},
	RESOURCE_DECAY: {
		kind: "system",
		id: "resource_decay",
		name: "资源衰减"
	}
};
var CombatAttributionV3 = class CombatAttributionV3 {
	owner;
	origin;
	constructor(owner, origin) {
		this.owner = owner;
		this.origin = freezeCombatOriginV3(origin);
		Object.freeze(this);
	}
	static owned(owner, carrier) {
		if (!carrier.id || !carrier.name) throw new Error("Owned combat attribution has an incomplete carrier");
		return new CombatAttributionV3(owner, {
			kind: "owned",
			owner: {
				id: owner.id,
				name: owner.name
			},
			carrier: Object.freeze({ ...carrier })
		});
	}
	static fromAbility(owner, ability) {
		return CombatAttributionV3.owned(owner, combatCarrierFromAbilityV3(ability));
	}
	static system(owner, source) {
		return new CombatAttributionV3(owner, {
			kind: "system",
			carrier: source
		});
	}
	static rebind(owner, origin) {
		if (origin.kind === "owned" && origin.owner.id !== owner.id) throw new Error(`Combat attribution owner mismatch: ${owner.id} !== ${origin.owner.id}`);
		return new CombatAttributionV3(owner, origin);
	}
};
function freezeCombatOriginV3(origin) {
	if (origin.kind === "system") return Object.freeze({
		kind: "system",
		carrier: Object.freeze({ ...origin.carrier })
	});
	return Object.freeze({
		kind: "owned",
		owner: Object.freeze({ ...origin.owner }),
		carrier: Object.freeze({ ...origin.carrier })
	});
}
function combatCarrierFromAbilityV3(ability) {
	return {
		kind: ability.tags.hasTag(GameplayTags.ABILITY.KIND.ARTIFACT) ? "equipment" : ability.tags.hasTag(GameplayTags.ABILITY.KIND.GONGFA) ? "gongfa" : "ability",
		id: ability.id,
		name: ability.name
	};
}
function combatAttributionFromBuffV3(buff) {
	const attribution = buff.getCombatAttributionV3();
	if (!attribution) throw new Error(`Buff ${buff.id} has no CombatAttributionV3`);
	return attribution;
}
//#endregion
//#region src/shared/engine/battle-v5/v3/CombatResultEmitterV3.ts
var CombatResultEmitterV3 = class {
	eventBus;
	constructor(eventBus) {
		this.eventBus = eventBus;
	}
	commit(target, result, scope) {
		const origin = scope?.origin;
		const parentTrace = scope?.parentTrace;
		if (!origin) throw new Error(`Combat result ${result.type} has no origin`);
		if (!parentTrace) throw new Error(`Combat result ${result.type} has no parent trace`);
		if (scope.reservedTrace?.eventId === parentTrace.eventId) throw new Error(`Combat result ${result.type} cannot be its own parent`);
		const immutableOrigin = freezeCombatOriginV3(origin);
		const immutableResult = freezeResult(result);
		const narrative = parentTrace.narrativeCauseId ? Object.freeze({
			causeId: parentTrace.narrativeCauseId,
			role: scope.narrativeRole ?? "result"
		}) : void 0;
		const eventBus = this.eventBus ?? target.runtime.events;
		const committed = eventBus.runInCausalContext({
			origin: immutableOrigin,
			trace: parentTrace
		}, () => eventBus.publishImmutable({
			type: CombatV3EventType.RESULT_COMMITTED,
			timestamp: target.runtime.clock.now(),
			target,
			result: immutableResult,
			narrative,
			trace: scope.reservedTrace,
			origin: immutableOrigin
		}));
		if (!committed.trace) throw new Error(`Combat result ${result.type} has no committed trace`);
		return committed;
	}
};
function freezeResult(result) {
	if (result.type === "unit_died" && result.killer) return Object.freeze({
		...result,
		killer: Object.freeze({ ...result.killer })
	});
	if (result.type === "action_state" && result.ability) return Object.freeze({
		...result,
		ability: Object.freeze({ ...result.ability })
	});
	if (result.type === "mechanic") {
		const payload = result.payload.kind === "ability_transform" ? Object.freeze({
			...result.payload,
			modifiers: Object.freeze(result.payload.modifiers.map((modifier) => Object.freeze({ ...modifier })))
		}) : Object.freeze({ ...result.payload });
		return Object.freeze({
			...result,
			payload
		});
	}
	return Object.freeze({ ...result });
}
//#endregion
//#region src/shared/engine/battle-v5/effects/Effect.ts
/**
* 效果执行上下文
*/
var EffectExecutionContextV3 = class EffectExecutionContextV3 {
	attribution;
	owner;
	caster;
	target;
	origin;
	trace;
	ability;
	buff;
	castSnapshot;
	damageCause;
	resolution;
	/**
	* 触发此效果的事件（可选）
	* 用于支持吸血、反伤、根据受击伤害触发的效果等
	*/
	triggerEvent;
	ownerLivenessPolicy;
	constructor(input, attribution, ownerLivenessPolicy) {
		const trace = input.trace ?? input.triggerEvent?.trace ?? input.owner.runtime.events.getCurrentTrace();
		if (!trace) throw new Error("EffectExecutionContextV3 requires an explicit trace");
		this.attribution = attribution;
		this.owner = attribution.owner;
		this.caster = input.caster;
		this.target = input.target;
		this.origin = attribution.origin;
		this.trace = Object.freeze({
			...trace,
			narrativeCauseId: trace.narrativeCauseId ?? trace.eventId
		});
		this.ability = input.ability;
		this.buff = input.buff;
		this.castSnapshot = input.castSnapshot;
		this.damageCause = input.damageCause;
		this.resolution = input.resolution;
		this.triggerEvent = input.triggerEvent;
		this.ownerLivenessPolicy = ownerLivenessPolicy;
		Object.freeze(this);
	}
	static activeAbility(input) {
		return new EffectExecutionContextV3(input, CombatAttributionV3.fromAbility(input.owner, input.ability), "require_alive");
	}
	static passiveAbility(input) {
		return new EffectExecutionContextV3(input, CombatAttributionV3.fromAbility(input.owner, input.ability), resolveOwnedEffectLivenessPolicy(input));
	}
	static buff(input) {
		const attribution = combatAttributionFromBuffV3(input.buff);
		if (attribution.owner !== input.owner) throw new Error(`Buff ${input.buff.id} execution owner mismatch`);
		return new EffectExecutionContextV3(input, attribution, resolveOwnedEffectLivenessPolicy(input));
	}
	static system(input) {
		return new EffectExecutionContextV3(input, CombatAttributionV3.system(input.owner, input.source), "allow_lethal_reaction");
	}
	canExecuteEffect() {
		return this.ownerLivenessPolicy === "allow_lethal_reaction" || this.owner.isAlive();
	}
	emit(event) {
		const eventWithResolution = event.resolution || this.resolution ? Object.assign(event, { resolution: event.resolution ?? this.resolution }) : event;
		return this.owner.runtime.events.runInCausalContext({
			origin: this.origin,
			trace: this.trace,
			resolution: this.resolution ?? this.triggerEvent?.resolution
		}, () => this.triggerEvent ? this.owner.runtime.events.enqueueReaction(eventWithResolution, 50) : this.owner.runtime.events.publish(eventWithResolution));
	}
	commit(target, result) {
		new CombatResultEmitterV3().commit(target, result, {
			origin: this.origin,
			parentTrace: this.trace
		});
	}
	commitCue(target, result) {
		new CombatResultEmitterV3().commit(target, result, {
			origin: this.origin,
			parentTrace: this.trace,
			narrativeRole: "cue"
		});
	}
	withNarrativeCause() {
		return new EffectExecutionContextV3({
			owner: this.owner,
			caster: this.caster,
			target: this.target,
			trace: {
				...this.trace,
				narrativeCauseId: this.owner.runtime.events.nextNarrativeCauseId()
			},
			ability: this.ability,
			buff: this.buff,
			castSnapshot: this.castSnapshot,
			damageCause: this.damageCause,
			resolution: this.resolution,
			triggerEvent: this.triggerEvent
		}, this.attribution, this.ownerLivenessPolicy);
	}
};
function executeGameplayEffectV3(effect, context) {
	if (!context.canExecuteEffect()) return;
	context.owner.runtime.events.runInCausalContext({
		origin: context.origin,
		trace: context.trace,
		resolution: context.resolution ?? context.triggerEvent?.resolution
	}, () => effect.execute(context));
}
function resolveOwnedEffectLivenessPolicy(input) {
	const trigger = input.triggerEvent;
	if (trigger?.type !== "DamageSegmentAppliedEvent") return "require_alive";
	const damageTaken = trigger;
	if (damageTaken.target === input.owner && damageTaken.hpReachedZeroBeforeReactions) return "allow_lethal_reaction";
	return "require_alive";
}
/**
* 原子效果基类 (Atomic Gameplay Effect)
*
* 职责：
* - 定义原子操作（伤害、治疗、加Buff等）
* - 在特定的上下文中执行
*/
var GameplayEffect = class {};
//#endregion
//#region src/shared/engine/battle-v5/factories/EffectRegistry.ts
/**
* 效果注册表
* 职责：解耦工厂与具体实现类，提供全局统一的 GE 实例化入口
*/
var EffectRegistry = class EffectRegistry {
	static instance;
	registry = /* @__PURE__ */ new Map();
	constructor() {}
	static getInstance() {
		if (!EffectRegistry.instance) EffectRegistry.instance = new EffectRegistry();
		return EffectRegistry.instance;
	}
	/**
	* 注册一个新的效果构造器
	*/
	register(type, constructor) {
		this.registry.set(type, constructor);
	}
	/**
	* 创建效果实例，并注入条件检查包装
	*/
	create(config) {
		const constructor = this.registry.get(config.type);
		if (!constructor) {
			const message = `EffectRegistry: 未找到类型为 ${config.type} 的效果注册`;
			if (process.env.NODE_ENV !== "production") throw new Error(message);
			console.warn(message);
			return null;
		}
		const baseEffect = constructor(config.params);
		if (config.conditions && config.conditions.length > 0) return this.wrapWithConditions(baseEffect, config.conditions);
		return baseEffect;
	}
	/**
	* 使用条件检查包装原始效果 (代理模式)
	*/
	wrapWithConditions(effect, conditions) {
		return { execute: (context) => {
			if (this.checkConditions(context, conditions)) effect.execute(context);
		} };
	}
	/**
	* 检查所有条件是否满足
	*/
	checkConditions(context, conditions) {
		return checkConditions(context, conditions);
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/effectExecutor.ts
function executeEffectConfigs(effects, context) {
	for (const effectConfig of effects) {
		if (!context.canExecuteEffect()) break;
		const effect = EffectRegistry.getInstance().create(effectConfig);
		if (!effect) continue;
		executeGameplayEffectV3(effect, context);
	}
}
//#endregion
//#region src/shared/engine/battle-v5/core/triggerLedger.ts
var lifetimeLedger = /* @__PURE__ */ new WeakMap();
/** Central, atomic trigger claim store for all data-driven listeners. */
var TriggerLedger = class {
	claim(owner, event, listenerId, policy, source) {
		if (!policy) return true;
		const maxTriggers = Math.max(0, Math.trunc(policy.maxTriggers));
		if (maxTriggers <= 0) return false;
		if (policy.granularity === "buff_lifetime") {
			const lifetimeOwner = source ?? owner;
			const entries = lifetimeLedger.get(lifetimeOwner) ?? /* @__PURE__ */ new Map();
			const key = policy.group ?? listenerId;
			const count = entries.get(key) ?? 0;
			if (count >= maxTriggers) return false;
			entries.set(key, count + 1);
			lifetimeLedger.set(lifetimeOwner, entries);
			return true;
		}
		const token = this.resolveToken(owner, event, listenerId, policy.granularity);
		const state = getBattleRuntimeState(owner);
		const key = `${policy.group ?? listenerId}:${policy.granularity}`;
		const current = state.triggerLedger.get(key);
		const count = current?.token === token ? current.count : 0;
		if (count >= maxTriggers) return false;
		state.triggerLedger.set(key, {
			token,
			count: count + 1
		});
		return true;
	}
	resolveToken(owner, event, listenerId, granularity) {
		const resolution = event.resolution;
		if (!resolution && granularity !== "round" && granularity !== "battle") throw new Error(`Trigger ${listenerId} requires a combat resolution for ${granularity} granularity`);
		switch (granularity) {
			case "segment":
				if (resolution.segmentIndex === void 0) throw new Error(`Trigger ${listenerId} requires segmentIndex for segment granularity`);
				return `${resolution.hitId}:${resolution.segmentIndex}`;
			case "hit": return resolution.hitId;
			case "cast": return resolution.castId;
			case "action": return resolution.actionId;
			case "round": return String(getBattleRuntimeState(owner).round);
			case "battle": return "battle";
		}
	}
};
var triggerLedger = new TriggerLedger();
//#endregion
//#region src/shared/engine/battle-v5/core/listenerExecution.ts
function getEventParticipant(event, key) {
	const eventAny = event;
	if (key === "caster") return eventAny.caster ?? eventAny.source;
	return eventAny[key] ?? eventAny.unit;
}
function getDefaultScope(eventType) {
	switch (eventType) {
		case "DamageSegmentAppliedEvent": return "owner_as_target";
		case "ActionPreEvent":
		case "ActionPostEvent": return "owner_as_actor";
		case "SkillCastEvent":
		case "SkillPreCastEvent":
		case "HitCheckEvent":
		case "DamageSegmentRequestedEvent": return "owner_as_caster";
		case "RoundPreEvent":
		case "RoundPostEvent":
		case "RoundStartEvent": return "global";
		default: return "global";
	}
}
function getDefaultMapping(_eventType, scope) {
	switch (scope) {
		case "owner_as_target": return {
			caster: "event.caster",
			target: "owner"
		};
		case "owner_as_caster":
		case "owner_as_actor": return {
			caster: "owner",
			target: "event.target"
		};
		default: return {
			caster: "owner",
			target: "owner"
		};
	}
}
function buildListenerRuntimeConfig(config, identity) {
	const scope = config.scope ?? getDefaultScope(config.eventType);
	return {
		id: config.id ?? `${config.eventType}_${stableListenerId(identity ?? JSON.stringify(config))}`,
		eventType: config.eventType,
		scope,
		priority: config.priority,
		mapping: config.mapping ?? getDefaultMapping(config.eventType, scope),
		guard: {
			requireOwnerAlive: config.guard?.requireOwnerAlive ?? true,
			allowLethalWindow: config.guard?.allowLethalWindow ?? false,
			skipReflectSource: config.guard?.skipReflectSource ?? false,
			skipSecondaryDamageSource: config.guard?.skipSecondaryDamageSource ?? false
		},
		triggerPolicy: config.triggerPolicy ? { ...config.triggerPolicy } : void 0,
		conditions: config.conditions?.map((condition) => ({
			...condition,
			params: { ...condition.params }
		}))
	};
}
function stableListenerId(value) {
	let hash = 2166136261;
	for (const character of value) {
		hash ^= character.charCodeAt(0);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(36);
}
function matchesListenerScope(owner, event, scope) {
	const eventCaster = getEventParticipant(event, "caster");
	const eventTarget = getEventParticipant(event, "target");
	switch (scope) {
		case "owner_as_target": return eventTarget === owner;
		case "owner_as_caster": return eventCaster === owner;
		case "owner_as_actor": return eventCaster === owner || eventTarget === owner;
		default: return true;
	}
}
function resolveSource(source, owner, event) {
	switch (source) {
		case "owner": return owner;
		case "event.caster": return getEventParticipant(event, "caster");
		case "event.target": return getEventParticipant(event, "target");
		case "event.source": return getEventParticipant(event, "source");
		default: return owner;
	}
}
function resolveListenerContext(owner, event, mapping) {
	return {
		caster: resolveSource(mapping.caster, owner, event) ?? owner,
		target: resolveSource(mapping.target, owner, event) ?? owner
	};
}
function shouldExecuteListener(owner, event, runtime, source) {
	if (!matchesListenerScope(owner, event, runtime.scope)) return false;
	if (runtime.guard.skipReflectSource) {
		if (event.damageSource === "reflect") return false;
	}
	if (runtime.guard.skipSecondaryDamageSource) {
		const damageSource = event.damageSource;
		if (damageSource === "reflect" || damageSource === "counter" || damageSource === "follow_up" || damageSource === "delayed") return false;
	}
	if (runtime.guard.requireOwnerAlive && !owner.isAlive()) {
		if (!(runtime.guard.allowLethalWindow && event.type === "DamageSegmentAppliedEvent")) return false;
	}
	if (runtime.conditions?.length) {
		const resolved = resolveListenerContext(owner, event, runtime.mapping);
		if (!checkConditions({
			caster: resolved.caster,
			target: resolved.target,
			triggerEvent: event
		}, runtime.conditions)) return false;
	}
	if (!triggerLedger.claim(owner, event, runtime.id, runtime.triggerPolicy, source)) return false;
	return true;
}
//#endregion
//#region src/shared/engine/battle-v5/abilities/DataDrivenActiveSkill.ts
/**
* 数据驱动的主动技能 (Data-Driven Active Skill)
*
* 职责：
* - 作为原子效果 (GameplayEffect) 的容器
* - 按照顺序执行所有原子效果
* - 遵循 GAS 规范进行资源消耗和冷却管理
*/
var DataDrivenActiveSkill = class DataDrivenActiveSkill extends ActiveSkill {
	_effects = [];
	_castEffects = [];
	_instantiatedListeners = [];
	constructor(id, name, config = {}) {
		super(id, name, config);
	}
	/**
	* 向技能添加一个原子效果
	* @param effect 原子效果实例
	*/
	addEffect(effect) {
		this._effects.push(effect);
	}
	addCastEffect(effect) {
		this._castEffects.push(effect);
	}
	addInstantiatedListener(runtime, effects) {
		this._instantiatedListeners.push({
			runtime,
			effects
		});
	}
	onActivate() {
		super.onActivate();
		const owner = this.getOwner();
		if (!owner) return;
		for (const listener of this._instantiatedListeners) {
			const mountedEffects = listener.effects.filter((entry) => {
				const key = entry.globalUnique?.key;
				return !key || claimGlobalUniqueEffect(owner, key, this);
			});
			if (mountedEffects.length === 0) continue;
			this.subscribeEvent(listener.runtime.eventType, (event) => {
				this._executeInstantiatedEffects(listener.runtime, mountedEffects, event);
			}, listener.runtime.priority);
		}
	}
	onDeactivate() {
		const owner = this.getOwner();
		if (owner) releaseGlobalUniqueEffects(owner, this);
		super.onDeactivate();
	}
	/**
	* 执行技能核心逻辑
	* 依次触发所有装配的效果
	*/
	executeSkill(caster, target) {
		const context = EffectExecutionContextV3.activeAbility({
			owner: caster,
			caster,
			target,
			ability: this,
			castSnapshot: this.castSnapshot,
			resolution: this.resolution
		});
		for (const effect of this._effects) {
			if (!context.canExecuteEffect()) break;
			executeGameplayEffectV3(effect, context);
		}
	}
	executeCastEffects(caster, target) {
		const context = EffectExecutionContextV3.activeAbility({
			owner: caster,
			caster,
			target,
			ability: this,
			castSnapshot: this.castSnapshot,
			resolution: this.resolution
		});
		for (const effect of this._castEffects) {
			if (!context.canExecuteEffect()) break;
			executeGameplayEffectV3(effect, context);
		}
	}
	_executeInstantiatedEffects(runtime, effects, event) {
		const owner = this.getOwner();
		if (!owner) return;
		const eventAbility = event.ability;
		if (eventAbility && eventAbility !== this) return;
		if (!shouldExecuteListener(owner, event, runtime, this)) return;
		const resolved = resolveListenerContext(owner, event, runtime.mapping);
		const context = EffectExecutionContextV3.passiveAbility({
			owner,
			caster: resolved.caster,
			target: resolved.target,
			ability: this,
			triggerEvent: event,
			resolution: event.resolution
		});
		for (const { effect } of effects) executeGameplayEffectV3(effect, context);
	}
	/**
	* 克隆技能实例，同时克隆所有效果
	*/
	clone() {
		const cloned = new DataDrivenActiveSkill(this.id, this.name, {
			description: this.description,
			costs: this.costConfigs,
			cooldown: this.maxCooldown,
			priority: this.priority,
			targetPolicy: this.targetPolicy,
			selectionProfile: this.selectionProfile,
			castConditions: this.castConditions,
			hitPolicy: this.hitPolicy
		});
		cloned.tags.addTags(this.tags.getTags());
		if (this.currentCooldown > 0) cloned.modifyCooldown(this.currentCooldown);
		cloned._effects = [...this._effects];
		cloned._castEffects = [...this._castEffects];
		for (const listener of this._instantiatedListeners) cloned.addInstantiatedListener({
			...listener.runtime,
			mapping: { ...listener.runtime.mapping },
			guard: { ...listener.runtime.guard },
			triggerPolicy: listener.runtime.triggerPolicy ? { ...listener.runtime.triggerPolicy } : void 0,
			conditions: listener.runtime.conditions?.map((condition) => ({
				...condition,
				params: { ...condition.params }
			}))
		}, [...listener.effects]);
		return cloned;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/abilities/PassiveAbility.ts
/**
* 被动能力基类
*
* 特点：
* - 无冷却、无消耗
* - 通过事件触发（而非主动释放）
* - 在激活时自动订阅事件
*
* 生命周期：
* 1. 创建 → constructor()
* 2. 绑定所有者 → setOwner()
* 3. 激活 → setActive(true) → setupEventListeners()
* 4. 触发 → 事件驱动，通过 createEventHandler 包装
* 5. 停用 → setActive(false) → 自动取消订阅
*/
var PassiveAbility = class extends Ability {
	constructor(id, name) {
		super(id, name, AbilityType.PASSIVE_SKILL);
	}
	onActivate() {
		super.onActivate();
		this.setupEventListeners();
	}
	/**
	* 创建事件处理包装器
	* 自动检查所有者是否存在
	* 存活策略由 listener guard 控制
	*/
	createEventHandler(handler) {
		return (event) => {
			if (!this.getOwner()) return;
			handler(event);
		};
	}
	/**
	* 被动技能永远可以触发（由事件驱动）
	*/
	canTrigger() {
		return true;
	}
	/**
	* 被动技能通常不通过 execute 执行
	* 而是通过事件订阅直接响应
	*/
	execute() {}
	clone() {
		return super.clone();
	}
};
//#endregion
//#region src/shared/engine/battle-v5/abilities/DataDrivenPassiveAbility.ts
/**
* 数据驱动的被动能力 (Data-Driven Passive Ability)
* 
* 职责：
* - 动态订阅战斗事件 (EDA)
* - 当事件触发时，执行对应的原子效果链 (GAS)
*/
var DataDrivenPassiveAbility = class DataDrivenPassiveAbility extends PassiveAbility {
	/**
	* 为了支持工厂装配，我们内部持有已实例化的效果映射
	*/
	_instantiatedListeners = [];
	_modifiers = [];
	constructor(id, name) {
		super(id, name);
	}
	addInstantiatedListener(runtime, effects) {
		this._instantiatedListeners.push({
			runtime,
			effects
		});
	}
	addModifier(config) {
		this._modifiers.push(config);
	}
	onActivate() {
		const owner = this.getOwner();
		if (owner) {
			for (const [index, modifier] of this._modifiers.entries()) {
				const mountedModifier = {
					id: `${this.id}_${modifier.attrType}_${index}`,
					attrType: modifier.attrType,
					type: modifier.type,
					value: modifier.value,
					source: this
				};
				owner.attributes.addModifier(mountedModifier);
			}
			owner.updateDerivedStats();
		}
		super.onActivate();
	}
	onDeactivate() {
		const owner = this.getOwner();
		if (owner) {
			owner.attributes.removeModifierBySource(this);
			owner.updateDerivedStats();
		}
		super.onDeactivate();
		if (owner) releaseGlobalUniqueEffects(owner, this);
	}
	/**
	* 设置事件监听
	* 覆盖基类方法，实现动态订阅
	*/
	setupEventListeners() {
		const owner = this.getOwner();
		if (!owner) return;
		for (const listener of this._instantiatedListeners) {
			const mountedEffects = listener.effects.filter((entry) => {
				const key = entry.globalUnique?.key;
				return !key || claimGlobalUniqueEffect(owner, key, this);
			});
			if (mountedEffects.length === 0) continue;
			this.subscribeEvent(listener.runtime.eventType, this.createEventHandler((event) => {
				this._executeInstantiatedEffects(listener.runtime, mountedEffects, event);
			}), listener.runtime.priority);
		}
	}
	_executeInstantiatedEffects(runtime, effects, event) {
		const owner = this.getOwner();
		if (!owner) return;
		if (!shouldExecuteListener(owner, event, runtime, this)) return;
		const resolved = resolveListenerContext(owner, event, runtime.mapping);
		const context = EffectExecutionContextV3.passiveAbility({
			owner,
			caster: resolved.caster,
			target: resolved.target,
			ability: this,
			triggerEvent: event,
			resolution: event.resolution
		});
		for (const { effect } of effects) executeGameplayEffectV3(effect, context);
	}
	/**
	* 被动技能没有主动效果链
	*/
	setupListeners() {}
	clone() {
		const cloned = new DataDrivenPassiveAbility(this.id, this.name);
		for (const listener of this._instantiatedListeners) cloned.addInstantiatedListener({
			...listener.runtime,
			mapping: { ...listener.runtime.mapping },
			guard: { ...listener.runtime.guard },
			triggerPolicy: listener.runtime.triggerPolicy ? { ...listener.runtime.triggerPolicy } : void 0,
			conditions: listener.runtime.conditions?.map((condition) => ({
				...condition,
				params: { ...condition.params }
			}))
		}, [...listener.effects]);
		for (const modifier of this._modifiers) cloned.addModifier({ ...modifier });
		return cloned;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/abilityEffectPlan.ts
/** 在施法准备阶段解析一次；调用方负责持有返回快照直至本次结算结束。 */
function resolveAbilityEffectPlan(source, context) {
	const plan = [...source.effectPlans ?? []].sort((left, right) => right.priority - left.priority).find((candidate) => checkConditions(context, candidate.conditions));
	const layersById = new Map((source.effectLayers ?? []).map((layer) => [layer.id, layer]));
	const selectedLayers = plan?.layerIds.map((id) => layersById.get(id)) ?? [];
	return Object.freeze({
		id: plan?.id,
		name: plan?.name ?? source.name,
		description: plan?.description ?? source.description,
		effects: Object.freeze([...source.effects ?? [], ...selectedLayers.flatMap((layer) => layer.effects ?? [])]),
		completionEffects: Object.freeze([...source.completionEffects ?? [], ...selectedLayers.flatMap((layer) => layer.completionEffects ?? [])]),
		consumeModeKey: plan?.consumeModeKey
	});
}
function validateAbilityEffectPlans(source) {
	const layers = source.effectLayers ?? [];
	const plans = source.effectPlans ?? [];
	assertUniqueIds(source.slug, "layer", layers.map((layer) => layer.id));
	assertUniqueIds(source.slug, "plan", plans.map((plan) => plan.id));
	const layerIds = new Set(layers.map((layer) => layer.id));
	const allowedPlanKeys = /* @__PURE__ */ new Set([
		"id",
		"name",
		"description",
		"priority",
		"conditions",
		"layerIds",
		"consumeModeKey"
	]);
	for (const plan of plans) {
		const unsupportedKeys = Object.keys(plan).filter((key) => !allowedPlanKeys.has(key));
		if (unsupportedKeys.length > 0) throw new Error(`[AbilityFactory] ability ${source.slug} plan ${plan.id} cannot define ${unsupportedKeys.join(", ")}`);
		assertUniqueIds(source.slug, `plan ${plan.id} layer reference`, plan.layerIds);
		for (const layerId of plan.layerIds) if (!layerIds.has(layerId)) throw new Error(`[AbilityFactory] ability ${source.slug} plan ${plan.id} references unknown layer ${layerId}`);
		if (plan.consumeModeKey !== void 0 && plan.consumeModeKey.trim() === "") throw new Error(`[AbilityFactory] ability ${source.slug} plan ${plan.id} has an empty consumeModeKey`);
	}
}
function assertUniqueIds(slug, kind, ids) {
	const seen = /* @__PURE__ */ new Set();
	for (const id of ids) {
		if (!id.trim()) throw new Error(`[AbilityFactory] ability ${slug} has an empty ${kind} id`);
		if (seen.has(id)) throw new Error(`[AbilityFactory] ability ${slug} has duplicate ${kind} id ${id}`);
		seen.add(id);
	}
}
//#endregion
//#region src/shared/engine/battle-v5/abilities/LayeredDataDrivenActiveSkill.ts
/** 固定目标、费用和 AI 意图，只允许按计划追加效果层的主动技能。 */
var LayeredDataDrivenActiveSkill = class LayeredDataDrivenActiveSkill extends ActiveSkill {
	preparedPlan;
	baseCosts;
	baseName;
	baseDescription;
	baseEffects;
	baseCompletionEffects;
	baseCastEffects;
	effectLayers;
	effectPlans;
	constructor(id, name, config) {
		super(id, name, config);
		this.baseCosts = config.costs?.map((cost) => ({ ...cost })) ?? [];
		this.baseName = name;
		this.baseDescription = config.description;
		this.baseEffects = config.effects ?? [];
		this.baseCompletionEffects = config.completionEffects ?? [];
		this.baseCastEffects = config.castEffects ?? [];
		this.effectLayers = config.effectLayers ?? [];
		this.effectPlans = config.effectPlans ?? [];
	}
	get name() {
		return this.currentPlan()?.name ?? this.baseName;
	}
	get description() {
		return this.currentPlan()?.description ?? this.baseDescription;
	}
	get runtimePlanId() {
		return this.currentPlan()?.id;
	}
	prepareCast(context) {
		this.preparedPlan = this.resolvePlan(context.caster, context.target);
		super.prepareCast(context);
	}
	cancelPreparedCast() {
		this.preparedPlan = void 0;
		super.cancelPreparedCast();
	}
	executeSkill(caster, target) {
		const plan = this.preparedPlan ?? this.resolvePlan(caster, target);
		const context = EffectExecutionContextV3.activeAbility({
			owner: caster,
			caster,
			target,
			ability: this,
			castSnapshot: this.castSnapshot,
			resolution: this.resolution
		});
		executeEffectConfigs(plan.effects, context);
		executeEffectConfigs(plan.completionEffects, context);
		if (plan.consumeModeKey && context.canExecuteEffect()) advanceAbilityMode(caster, plan.consumeModeKey, {
			attribution: context.attribution,
			trace: context.trace
		});
	}
	executeCastEffects(caster, target) {
		executeEffectConfigs(this.baseCastEffects, EffectExecutionContextV3.activeAbility({
			owner: caster,
			caster,
			target,
			ability: this,
			castSnapshot: this.castSnapshot,
			resolution: this.resolution
		}));
	}
	onCastFinished() {
		this.preparedPlan = void 0;
	}
	clone() {
		const cloned = new LayeredDataDrivenActiveSkill(this.id, this.baseName, {
			description: this.baseDescription,
			costs: this.baseCosts,
			cooldown: this.maxCooldown,
			priority: this.priority,
			targetPolicy: super.targetPolicy,
			selectionProfile: super.selectionProfile,
			castConditions: super.castConditions,
			hitPolicy: super.hitPolicy,
			effects: this.baseEffects,
			completionEffects: this.baseCompletionEffects,
			castEffects: this.baseCastEffects,
			effectLayers: this.effectLayers,
			effectPlans: this.effectPlans
		});
		cloned.tags.addTags(this.tags.getTags());
		if (this.currentCooldown > 0) cloned.modifyCooldown(this.currentCooldown);
		return cloned;
	}
	currentPlan() {
		if (this.preparedPlan) return this.preparedPlan;
		const owner = this.getOwner();
		return owner ? this.resolvePlan(owner, owner) : void 0;
	}
	resolvePlan(caster, target) {
		return resolveAbilityEffectPlan({
			name: this.baseName,
			description: this.baseDescription,
			effects: this.baseEffects,
			completionEffects: this.baseCompletionEffects,
			effectLayers: this.effectLayers,
			effectPlans: this.effectPlans
		}, {
			caster,
			target,
			ability: this
		});
	}
};
//#endregion
//#region src/shared/engine/battle-v5/factories/AbilityCapabilityAnalyzer.ts
function channelForDamage(effect) {
	if (effect.params.damageType === DamageType.TRUE) return "true";
	if (effect.params.damageType === DamageType.MAGICAL) return "magic";
	if (effect.params.damageType === DamageType.PHYSICAL) return "physical";
	const attribute = effect.params.value.attribute;
	if (attribute === AttributeType.MAGIC_ATK || attribute === AttributeType.MAGIC_DEF) return "magic";
	if (attribute === AttributeType.ATK || attribute === AttributeType.DEF) return "physical";
	throw new Error("damage effect is missing a supported damage type");
}
function nestedEffects(effect) {
	const params = effect.params;
	return [
		...params.effects ?? [],
		...params.fallbackEffects ?? [],
		...params.cancelEffects ?? [],
		...params.onResistEffects ?? []
	];
}
function analyzeAbilityCapabilities(config) {
	const queue = [
		...config.effects ?? [],
		...config.completionEffects ?? [],
		...config.effectLayers?.flatMap((layer) => [...layer.effects ?? [], ...layer.completionEffects ?? []]) ?? [],
		...config.castEffects ?? [],
		...config.listeners?.flatMap((listener) => listener.effects) ?? []
	];
	const damageChannels = /* @__PURE__ */ new Set();
	const intents = /* @__PURE__ */ new Set();
	let hasDamage = false;
	let hasHeal = false;
	let hasControl = false;
	let hasBuff = false;
	let hasDebuff = false;
	for (let index = 0; index < queue.length; index += 1) {
		const effect = queue[index];
		queue.push(...nestedEffects(effect));
		switch (effect.type) {
			case "damage":
				hasDamage = true;
				damageChannels.add(channelForDamage(effect));
				intents.add("damage");
				break;
			case "resource_scaled_damage":
				hasDamage = true;
				damageChannels.add(effect.params.damageType === DamageType.TRUE ? "true" : effect.params.damageType === DamageType.MAGICAL ? "magic" : "physical");
				intents.add("damage");
				break;
			case "tag_trigger":
				if (!effect.params.effects?.length) {
					hasDamage = true;
					damageChannels.add("magic");
				}
				intents.add("damage");
				break;
			case "damage_memory":
				if (effect.params.mode !== "release") break;
				if (effect.params.releaseAs === "heal") {
					hasHeal = true;
					intents.add("heal_hp");
				} else if (effect.params.releaseAs === "shield") intents.add("defensive");
				else {
					hasDamage = true;
					damageChannels.add(effect.params.damageType === DamageType.MAGICAL ? "magic" : effect.params.damageType === DamageType.PHYSICAL || effect.params.releaseAs === "counter" || effect.params.releaseAs === "follow_up" ? "physical" : "true");
					intents.add("damage");
				}
				break;
			case "hp_sacrifice_damage":
				hasDamage = true;
				damageChannels.add("magic");
				intents.add("damage");
				break;
			case "heal":
				hasHeal = true;
				intents.add(effect.params.target === "mp" ? "restore_mp" : "heal_hp");
				break;
			case "apply_buff":
				if (effect.params.buffConfig.type === BuffType.CONTROL) {
					hasControl = true;
					hasDebuff = true;
					intents.add("control");
				} else {
					hasBuff = true;
					if (effect.params.buffConfig.type === BuffType.DEBUFF) hasDebuff = true;
					intents.add("buff");
				}
				break;
			case "ability_lock":
				hasControl = true;
				intents.add("control");
				break;
			case "shield":
			case "magic_shield":
			case "death_prevent":
			case "damage_defer":
				intents.add("defensive");
				break;
			case "ability_transform":
			case "next_hit_rule":
			case "buff_copy":
				hasBuff = true;
				intents.add("buff");
		}
	}
	if (damageChannels.has("magic") && damageChannels.has("physical")) throw new Error(`[AbilityFactory] ability ${config.slug ?? "<anonymous>"} mixes multiple damage channels`);
	if (intents.size === 0) {
		if (config.tags?.includes(GameplayTags.ABILITY.FUNCTION.HEAL)) intents.add("heal_hp");
		if (config.tags?.includes(GameplayTags.ABILITY.FUNCTION.CONTROL)) intents.add("control");
		if (config.tags?.includes(GameplayTags.ABILITY.FUNCTION.DAMAGE)) intents.add("damage");
		if (config.tags?.includes(GameplayTags.ABILITY.FUNCTION.BUFF)) intents.add("buff");
	}
	return {
		hasDamage,
		hasHeal,
		hasControl,
		hasBuff,
		hasDebuff,
		damageChannels,
		selectionProfile: intents.size ? { intents: Array.from(intents) } : void 0
	};
}
//#endregion
//#region src/shared/engine/battle-v5/core/ValueCalculator.ts
/**
* 数值计算工具类
*/
var ValueCalculator = class {
	/**
	* 计算最终数值
	*/
	static calculate(value, caster, target) {
		return this.calculateDetailed(value, caster, target).total;
	}
	static calculateDetailed(value, caster, target) {
		if (typeof value === "number") return {
			total: value,
			components: [{
				kind: "base",
				amount: value,
				mitigation: "normal",
				attackBase: value,
				segmentMultiplier: 1
			}]
		};
		const components = [];
		let total = 0;
		const base = value.base ?? 0;
		const coefficient = value.coefficient ?? 1;
		if (value.attribute) {
			const attrValue = caster.attributes.getValue(value.attribute);
			const amount = base + attrValue * coefficient;
			total += amount;
			if (coefficient > 0) components.push({
				kind: `attribute:${value.attribute}`,
				amount,
				mitigation: "normal",
				attackBase: attrValue + base / coefficient,
				segmentMultiplier: coefficient
			});
			else if (base > 0) components.push({
				kind: "base",
				amount: base,
				mitigation: "normal",
				attackBase: base,
				segmentMultiplier: 1
			});
		} else if (base) {
			total += base;
			components.push({
				kind: "base",
				amount: base,
				mitigation: "normal",
				attackBase: base,
				segmentMultiplier: 1
			});
		}
		if (value.targetMaxHpRatio && target) {
			const amount = target.getMaxHp() * value.targetMaxHpRatio;
			total += amount;
			components.push({
				kind: "targetMaxHpRatio",
				amount,
				mitigation: "bypass_defense"
			});
		}
		if (value.targetMaxMpRatio && target) {
			const amount = target.getMaxMp() * value.targetMaxMpRatio;
			total += amount;
			components.push({
				kind: "targetMaxMpRatio",
				amount,
				mitigation: "bypass_defense"
			});
		}
		return {
			total: Math.round(total),
			components
		};
	}
};
//#endregion
//#region src/shared/engine/battle-v5/buffs/Buff.ts
var StackRule = {
	STACK_LAYER: "stack_layer",
	REFRESH_DURATION: "refresh_duration",
	OVERRIDE: "override",
	IGNORE: "ignore"
};
/**
* BUFF 基类
*
* GAS+EDA 架构设计：
* - Buff 持有 owner 引用，可主动订阅事件
* - 支持层数机制（大多数 Buff 都有层数概念）
* - 生命周期：setOwner() → onActivate() → [事件响应] → onDeactivate()
*
* 实现方式：
* - 子类重写 onActivate() 订阅事件、添加属性修改器
* - 子类重写 onDeactivate() 取消订阅、移除属性修改器
* - 使用 _subscribeEvent() 辅助方法订阅事件（自动存储引用便于取消）
*/
var Buff = class Buff {
	id;
	name;
	description;
	type;
	logVisibility;
	statusVisibility;
	dispelPolicy;
	dispelMode;
	countsAsStatus;
	removeOnDeath;
	durationUnit;
	_duration;
	_maxDuration;
	tags;
	stackRule;
	stackPriority;
	maxLayers;
	_owner = null;
	_source = null;
	_combatAttribution;
	_layer = 1;
	_subscribedHandlers = [];
	constructor(id, name, type, duration, stackRule = StackRule.REFRESH_DURATION, description, maxLayers, logVisibility = "player", dispelPolicy = "normal", countsAsStatus = true, statusVisibility, stackPriority = 0, dispelMode = "whole", removeOnDeath = false, durationUnit = "owner_action") {
		this.id = id;
		this.name = name;
		this.description = description;
		this.logVisibility = logVisibility;
		this.statusVisibility = statusVisibility ?? (logVisibility === "debug" ? "hidden" : "player");
		this.dispelPolicy = dispelPolicy;
		this.dispelMode = dispelMode;
		this.countsAsStatus = countsAsStatus;
		this.removeOnDeath = removeOnDeath;
		this.durationUnit = durationUnit;
		this.type = type;
		this._maxDuration = duration;
		this._duration = duration;
		this.stackRule = stackRule;
		this.stackPriority = stackPriority;
		this.maxLayers = maxLayers;
		this.tags = new GameplayTagContainer();
	}
	/**
	* 设置 owner 引用（由 BuffContainer 调用）
	* 这是 GAS 架构的关键：Buff 需要知道自己的宿主才能订阅事件
	*/
	setOwner(owner) {
		this._owner = owner;
	}
	/**
	* 获取 owner
	*/
	getOwner() {
		return this._owner;
	}
	/**
	* 设置 source 引用（Buff 来源，通常是施法者）
	* 用于 DOT 伤害归属、伤害加成计算等
	*/
	setSource(source) {
		this._source = source;
	}
	/**
	* 获取 source（Buff 来源）
	*/
	getSource() {
		return this._source;
	}
	setCombatAttributionV3(attribution) {
		this._combatAttribution = attribution;
	}
	getCombatAttributionV3() {
		return this._combatAttribution;
	}
	/**
	* 获取当前层数
	*/
	getLayer() {
		return this._layer;
	}
	/**
	* 增加层数
	* @param layers 增加的层数，默认为 1
	*/
	addLayer(layers = 1) {
		const previous = this._layer;
		this._layer = Math.min(this.maxLayers ?? Number.POSITIVE_INFINITY, this._layer + layers);
		if (this._layer !== previous) this.onLayerChanged();
	}
	/**
	* 设置层数
	*/
	setLayer(layer) {
		const previous = this._layer;
		this._layer = Math.max(1, Math.min(this.maxLayers ?? Number.POSITIVE_INFINITY, layer));
		if (this._layer !== previous) this.onLayerChanged();
	}
	/** Buff 层数变化钩子，供依赖层数的运行时效果重新挂载。 */
	onLayerChanged() {}
	/**
	* Buff 激活时的初始化（GAS 模式）
	* 子类重写此方法来订阅事件、添加标签、添加属性修改器等
	*
	* 注意：此方法在 setOwner() 之后调用，此时 this._owner 已可用
	*/
	onActivate() {}
	/**
	* Buff 移除时的清理（GAS 模式）
	* 子类重写此方法来取消订阅、移除标签、移除属性修改器等
	*/
	onDeactivate(reason) {
		this._unsubscribeAll();
	}
	/**
	* 订阅事件的辅助方法（存储 handler 引用用于后续取消订阅）
	*/
	_subscribeEvent(eventType, handler, priority = 0) {
		const wrappedHandler = handler;
		this._subscribedHandlers.push({
			eventType,
			handler: wrappedHandler
		});
		this._eventBus.subscribe(eventType, wrappedHandler, priority);
	}
	/**
	* 取消订阅事件
	*/
	_unsubscribeEvent(eventType) {
		const remaining = [];
		for (const subscription of this._subscribedHandlers) if (subscription.eventType === eventType) this._eventBus.unsubscribe(subscription.eventType, subscription.handler);
		else remaining.push(subscription);
		this._subscribedHandlers = remaining;
	}
	/**
	* 取消所有事件订阅
	*/
	_unsubscribeAll() {
		for (const subscription of this._subscribedHandlers) this._eventBus.unsubscribe(subscription.eventType, subscription.handler);
		this._subscribedHandlers = [];
	}
	get _eventBus() {
		if (!this._owner) throw new Error(`Buff ${this.id} must have an owner`);
		return this._owner.runtime.events;
	}
	/**
	* 持续时间管理
	*/
	getDuration() {
		return this._duration;
	}
	getMaxDuration() {
		return this._maxDuration;
	}
	tickDuration() {
		if (!this.isPermanent()) this._duration = Math.max(0, this._duration - 1);
	}
	refreshDuration() {
		this._duration = this._maxDuration;
	}
	/**
	* 刷新持续时间到指定值（用于堆叠规则 REFRESH_DURATION）
	* @param duration 新的持续时间和最大持续时间
	*/
	refreshToDuration(duration) {
		this._duration = duration;
		this._maxDuration = duration;
	}
	restoreDuration(current, maximum) {
		this._maxDuration = Math.trunc(maximum);
		this._duration = this._maxDuration === -1 ? -1 : Math.max(0, Math.min(this._maxDuration, Math.trunc(current)));
	}
	/**
	* 设置持续时间（供子类 clone 使用）
	*/
	setDuration(duration) {
		this._duration = duration;
	}
	isPermanent() {
		return this._maxDuration === -1;
	}
	isExpired() {
		return !this.isPermanent() && this._duration <= 0;
	}
	/**
	* 属性修改器（可被子类重写）
	*/
	getAttributeModifiers() {
		return [];
	}
	/**
	* 克隆 Buff 实例
	* 子类可以重写此方法以实现更复杂的克隆逻辑
	* 注意：
	* - owner 和 source 不会被复制，需要通过 setOwner/setSource 设置
	* - 层数会被复制
	*/
	clone() {
		const cloned = new Buff(this.id, this.name, this.type, this._maxDuration, this.stackRule, this.description, this.maxLayers, this.logVisibility, this.dispelPolicy, this.countsAsStatus, this.statusVisibility, this.stackPriority, this.dispelMode, this.removeOnDeath, this.durationUnit);
		cloned.setDuration(this._duration);
		cloned.tags = this.tags.clone();
		cloned._layer = this._layer;
		return cloned;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/resolution.ts
function requireResolution(input) {
	const resolution = input.resolution ?? input.triggerEvent?.resolution;
	if (!resolution) throw new Error("Combat effect requires an explicit resolution context");
	return resolution;
}
function createHitResolution(seed, target = seed.target) {
	const hitIndex = seed.hitIndex ?? 0;
	if (!Number.isInteger(hitIndex) || hitIndex < 0) throw new Error("Hit index must be a non-negative integer");
	return Object.freeze({
		...seed,
		target,
		hitId: `${seed.castId}:hit:${target.id}:${hitIndex}`
	});
}
function withDamageSegment(context, segmentIndex, segmentCount) {
	if (!Number.isInteger(segmentIndex) || segmentIndex < 0) throw new Error("Damage segment index must be a non-negative integer");
	if (segmentCount !== void 0 && (!Number.isInteger(segmentCount) || segmentCount <= segmentIndex)) throw new Error("Damage segment count must be greater than its index");
	return Object.freeze({
		...context,
		segmentIndex,
		segmentCount
	});
}
/** Allocate the next segment identity for a hit in execution order. */
function nextDamageSegment(context, segmentCount) {
	const state = getBattleRuntimeState(context.caster);
	const segmentIndex = state.damageSegmentCounters.get(context.hitId) ?? 0;
	state.damageSegmentCounters.set(context.hitId, segmentIndex + 1);
	return withDamageSegment(context, segmentIndex, segmentCount);
}
function consumeDamageSegmentCount(context) {
	const state = getBattleRuntimeState(context.caster);
	const count = state.damageSegmentCounters.get(context.hitId) ?? 0;
	state.damageSegmentCounters.delete(context.hitId);
	return count;
}
//#endregion
//#region src/shared/engine/battle-v5/effects/DamageEffect.ts
/**
* 伤害原子效果
* 职责：计算伤害并发布 DamageSegmentRequestedEvent
*/
var DamageEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { caster, target, ability, buff } = context;
		if (!target.isAlive()) return;
		const resolvedCaster = buff?.getSource() ?? caster;
		const damageResult = ValueCalculator.calculateDetailed(this.params.value, resolvedCaster, target);
		let damage = damageResult.total;
		const damageComponents = [...damageResult.components];
		for (const scalar of this.params.dynamicScalars ?? []) {
			if (scalar.source !== "target_missing_hp_ratio") continue;
			const targetHpRatio = scalar.timing === "live" ? target.getHpPercent() : context.castSnapshot?.targetHpRatioBeforeEffects ?? target.getHpPercent();
			const missingHpRatio = Math.max(0, 1 - targetHpRatio);
			if (scalar.minMissingHpRatio !== void 0 && missingHpRatio <= Math.max(0, scalar.minMissingHpRatio) + 1e-9) continue;
			const coefficient = missingHpRatio * scalar.coefficientCap;
			const attributeValue = resolvedCaster.attributes.getValue(scalar.attribute);
			const amount = attributeValue * coefficient;
			damage += amount;
			if (amount > 0) damageComponents.push({
				kind: `target_missing_hp:${scalar.attribute}`,
				amount,
				mitigation: "normal",
				attackBase: attributeValue,
				segmentMultiplier: coefficient
			});
		}
		const bypassDefenseRatio = this.params.bypassDefense ? 1 : Math.max(0, Math.min(1, this.params.bypassDefenseRatio ?? 0));
		if (bypassDefenseRatio > 0) {
			const splitComponents = [];
			for (const component of damageComponents) {
				if (component.mitigation === "bypass_defense") {
					splitComponents.push(component);
					continue;
				}
				if (bypassDefenseRatio < 1) splitComponents.push({
					...component,
					amount: component.amount * (1 - bypassDefenseRatio),
					segmentMultiplier: component.segmentMultiplier === void 0 ? void 0 : component.segmentMultiplier * (1 - bypassDefenseRatio)
				});
				splitComponents.push({
					kind: `${component.kind}:bypass`,
					amount: component.amount * bypassDefenseRatio,
					mitigation: "bypass_defense"
				});
			}
			damageComponents.splice(0, damageComponents.length, ...splitComponents);
		}
		const activeTransform = ability instanceof ActiveSkill ? getActiveAbilityTransform(ability) : void 0;
		const transform = activeTransform ?? (ability instanceof ActiveSkill ? peekAbilityTransform(caster, ability) : void 0);
		const bonusDamageMemory = transform?.bonusDamageMemory;
		if (bonusDamageMemory) {
			const memory = readMemory(caster, bonusDamageMemory.key);
			if (memory.amount > 0) {
				const memoryDamage = Math.round(memory.amount * (bonusDamageMemory.ratio ?? 1));
				damage += memoryDamage;
				const normalIndex = damageComponents.findIndex((component) => component.mitigation === "normal" && component.attackBase !== void 0 && component.segmentMultiplier !== void 0);
				if (normalIndex >= 0) {
					const component = damageComponents[normalIndex];
					const multiplier = component.segmentMultiplier ?? 1;
					damageComponents[normalIndex] = {
						...component,
						amount: component.amount + memoryDamage,
						attackBase: (component.attackBase ?? 0) + memoryDamage / multiplier
					};
				} else damageComponents.push({
					kind: `memory:${bonusDamageMemory.key}`,
					amount: memoryDamage,
					mitigation: "normal",
					attackBase: memoryDamage,
					segmentMultiplier: 1
				});
				if (bonusDamageMemory.consume !== false) clearMemory(caster, bonusDamageMemory.key);
			}
		}
		if (buff && buff.stackRule === StackRule.STACK_LAYER && buff.tags.hasTag(GameplayTags.BUFF.DOT.ROOT)) {
			const layer = buff.getLayer();
			damage *= layer;
			damageComponents.splice(0, damageComponents.length, ...damageComponents.map((component) => ({
				...component,
				amount: component.amount * layer,
				segmentMultiplier: component.segmentMultiplier === void 0 ? void 0 : component.segmentMultiplier * layer
			})));
		}
		if (damage <= 0) return;
		if (!activeTransform && ability instanceof ActiveSkill) consumeAbilityTransform(caster, ability);
		const conditionCritical = this.params.forceCriticalConditions?.length ? checkConditions(context, this.params.forceCriticalConditions) : false;
		const forceCritical = this.params.canCrit === false ? false : this.params.forceCritical || transform?.forceCritical || conditionCritical;
		const resolution = nextDamageSegment(requireResolution(context));
		context.emit({
			type: "DamageSegmentRequestedEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster: resolvedCaster,
			target,
			ability,
			buff,
			damageSource: this.params.damageSource ?? (context.triggerEvent?.type === "DamageSegmentAppliedEvent" ? DamageSource.REFLECT : DamageSource.DIRECT),
			damageType: this.params.damageType ?? (transform?.trueDamage ? DamageType.TRUE : this.inferDamageType(buff)),
			cause: this.params.cause ?? context.damageCause,
			damageComponents,
			baseDamage: damage,
			finalDamage: damage,
			forceCritical,
			canCrit: this.params.canCrit ?? true,
			canLifesteal: this.params.canLifesteal ?? true,
			isCritical: forceCritical ? true : void 0,
			resolution
		});
		if (transform?.addDispel && !transform.addDispelApplied) {
			transform.addDispelApplied = true;
			executeEffectConfigs([transform.addDispel], context);
		}
	}
	inferDamageType(buff) {
		if (buff?.tags.hasTag(GameplayTags.BUFF.DOT.ROOT)) return DamageType.DOT;
		const attribute = this.params.value.attribute;
		if (attribute === AttributeType.MAGIC_ATK || attribute === AttributeType.MAGIC_DEF) return DamageType.MAGICAL;
		if (attribute === AttributeType.ATK || attribute === AttributeType.DEF) return DamageType.PHYSICAL;
	}
};
EffectRegistry.getInstance().register("damage", (params) => new DamageEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/HealEffect.ts
/**
* 治疗原子效果
*/
var HealEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { caster, ability, buff } = context;
		const target = this.params.recipient === "caster" ? caster : context.target;
		const baseHeal = ValueCalculator.calculate(this.params.value, caster, target);
		if (baseHeal <= 0) return;
		const healAmplify = caster?.attributes.getValue(AttributeType.HEAL_AMPLIFY) ?? 0;
		const healAmount = Math.round(baseHeal * (1 + healAmplify));
		const appliedAmount = this.params.target === "mp" ? target.restoreMp(healAmount) : target.heal(healAmount);
		if (appliedAmount > 0) context.commit(target, {
			type: "recovery",
			resource: this.params.target === "mp" ? "mp" : "hp",
			amount: Math.round(appliedAmount),
			after: Math.round(this.params.target === "mp" ? target.getCurrentMp() : target.getCurrentHp())
		});
		if (appliedAmount <= 0) return;
		context.emit({
			type: "HealEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster,
			target,
			ability,
			buff,
			healAmount,
			appliedAmount,
			healType: this.params.target === "mp" ? "mp" : "hp"
		});
	}
};
EffectRegistry.getInstance().register("heal", (params) => new HealEffect(params));
//#endregion
//#region src/shared/config/realmProgression.ts
function getRealmDamagePressureMultiplier(delta) {
	if (delta === 0) return 1;
	const absDelta = Math.abs(delta);
	if (delta > 0) return Math.min(2.2, {
		1: 1.08,
		2: 1.16,
		3: 1.25,
		4: 1.4,
		5: 1.52,
		6: 1.64,
		7: 1.78,
		8: 1.95
	}[absDelta] ?? 1.95 + (absDelta - 8) * .05);
	return Math.max(.25, {
		1: .94,
		2: .88,
		3: .8,
		4: .68,
		5: .6,
		6: .52,
		7: .45,
		8: .38
	}[absDelta] ?? .38 - (absDelta - 8) * .03);
}
function getRealmEffectChanceMultiplier(delta) {
	if (delta > 0) return 1 + Math.min(.35, delta * .04);
	if (delta < 0) return Math.max(.55, 1 - Math.abs(delta) * .05);
	return 1;
}
//#endregion
//#region src/shared/engine/battle-v5/buffs/DataDrivenBuff.ts
/**
* 数据驱动的 BUFF (Data-Driven Buff)
*
* 职责：
* - 完全基于配置定义行为
* - 管理属性修改器和标签的生命周期
* - 通过监听战斗事件执行原子效果
*/
var DataDrivenBuff = class DataDrivenBuff extends Buff {
	_config;
	_instantiatedListeners = [];
	constructor(config) {
		super(config.id, config.name, config.type, config.duration, config.stackRule, config.description, config.maxLayers, config.logVisibility, config.dispelPolicy, config.countsAsStatus ?? true, config.statusVisibility, config.stackPriority, config.dispelMode, config.removeOnDeath, config.durationUnit);
		this._config = config;
	}
	getConfig() {
		return this._config;
	}
	addInstantiatedListener(runtime, effects) {
		this._instantiatedListeners.push({
			runtime,
			effects
		});
	}
	onActivate() {
		super.onActivate();
		if (!this._owner) return;
		if (this._config.statusTags) this._owner.tags.addTags(this._config.statusTags);
		this._mountAttributeModifiers();
		this._setupEventListeners();
	}
	onLayerChanged() {
		if (!this._owner) return;
		for (const [index, modifier] of (this._config.modifiers ?? []).entries()) {
			if (!modifier.scaleByLayer && !modifier.valueByLayer) continue;
			this._owner.attributes.removeModifier(this._attributeModifierId(index));
			this._mountAttributeModifier(index);
		}
		this._owner.updateDerivedStats();
	}
	_mountAttributeModifiers() {
		if (!this._owner || !this._config.modifiers) return;
		for (const [index] of this._config.modifiers.entries()) this._mountAttributeModifier(index);
	}
	_mountAttributeModifier(index) {
		if (!this._owner) return;
		const modifier = this._config.modifiers?.[index];
		if (!modifier) return;
		this._owner.attributes.addModifier({
			id: this._attributeModifierId(index),
			attrType: modifier.attrType,
			type: modifier.type,
			value: this._modifierValue(modifier),
			source: this
		});
	}
	_modifierValue(modifier) {
		if (modifier.valueByLayer?.length) return modifier.valueByLayer[Math.min(this.getLayer(), modifier.valueByLayer.length) - 1];
		return modifier.value * (modifier.scaleByLayer ? this.getLayer() : 1);
	}
	_attributeModifierId(index) {
		return `${this.id}:modifier:${index}`;
	}
	_setupEventListeners() {
		if (!this._owner) return;
		for (const listener of this._instantiatedListeners) {
			const mountedEffects = listener.effects.filter((entry) => {
				const key = entry.globalUnique?.key;
				return !key || claimGlobalUniqueEffect(this._owner, key, this);
			});
			if (mountedEffects.length === 0) continue;
			this._subscribeEvent(listener.runtime.eventType, (event) => this._executeEffects(listener.runtime, mountedEffects, event), listener.runtime.priority);
		}
	}
	_executeEffects(runtime, effects, event) {
		if (!this._owner) return;
		if (event.type === "RoundPostEvent" && this.durationUnit === "round" && !shouldTickBuffDuration(this._owner, this)) return;
		if (!shouldExecuteListener(this._owner, event, runtime, this)) return;
		const resolved = resolveListenerContext(this._owner, event, runtime.mapping);
		const attribution = this.getCombatAttributionV3();
		if (!attribution) throw new Error(`Buff ${this.id} has no CombatAttributionV3`);
		const context = EffectExecutionContextV3.buff({
			owner: attribution.owner,
			caster: resolved.caster,
			target: resolved.target,
			triggerEvent: event,
			buff: this,
			resolution: event.resolution
		});
		for (const { effect } of effects) executeGameplayEffectV3(effect, context);
	}
	onDeactivate(reason) {
		if (this._owner) {
			if (this._config.statusTags) this._owner.tags.removeTags(this._config.statusTags);
			this._owner.attributes.removeModifierBySource(this);
			releaseGlobalUniqueEffects(this._owner, this);
		}
		super.onDeactivate(reason);
	}
	clone() {
		const cloned = new DataDrivenBuff(this._config);
		cloned.tags = this.tags.clone();
		cloned.setDuration(this.getDuration());
		cloned.setLayer(this.getLayer());
		for (const listener of this._instantiatedListeners) cloned.addInstantiatedListener({
			...listener.runtime,
			mapping: { ...listener.runtime.mapping },
			guard: { ...listener.runtime.guard },
			triggerPolicy: listener.runtime.triggerPolicy ? { ...listener.runtime.triggerPolicy } : void 0,
			conditions: listener.runtime.conditions?.map((condition) => ({
				...condition,
				params: { ...condition.params }
			}))
		}, [...listener.effects]);
		return cloned;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/factories/BuffFactory.ts
/**
* BUFF 工厂
* 
* 职责：
* - 将强类型的 BuffConfig 转换为 DataDrivenBuff 实例
* - 装配监听器和效果链
*/
var BuffFactory = class {
	static assertListenerContract(listener) {
		if (!listener.scope) throw new Error(`Listener ${listener.eventType} is missing required field: scope`);
	}
	/**
	* 根据配置创建 BUFF 实例
	*/
	static create(config) {
		for (const modifier of config.modifiers ?? []) {
			if (modifier.scaleByLayer && modifier.valueByLayer) throw new Error(`Buff ${config.id} 的 scaleByLayer 与 valueByLayer 不能同时配置`);
			if (modifier.valueByLayer && modifier.valueByLayer.length === 0) throw new Error(`Buff ${config.id} 的 valueByLayer 不能为空数组`);
		}
		const buff = new DataDrivenBuff(config);
		if (config.tags) buff.tags.addTags(config.tags);
		if (config.listeners) for (const [listenerIndex, listener] of config.listeners.entries()) {
			this.assertListenerContract(listener);
			const instantiatedEffects = listener.effects.map((effCfg) => {
				const effect = this.createEffect(effCfg);
				return effect ? {
					effect,
					globalUnique: effCfg.globalUnique
				} : null;
			}).filter((e) => e !== null);
			buff.addInstantiatedListener(buildListenerRuntimeConfig(listener, `${config.id}:buff:${listenerIndex}`), instantiatedEffects);
		}
		return buff;
	}
	/**
	* 创建效果执行器
	* 委托给 AbilityFactory 以保持逻辑统一
	*/
	static createEffect(cfg) {
		return AbilityFactory.createEffect(cfg);
	}
};
//#endregion
//#region src/shared/engine/battle-v5/effects/ApplyBuffEffect.ts
function clampChance(value) {
	return Math.max(0, Math.min(1, value));
}
/**
* 施加 Buff 原子效果
*/
var ApplyBuffEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { caster } = context;
		const target = this.params.target === "caster" ? caster : context.target;
		const isHostile = caster !== target;
		let finalChance = this.params.chance ?? 1;
		const buffPreview = BuffFactory.create(this.params.buffConfig);
		if (isHostile && (buffPreview.type === BuffType.DEBUFF || buffPreview.type === BuffType.CONTROL)) {
			const casterRank = caster.getRealmMeta().realmRank;
			const targetRank = target.getRealmMeta().realmRank;
			if (casterRank !== void 0 && targetRank !== void 0) finalChance *= getRealmEffectChanceMultiplier(casterRank - targetRank);
		}
		const resolvedChance = clampChance(finalChance);
		if (resolvedChance <= 0) return;
		if (resolvedChance < 1 && context.owner.runtime.random.next() > resolvedChance) return;
		const buff = buffPreview;
		buff.setLayer(Math.max(1, Math.trunc(this.params.layers ?? 1)));
		if (buff.type === BuffType.CONTROL && isHostile) {
			const controlResistance = target.attributes.getValue(AttributeType.CONTROL_RESISTANCE);
			const controlHit = caster.attributes.getValue(AttributeType.CONTROL_HIT) + (this.params.controlHitBonus ?? 0);
			const resistChance = Math.max(0, (controlResistance - controlHit) * 100);
			if (context.owner.runtime.random.next() * 100 < resistChance) {
				context.commit(target, {
					type: "defense",
					defense: "resist"
				});
				context.emit({
					type: "ControlResistEvent",
					timestamp: context.owner.runtime.clock.now(),
					caster,
					target,
					ability: context.ability,
					buff
				});
				executeEffectConfigs(this.params.onResistEffects ?? [], context);
				return;
			}
		}
		if (buff.type === BuffType.CONTROL && !buff.isPermanent()) {
			const controlResistance = target.attributes.getValue(AttributeType.CONTROL_RESISTANCE);
			if (controlResistance > 0) {
				const currentDuration = buff.getDuration();
				const adjustedDuration = Math.max(1, Math.round(currentDuration / (1 + controlResistance)));
				buff.refreshToDuration(adjustedDuration);
			}
		}
		target.buffs.addBuff(buff, caster, {
			ability: context.ability,
			buff: context.buff,
			attribution: CombatAttributionV3.rebind(context.owner, context.origin),
			trace: context.trace,
			resolution: context.resolution
		});
	}
};
EffectRegistry.getInstance().register("apply_buff", (params) => new ApplyBuffEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/ResourceDrainEffect.ts
/**
* 资源夺取原子效果 (吸血/吸蓝)
* 依赖于触发它的伤害事件数据
*/
var ResourceDrainEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { caster, target, ability, triggerEvent } = context;
		if (!triggerEvent || triggerEvent.type !== "DamageSegmentAppliedEvent") return;
		const amount = Math.round(triggerEvent.damageTaken * this.params.ratio);
		if (amount <= 0) return;
		const appliedAmount = this.params.targetType === "hp" ? caster.heal(amount) : caster.restoreMp(amount);
		if (appliedAmount <= 0) return;
		context.commit(caster, {
			type: "recovery",
			resource: this.params.targetType,
			amount: Math.round(appliedAmount),
			after: Math.round(this.params.targetType === "hp" ? caster.getCurrentHp() : caster.getCurrentMp())
		});
		context.emit({
			type: "ResourceDrainEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster,
			target,
			ability,
			drainType: this.params.targetType,
			amount: appliedAmount
		});
	}
};
EffectRegistry.getInstance().register("resource_drain", (params) => new ResourceDrainEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/DispelEffect.ts
/**
* 驱散原子效果
* 用于驱散正面或负面状态 (基于标签体系)
*/
var DispelEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { caster, ability } = context;
		const target = this.params.recipient === "caster" ? caster : context.target;
		const buffs = target.buffs.getAllBuffs();
		const matchBuffs = this.params.targetTag ? buffs.filter((b) => b.tags.hasTag(this.params.targetTag)) : buffs;
		const removableBuffs = (this.params.status ? matchBuffs.filter((buff) => this.params.status === "positive" ? buff.type === BuffType.BUFF : buff.type === BuffType.DEBUFF || buff.type === BuffType.CONTROL) : matchBuffs).filter((buff) => buff.dispelPolicy === "normal");
		if (removableBuffs.length === 0) {
			executeEffectConfigs(this.params.fallbackEffects ?? [], context);
			return;
		}
		const countToRemove = Math.min(removableBuffs.length, this.params.maxCount || 1);
		const removedBuffNames = [];
		for (let i = 0; i < countToRemove; i++) {
			if (!context.canExecuteEffect()) break;
			if (target.buffs.removeBuffDispel(removableBuffs[i].id, {
				source: caster,
				ability,
				attribution: context.attribution,
				trace: context.trace,
				resolution: context.resolution
			})) removedBuffNames.push(removableBuffs[i].name);
		}
		if (!context.canExecuteEffect()) return;
		if (removedBuffNames.length === 0) {
			executeEffectConfigs(this.params.fallbackEffects ?? [], context);
			return;
		}
		context.emit({
			type: "DispelEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster,
			target,
			ability,
			removedBuffNames
		});
		executeEffectConfigs(this.params.effects ?? [], context);
	}
};
EffectRegistry.getInstance().register("dispel", (params) => new DispelEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/ShieldEffect.ts
/**
* 护盾原子效果
*/
var ShieldEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { caster, ability } = context;
		const target = this.params.target === "caster" ? caster : context.target;
		const shieldAmount = ValueCalculator.calculate(this.params.value, caster, target);
		if (shieldAmount <= 0) return;
		const before = target.getCurrentShield();
		target.addShield(shieldAmount);
		const applied = target.getCurrentShield() - before;
		if (applied > 0) context.commit(target, {
			type: "shield",
			amount: Math.round(applied),
			after: Math.round(target.getCurrentShield())
		});
		context.emit({
			type: "ShieldEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster,
			target,
			ability,
			shieldAmount
		});
	}
};
EffectRegistry.getInstance().register("shield", (params) => new ShieldEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/MagicShieldEffect.ts
/**
* 魔法盾原子效果
* 以法力换取伤害吸收，不占用实体护盾池。
*/
var MagicShieldEffect = class extends GameplayEffect {
	params;
	constructor(params = {}) {
		super();
		this.params = params;
	}
	execute(context) {
		const { triggerEvent } = context;
		if (!triggerEvent || triggerEvent.type !== "DamageSegmentRequestedEvent") return;
		const damageEvent = triggerEvent;
		if (damageEvent.finalDamage <= 0) return;
		const absorbRatio = Math.max(0, Math.min(1, this.params.absorbRatio ?? .98));
		const maxAbsorbableDamage = Math.floor(damageEvent.finalDamage * absorbRatio);
		if (maxAbsorbableDamage <= 0) return;
		const mpConsumed = damageEvent.target.takeMp(maxAbsorbableDamage);
		if (mpConsumed <= 0) return;
		damageEvent.finalDamage = Math.max(0, damageEvent.finalDamage - mpConsumed);
		context.commit(damageEvent.target, {
			type: "defense",
			defense: "mana_shield",
			amount: Math.round(mpConsumed),
			detail: `消耗${Math.round(mpConsumed)}点法力`
		});
		context.emit({
			type: "ManaShieldAbsorbEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster: damageEvent.caster,
			target: damageEvent.target,
			ability: damageEvent.ability,
			buff: damageEvent.buff,
			absorbedDamage: mpConsumed,
			mpConsumed,
			remainDamage: damageEvent.finalDamage
		});
	}
};
EffectRegistry.getInstance().register("magic_shield", (params) => new MagicShieldEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/core/attributeMeta.ts
/**
* 百分比语义属性：
* - FIXED 代表直接增加 0.12 / 0.25 这类百分比点数
* - ADD 代表在当前底座上再乘一个百分比系数
*/
var PERCENTAGE_ATTRIBUTE_TYPES = /* @__PURE__ */ new Set([
	AttributeType.CRIT_RATE,
	AttributeType.CRIT_DAMAGE_MULT,
	AttributeType.EVASION_RATE,
	AttributeType.CONTROL_HIT,
	AttributeType.CONTROL_RESISTANCE,
	AttributeType.ARMOR_PENETRATION,
	AttributeType.MAGIC_PENETRATION,
	AttributeType.CRIT_RESIST,
	AttributeType.CRIT_DAMAGE_REDUCTION,
	AttributeType.ACCURACY,
	AttributeType.HEAL_AMPLIFY,
	AttributeType.HEAL_RECEIVED_REDUCTION
]);
function isPercentageAttributeType(attrType) {
	return PERCENTAGE_ATTRIBUTE_TYPES.has(attrType);
}
//#endregion
//#region src/shared/engine/battle-v5/runtime/BattleClock.ts
var SystemBattleClock = class {
	now() {
		return Date.now();
	}
};
/** Deterministic logical clock for replay, tests and restored matches. */
var LogicalBattleClock = class {
	value;
	constructor(value = 0) {
		this.value = value;
	}
	now() {
		return this.value++;
	}
	exportState() {
		return this.value;
	}
	restoreState(value) {
		if (!Number.isSafeInteger(value) || value < 0) throw new Error("Battle clock state must be a non-negative safe integer");
		this.value = value;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/BattleResolutionError.ts
var BattleResolutionError = class extends Error {
	code;
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "BattleResolutionError";
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/reactionQueue.ts
/**
* Deterministic FIFO/priority queue for secondary combat reactions.
* Primary resolution events are dispatched synchronously; reactions produced
* while resolving one are drained only after the current event settles.
*/
var ReactionQueue = class {
	items = [];
	ordinal = 0;
	enqueue(event, priority) {
		this.items.push({
			event,
			priority,
			ordinal: ++this.ordinal
		});
		this.items.sort((a, b) => b.priority - a.priority || a.ordinal - b.ordinal);
	}
	dequeue() {
		return this.items.shift();
	}
	get size() {
		return this.items.length;
	}
	clear() {
		this.items.length = 0;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/EventBus.ts
/**
* Event Bus for combat event management
* Uses priority queue for event processing
* Singleton pattern for global access
*/
var EventBus = class EventBus {
	clock;
	static _instance;
	static DEFAULT_MAX_HISTORY_SIZE = 1e3;
	static UNSCOPED_SEQUENCE_ID = "sequence_v3_unscoped";
	static MAX_CAUSAL_DEPTH = 128;
	static get instance() {
		if (!this._instance) this._instance = new EventBus();
		return this._instance;
	}
	_subscribers = /* @__PURE__ */ new Map();
	_eventHistory = [];
	_sequenceStack = [];
	_causalContextStack = [];
	_sequenceCounter = 0;
	_eventCounter = 0;
	_ordinalCounter = 0;
	_resolutionCounter = 0;
	_narrativeCauseCounter = 0;
	_combatFactSink;
	_maxHistorySize = EventBus.DEFAULT_MAX_HISTORY_SIZE;
	_reactionQueue = new ReactionQueue();
	_publishDepth = 0;
	_reactionSteps = 0;
	static MAX_REACTION_STEPS = 1024;
	constructor(clock = new SystemBattleClock()) {
		this.clock = clock;
	}
	/**
	* Subscribe to an event type with handler and optional priority
	* Higher priority handlers execute first
	* Same priority handlers execute in insertion order
	* Returns the wrapped handler for use with unsubscribe
	*/
	subscribe(eventType, handler, priority = 0) {
		if (!this._subscribers.has(eventType)) this._subscribers.set(eventType, []);
		const subscribers = this._subscribers.get(eventType);
		const wrappedHandler = handler;
		subscribers.push({
			wrappedHandler,
			priority
		});
		subscribers.sort((a, b) => b.priority - a.priority);
		return handler;
	}
	/**
	* Unsubscribe a handler from an event type
	*/
	unsubscribe(eventType, handler) {
		const subscribers = this._subscribers.get(eventType);
		if (!subscribers) return;
		const wrappedHandler = handler;
		const filtered = subscribers.filter((s) => s.wrappedHandler !== wrappedHandler);
		if (filtered.length === 0) this._subscribers.delete(eventType);
		else this._subscribers.set(eventType, filtered);
	}
	/**
	* Publish an event to all subscribers
	* Automatically sets timestamp if not provided
	*/
	publish(event) {
		this._publishDepth += 1;
		try {
			return this._dispatch(this._prepare(event));
		} finally {
			this._publishDepth -= 1;
			if (this._publishDepth === 0) this._drainReactions();
		}
	}
	/** Queue a secondary reaction behind the current resolution boundary. */
	enqueueReaction(event, priority = 0) {
		const prepared = this._prepare(event);
		this._reactionQueue.enqueue(prepared, priority);
		if (this._publishDepth === 0) this._drainReactions();
		return prepared;
	}
	_drainReactions() {
		while (this._reactionQueue.size > 0) {
			if (++this._reactionSteps > EventBus.MAX_REACTION_STEPS) {
				this._reactionQueue.clear();
				this._reactionSteps = 0;
				throw new BattleResolutionError("BATTLE_REACTION_LIMIT_EXCEEDED", `Battle reaction steps exceeded ${EventBus.MAX_REACTION_STEPS}`);
			}
			const reaction = this._reactionQueue.dequeue();
			this.publish(reaction.event);
		}
		this._reactionSteps = 0;
	}
	/**
	* Publish an immutable result event. Unlike gameplay request events, result
	* events cannot be changed by subscribers during synchronous dispatch.
	*/
	publishImmutable(event) {
		const prepared = this._prepare(event);
		if (prepared.trace) Object.freeze(prepared.trace);
		Object.freeze(prepared);
		this._publishDepth += 1;
		try {
			return this._dispatch(prepared);
		} finally {
			this._publishDepth -= 1;
			if (this._publishDepth === 0) this._drainReactions();
		}
	}
	_prepare(event) {
		const sequence = this._sequenceStack[this._sequenceStack.length - 1];
		const parentContext = this._causalContextStack[this._causalContextStack.length - 1];
		const reservedTrace = event.trace;
		const eventId = reservedTrace?.eventId ?? this.nextEventId();
		return Object.assign(event, {
			timestamp: event.timestamp ?? this.clock.now(),
			trace: {
				eventId,
				sequenceId: reservedTrace?.sequenceId ?? sequence?.id ?? EventBus.UNSCOPED_SEQUENCE_ID,
				ordinal: reservedTrace?.ordinal ?? ++this._ordinalCounter,
				parentEventId: reservedTrace?.parentEventId ?? parentContext?.trace?.eventId,
				resolutionId: reservedTrace?.resolutionId ?? parentContext?.trace?.resolutionId,
				narrativeCauseId: reservedTrace?.narrativeCauseId ?? parentContext?.trace?.narrativeCauseId
			},
			origin: event.origin ?? parentContext?.origin,
			resolution: event.resolution ?? parentContext?.resolution
		});
	}
	_dispatch(eventWithTimestamp) {
		this._eventHistory.push(eventWithTimestamp);
		if (this._eventHistory.length > this._maxHistorySize) this._eventHistory.shift();
		if (eventWithTimestamp.type === "CombatResultCommittedEventV3") this._combatFactSink?.record(eventWithTimestamp);
		const subscribers = this._subscribers.get(eventWithTimestamp.type);
		if (!subscribers) return eventWithTimestamp;
		const dispatchList = [...subscribers];
		if (this._causalContextStack.length >= EventBus.MAX_CAUSAL_DEPTH) throw new BattleResolutionError("BATTLE_RESOLUTION_LIMIT_EXCEEDED", `Battle causal depth exceeded ${EventBus.MAX_CAUSAL_DEPTH}`);
		this._causalContextStack.push({
			trace: eventWithTimestamp.trace,
			origin: eventWithTimestamp.origin,
			resolution: eventWithTimestamp.resolution
		});
		try {
			for (const subscriber of dispatchList) subscriber.wrappedHandler(eventWithTimestamp);
		} finally {
			this._causalContextStack.pop();
		}
		return eventWithTimestamp;
	}
	runInSequence(scope, callback) {
		const resolved = {
			...scope,
			id: scope.id ?? `sequence_v3_${++this._sequenceCounter}`
		};
		this._sequenceStack.push(resolved);
		try {
			return callback(resolved);
		} finally {
			this._sequenceStack.pop();
		}
	}
	runInCausalContext(context, callback) {
		if (this._causalContextStack.length >= EventBus.MAX_CAUSAL_DEPTH) throw new BattleResolutionError("BATTLE_RESOLUTION_LIMIT_EXCEEDED", `Battle causal depth exceeded ${EventBus.MAX_CAUSAL_DEPTH}`);
		this._causalContextStack.push(context);
		try {
			return callback();
		} finally {
			this._causalContextStack.pop();
		}
	}
	reserveTrace(options) {
		const sequence = this.getCurrentSequence();
		const parentTrace = this.getCurrentTrace();
		return {
			eventId: this.nextEventId(),
			sequenceId: sequence?.id ?? EventBus.UNSCOPED_SEQUENCE_ID,
			ordinal: ++this._ordinalCounter,
			parentEventId: options?.parentEventId ?? parentTrace?.eventId,
			resolutionId: options?.resolutionId ?? parentTrace?.resolutionId,
			narrativeCauseId: options?.narrativeCauseId ?? parentTrace?.narrativeCauseId
		};
	}
	nextNarrativeCauseId() {
		return `narrative_v3_${++this._narrativeCauseCounter}`;
	}
	reserveResolutionTrace(parentEventId) {
		const resolutionId = `resolution_v3_${++this._resolutionCounter}`;
		return {
			...this.reserveTrace({
				resolutionId,
				parentEventId
			}),
			resolutionId
		};
	}
	getCurrentSequence() {
		return this._sequenceStack[this._sequenceStack.length - 1];
	}
	getCurrentOrigin() {
		return this._causalContextStack[this._causalContextStack.length - 1]?.origin;
	}
	getCurrentTrace() {
		return this._causalContextStack[this._causalContextStack.length - 1]?.trace;
	}
	attachCombatFactSink(sink) {
		if (this._combatFactSink && this._combatFactSink !== sink) throw new Error("EventBus already has an active combat fact sink");
		this._combatFactSink = sink;
	}
	detachCombatFactSink(sink) {
		if (this._combatFactSink === sink) this._combatFactSink = void 0;
	}
	nextEventId() {
		return `event_v3_${++this._eventCounter}`;
	}
	/**
	* Get readonly event history
	*/
	getEventHistory() {
		return this._eventHistory;
	}
	/**
	* Clear event history
	*/
	clearHistory() {
		this._eventHistory = [];
	}
	exportCursor() {
		if (this._sequenceStack.length || this._causalContextStack.length) throw new Error("EventBus cursor can only be exported at a quiescent boundary");
		return {
			sequenceCounter: this._sequenceCounter,
			eventCounter: this._eventCounter,
			ordinalCounter: this._ordinalCounter,
			resolutionCounter: this._resolutionCounter,
			narrativeCauseCounter: this._narrativeCauseCounter
		};
	}
	restoreCursor(cursor) {
		if (this._eventHistory.length || this._sequenceStack.length || this._causalContextStack.length) throw new Error("EventBus cursor must be restored into a fresh bus");
		for (const value of Object.values(cursor)) if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid EventBus cursor");
		this._sequenceCounter = cursor.sequenceCounter;
		this._eventCounter = cursor.eventCounter;
		this._ordinalCounter = cursor.ordinalCounter;
		this._resolutionCounter = cursor.resolutionCounter;
		this._narrativeCauseCounter = cursor.narrativeCauseCounter;
	}
	/**
	* Reset all subscribers and event history.
	*
	* @remarks
	* After calling `reset()`, all registered handlers (including those registered
	* by `Ability` instances via `AbilityFactory.fromAbilityConfig`) are removed.
	* Callers must re-register handlers before publishing events — typically by
	* re-creating Ability objects or calling their registration methods again.
	*
	* This method is intended for use in tests (`beforeEach`/`afterEach`) to
	* ensure test isolation. Avoid calling it in production code.
	*/
	reset() {
		this._subscribers.clear();
		this._eventHistory = [];
		this._sequenceStack = [];
		this._causalContextStack = [];
		this._sequenceCounter = 0;
		this._eventCounter = 0;
		this._ordinalCounter = 0;
		this._resolutionCounter = 0;
		this._narrativeCauseCounter = 0;
		this._reactionQueue.clear();
		this._publishDepth = 0;
		this._reactionSteps = 0;
		this._combatFactSink = void 0;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/effects/ReflectEffect.ts
/**
* 反伤原子效果
* 订阅受击事件并在造成伤害后反馈给攻击者
*/
var ReflectEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { triggerEvent, target } = context;
		if (!triggerEvent || triggerEvent.type !== "DamageSegmentAppliedEvent") return;
		const damageTakenEvent = triggerEvent;
		if (damageTakenEvent.damageSource === DamageSource.REFLECT || damageTakenEvent.damageSource === DamageSource.COUNTER || damageTakenEvent.damageSource === DamageSource.FOLLOW_UP || damageTakenEvent.damageSource === DamageSource.DELAYED) return;
		const layer = this.params.layerBuffId ? target.buffs.getAllBuffs().find((buff) => buff.id === this.params.layerBuffId)?.getLayer() ?? 0 : 0;
		const raw = Math.round(damageTakenEvent.damageTaken * (this.params.ratio + layer * (this.params.ratioPerLayer ?? 0)));
		const attacker = damageTakenEvent.caster;
		const damageToReflect = this.params.maxHpRatioPerAction ? claimActionAmount(attacker ?? target, `reflect:${target.id}:${this.params.layerBuffId ?? "generic"}`, raw, Math.round(target.getMaxHp() * this.params.maxHpRatioPerAction)) : raw;
		if (damageToReflect <= 0) return;
		if (attacker && attacker.isAlive()) context.emit({
			type: "DamageSegmentRequestedEvent",
			resolution: requireResolution(context),
			timestamp: context.owner.runtime.clock.now(),
			caster: target,
			target: attacker,
			damageSource: DamageSource.REFLECT,
			damageType: damageTakenEvent.damageType,
			baseDamage: damageToReflect,
			finalDamage: damageToReflect
		});
	}
};
EffectRegistry.getInstance().register("reflect", (params) => new ReflectEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/v3/mechanics.ts
var CombatMechanicCodeV3 = {
	ABILITY_LOCK: "ability_lock",
	CONTROL_SKIP: "control_skip",
	COOLDOWN_MODIFY: "cooldown_modify",
	DAMAGE_DEFER: "damage_defer",
	HP_SACRIFICE: "hp_sacrifice",
	MANA_BURN: "mana_burn",
	NEXT_HIT_RULE: "next_hit_rule",
	TAG_TRIGGER: "tag_trigger"
};
//#endregion
//#region src/shared/engine/battle-v5/effects/ManaBurnEffect.ts
/**
* 焚元原子效果
* 削减目标的法力
*/
var ManaBurnEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { caster, target, ability } = context;
		const burnAmount = ValueCalculator.calculate(this.params.value, caster, target);
		if (burnAmount <= 0) return;
		const actualBurned = target.takeMp(burnAmount);
		if (actualBurned <= 0) return;
		context.commit(target, {
			type: "mechanic",
			code: CombatMechanicCodeV3.MANA_BURN,
			payload: {
				kind: "mana_burn",
				amount: Math.round(actualBurned)
			}
		});
		context.emit({
			type: "ManaBurnEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster,
			target,
			ability,
			burnAmount: actualBurned
		});
	}
};
EffectRegistry.getInstance().register("mana_burn", (params) => new ManaBurnEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/CooldownModifyEffect.ts
/**
* 冷却修改原子效果
* 扰动技能的时序逻辑
*/
var CooldownModifyEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const rounds = Math.round(this.params.cdModifyValue);
		if (rounds === 0) return;
		const { target, caster, ability } = context;
		const recipient = this.params.target === "caster" ? caster : target;
		const matchedSkills = recipient.abilities.getAllAbilities().filter((skill) => skill instanceof ActiveSkill && (this.params.includeCurrent || ability !== skill) && (!this.params.tags || skill.tags.hasAnyTag(this.params.tags)));
		const countToModify = this.params.maxCount === void 0 ? matchedSkills.length : Math.min(matchedSkills.length, Math.max(0, Math.floor(this.params.maxCount)));
		for (let i = 0; i < countToModify; i++) {
			if (!context.canExecuteEffect()) break;
			const skill = matchedSkills[i];
			skill.modifyCooldown(rounds);
			context.commit(recipient, {
				type: "mechanic",
				code: CombatMechanicCodeV3.COOLDOWN_MODIFY,
				payload: {
					kind: "cooldown_change",
					abilityName: skill.name,
					rounds
				}
			});
			context.emit({
				type: "CooldownModifyEvent",
				timestamp: context.owner.runtime.clock.now(),
				caster,
				target: recipient,
				ability,
				cdModifyValue: rounds,
				affectedAbilityName: skill.name
			});
		}
	}
};
EffectRegistry.getInstance().register("cooldown_modify", (params) => new CooldownModifyEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/BuffDurationModifyEffect.ts
/**
* BUFF 持续时间扰动效果
* 用于在 BuffAddEvent 上延长符合条件的正面/负面状态持续时间。
*/
var BuffDurationModifyEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { triggerEvent } = context;
		if (!triggerEvent || triggerEvent.type !== "BuffAddEvent") return;
		const targetBuff = triggerEvent.buff;
		if (targetBuff.isPermanent()) return;
		if (this.params.tags && this.params.tags.length > 0 && !targetBuff.tags.hasAnyTag(this.params.tags)) return;
		const nextDuration = Math.max(1, targetBuff.getMaxDuration() + this.params.rounds);
		targetBuff.refreshToDuration(nextDuration);
	}
};
EffectRegistry.getInstance().register("buff_duration_modify", (params) => new BuffDurationModifyEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/DeathPreventEffect.ts
/**
* 免死原子效果
*/
var DeathPreventEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { target, triggerEvent, ability, buff } = context;
		if (!triggerEvent || triggerEvent.type !== "DamageSegmentAppliedEvent") return;
		const damageTakenEvent = triggerEvent;
		if (damageTakenEvent.hpReachedZeroBeforeReactions && target.getCurrentHp() <= 0) {
			const sourceKey = this.params.triggerKey ?? ability?.id ?? buff?.id ?? "death_prevent";
			const runtimeState = getBattleRuntimeState(target);
			if (runtimeState.deathPreventTriggers.has(sourceKey)) return;
			let hpFloor = 1;
			if (this.params.hpFloorPercent !== void 0) hpFloor = Math.max(1, Math.floor(target.getMaxHp() * Math.min(this.params.hpFloorPercent, 1)));
			target.setHp(hpFloor, "death_prevent");
			runtimeState.deathPreventTriggers.add(sourceKey);
			if (damageTakenEvent.resolution) markDeathProtectedHit(target, damageTakenEvent.resolution.hitId, damageTakenEvent.damageSource);
			context.commit(target, {
				type: "death_prevented",
				sourceKey,
				sourceName: ability?.name ?? buff?.name
			});
			context.emit({
				type: "DeathPreventEvent",
				timestamp: context.owner.runtime.clock.now(),
				target,
				ability,
				sourceKey,
				sourceName: ability?.name ?? buff?.name
			});
		}
	}
};
EffectRegistry.getInstance().register("death_prevent", (params) => new DeathPreventEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/BuffImmunityEffect.ts
/**
* BUFF 免疫原子效果
*/
var BuffImmunityEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { triggerEvent, target } = context;
		if (!triggerEvent || triggerEvent.type !== "BuffAddEvent") return;
		const event = triggerEvent;
		if (event.isCancelled) return;
		const matchedTag = this.params.tags.find((tag) => event.buff.tags.hasTag(tag));
		if (!matchedTag) return;
		event.isCancelled = true;
		event.immuneTag = matchedTag;
		context.commit(target, {
			type: "status",
			operation: "immune",
			statusId: event.buff.id,
			statusName: event.buff.name,
			statusType: event.buff.type
		});
		context.emit({
			type: "BuffImmuneEvent",
			timestamp: context.owner.runtime.clock.now(),
			target,
			buff: event.buff,
			immuneTag: matchedTag
		});
	}
};
EffectRegistry.getInstance().register("buff_immunity", (params) => new BuffImmunityEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/DamageImmunityEffect.ts
/**
* 伤害免疫原子效果
*/
var DamageImmunityEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { triggerEvent, target } = context;
		if (!triggerEvent || triggerEvent.type !== "DamageSegmentRequestedEvent") return;
		const event = triggerEvent;
		if (event.finalDamage <= 0) return;
		const matchedTag = this.params.tags.find((tag) => matchesDamageTag(event, tag));
		if (!matchedTag) return;
		const blockedDamage = event.finalDamage;
		event.finalDamage = 0;
		context.commit(target, {
			type: "defense",
			defense: "damage_immune",
			amount: Math.round(blockedDamage)
		});
		context.emit({
			type: "DamageImmuneEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster: event.caster,
			target,
			ability: event.ability,
			buff: event.buff,
			blockedDamage,
			matchedTag
		});
	}
};
function matchesDamageTag(event, tag) {
	if (tag === GameplayTags.ABILITY.CHANNEL.MAGIC) return event.damageType === DamageType.MAGICAL;
	if (tag === GameplayTags.ABILITY.CHANNEL.TRUE) return event.damageType === DamageType.TRUE;
	if (tag === GameplayTags.ABILITY.CHANNEL.PHYSICAL) return event.damageType === DamageType.PHYSICAL;
	return event.ability?.tags.hasTag(tag) || event.buff?.tags.hasTag(tag) || event.damageTags?.includes(tag) || false;
}
EffectRegistry.getInstance().register("damage_immunity", (params) => new DamageImmunityEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/SkillImmunityEffect.ts
/**
* 在施法前摇阶段拦截整个技能。
*
* 与 buff_immunity / damage_immunity 不同，这里不参与技能效果结算，
* 而是直接将 SkillPreCastEvent 标记为已免疫，由 ActionExecutionSystem
* 统一取消本次施法。因此技能的伤害、治疗、控制、Buff 和费用效果都不会执行。
*/
var SkillImmunityEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const event = context.triggerEvent;
		if (!event || event.type !== "SkillPreCastEvent") return;
		const skillEvent = event;
		if (skillEvent.isImmune) return;
		if (skillEvent.caster.teamId === skillEvent.target.teamId) return;
		skillEvent.isImmune = true;
		skillEvent.isInterrupted = true;
		skillEvent.immunityReason = this.params.reason;
	}
};
EffectRegistry.getInstance().register("skill_immunity", (params) => new SkillImmunityEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/TagTriggerEffect.ts
/**
* 标签触发原子效果
* 检查目标是否有指定标签，如果有则执行后续逻辑
*/
var TagTriggerEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { target, caster, ability } = context;
		if (this.params.triggerTag !== GameplayTags.STATUS.ROOT && !target.tags.hasTag(this.params.triggerTag)) return;
		const narrativeContext = context.withNarrativeCause();
		narrativeContext.commitCue(target, {
			type: "mechanic",
			code: CombatMechanicCodeV3.TAG_TRIGGER,
			payload: {
				kind: "tag_trigger",
				label: this.params.displayName ?? "特殊效果"
			}
		});
		narrativeContext.emit({
			type: "TagTriggerEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster,
			target,
			ability,
			tag: this.params.triggerTag,
			displayName: this.params.displayName
		});
		if (!narrativeContext.canExecuteEffect()) return;
		if (this.params.effects && this.params.effects.length > 0) executeEffectConfigs(this.params.effects, narrativeContext);
		else executeGameplayEffectV3(new DamageEffect({ value: {
			base: 50,
			coefficient: this.params.damageRatio || 2,
			attribute: AttributeType.SPIRIT
		} }), narrativeContext);
		if (!narrativeContext.canExecuteEffect()) return;
		if (this.params.removeOnTrigger) {
			const targetBuff = target.buffs.getAllBuffs().find((b) => b.tags.hasTag(this.params.triggerTag));
			if (targetBuff) target.buffs.removeBuff(targetBuff.id, {
				ability: narrativeContext.ability,
				buff: narrativeContext.buff,
				attribution: narrativeContext.attribution,
				trace: narrativeContext.trace,
				resolution: narrativeContext.resolution
			});
		}
	}
};
EffectRegistry.getInstance().register("tag_trigger", (params) => new TagTriggerEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/PercentDamageModifierEffect.ts
/**
* 百分比增减伤原子效果
* 仅写入 DamageSegmentRequestedEvent 的同乘区桶，不直接乘算伤害。
*/
var PercentDamageModifierEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const { triggerEvent } = context;
		if (!triggerEvent || triggerEvent.type !== "DamageSegmentRequestedEvent") return;
		const damageRequestEvent = triggerEvent;
		if (damageRequestEvent.calculationMode === "resolved_final") return;
		if (damageRequestEvent.damageSource === DamageSource.REFLECT) return;
		if (this.params.allowedDamageSources && (!damageRequestEvent.damageSource || !this.params.allowedDamageSources.includes(damageRequestEvent.damageSource))) return;
		if (damageRequestEvent.damageType && this.params.excludedDamageTypes?.includes(damageRequestEvent.damageType)) return;
		const layerScale = this.params.scaleByBuffLayer ? context.buff?.getLayer() ?? 1 : 1;
		const rawValue = Math.max(0, this.params.value * layerScale);
		const value = this.params.cap ? Math.min(rawValue, this.params.cap) : rawValue;
		if (this.params.mode === "increase") damageRequestEvent.damageIncreasePctBucket = (damageRequestEvent.damageIncreasePctBucket ?? 0) + value;
		else if (this.params.mode === "reduce") damageRequestEvent.damageReductionPctBucket = (damageRequestEvent.damageReductionPctBucket ?? 0) + value;
		if (this.params.logTriggerName && value > 0) context.commit(damageRequestEvent.target, {
			type: "mechanic",
			code: "conditional_damage_modifier_trigger",
			payload: {
				kind: "named_trigger",
				label: this.params.logTriggerName
			}
		});
	}
};
EffectRegistry.getInstance().register("percent_damage_modifier", (params) => new PercentDamageModifierEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/advancedEffectUtils.ts
function matchesBuff(buff, match) {
	if (!match) return true;
	if (match.id && buff.id !== match.id) return false;
	if (match.tags && match.tags.length > 0) return match.tags.some((tag) => buff.tags.hasTag(tag));
	return true;
}
function findMatchingBuffs(target, match) {
	return target.buffs.getAllBuffs().filter((buff) => matchesBuff(buff, match));
}
function commitMechanicResultV3(context, event) {
	if (event.visibility === "debug") return;
	context.commit(event.target, {
		type: "mechanic",
		code: event.code,
		payload: event.payload
	});
}
function abilityTransformModifiersV3(params) {
	const modifiers = [];
	if (params.trueDamage) modifiers.push({ kind: "true_damage" });
	if (params.addDispel) modifiers.push({ kind: "dispel" });
	if (params.mpCostToHp) modifiers.push({ kind: "mp_cost_to_hp" });
	if (params.freeManaCost) modifiers.push({ kind: "free_mana_cost" });
	if (params.cooldownModify !== void 0) {
		const cooldownRounds = Math.round(params.cooldownModify);
		if (cooldownRounds !== 0) modifiers.push({
			kind: "cooldown",
			rounds: cooldownRounds
		});
	}
	if (params.forceCritical) modifiers.push({ kind: "force_critical" });
	if (params.bonusDamageMemory) modifiers.push({ kind: "stored_damage" });
	return modifiers;
}
//#endregion
//#region src/shared/engine/battle-v5/effects/ConsumeStatusTriggerEffect.ts
var ConsumeStatusTriggerEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const unit = this.params.target === "caster" ? context.caster : context.target;
		const buff = findMatchingBuffs(unit, this.params.match)[0];
		if (!buff) {
			executeEffectConfigs(this.params.fallbackEffects ?? [], context);
			return;
		}
		const consume = this.params.consume ?? "one";
		const beforeLayer = buff.getLayer();
		const delayedEffects = getDelayedBuffEffects(buff);
		const consumedLayers = consume === "all" ? beforeLayer : Math.min(beforeLayer, typeof consume === "number" ? Math.max(1, consume) : 1);
		if (consume === "all") unit.buffs.setBuffLayer(buff.id, 0, {
			source: context.caster,
			ability: context.ability,
			buff: context.buff,
			attribution: context.attribution,
			trace: context.trace,
			resolution: context.resolution,
			layerChangeReason: "consumed",
			statusDisplayName: this.params.displayName
		});
		else {
			const layers = typeof consume === "number" ? consume : 1;
			unit.buffs.modifyBuffLayer(buff.id, -Math.max(1, layers), {
				source: context.caster,
				ability: context.ability,
				buff: context.buff,
				attribution: context.attribution,
				trace: context.trace,
				resolution: context.resolution,
				layerChangeReason: "consumed",
				statusDisplayName: this.params.displayName
			});
		}
		const configuredEffects = this.params.effects.length > 0 ? this.params.effects : delayedEffects ?? [];
		const effects = this.params.aggregateDamageByLayer ? configuredEffects.map((effect) => aggregateDirectDamage(effect, consumedLayers)) : configuredEffects;
		const repeats = this.params.scaleEffectsByLayer && !this.params.aggregateDamageByLayer ? consumedLayers : 1;
		for (let index = 0; index < repeats; index += 1) {
			if (!context.canExecuteEffect()) break;
			executeEffectConfigs(effects, context);
		}
	}
};
function aggregateDirectDamage(effect, consumedLayers) {
	if (effect.type !== "damage" || consumedLayers === 1) return effect;
	const value = effect.params.value;
	return {
		...effect,
		params: {
			...effect.params,
			value: {
				...value,
				base: value.base === void 0 ? void 0 : value.base * consumedLayers,
				coefficient: value.attribute ? (value.coefficient ?? 1) * consumedLayers : value.coefficient,
				targetMaxHpRatio: value.targetMaxHpRatio === void 0 ? void 0 : value.targetMaxHpRatio * consumedLayers,
				targetMaxMpRatio: value.targetMaxMpRatio === void 0 ? void 0 : value.targetMaxMpRatio * consumedLayers
			},
			dynamicScalars: effect.params.dynamicScalars?.map((scalar) => ({
				...scalar,
				coefficientCap: scalar.coefficientCap * consumedLayers
			}))
		}
	};
}
EffectRegistry.getInstance().register("consume_status_trigger", (params) => new ConsumeStatusTriggerEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/DelayedEffect.ts
var DelayedRuntimeBuff = class DelayedRuntimeBuff extends Buff {
	params;
	remainingTurns;
	triggerCount = 0;
	resolution;
	constructor(params) {
		super(params.id, params.name, BuffType.DEBUFF, Math.max(1, Math.round(params.delayTurns)), StackRule.OVERRIDE, params.description);
		this.params = params;
		this.remainingTurns = Math.max(1, Math.round(params.delayTurns));
		this.tags.addTags(params.tags ?? [GameplayTags.BUFF.TYPE.DEBUFF]);
	}
	getParams() {
		return this.params;
	}
	setResolution(resolution) {
		if (resolution) this.resolution = resolution;
	}
	restoreRuntimeState(remainingTurns, triggerCount) {
		this.remainingTurns = Math.max(0, Math.trunc(remainingTurns));
		this.triggerCount = Math.max(0, Math.trunc(triggerCount));
		this.refreshToDuration(this.remainingTurns);
	}
	getRuntimeState() {
		return {
			remainingTurns: this.remainingTurns,
			triggerCount: this.triggerCount
		};
	}
	clone() {
		const cloned = new DelayedRuntimeBuff(this.params);
		cloned.tags = this.tags.clone();
		cloned.setLayer(this.getLayer());
		cloned.restoreDuration(this.getDuration(), this.getMaxDuration());
		cloned.remainingTurns = this.remainingTurns;
		cloned.triggerCount = this.triggerCount;
		cloned.resolution = this.resolution;
		return cloned;
	}
	onActivate() {
		super.onActivate();
		if (!this._owner) return;
		if (this.params.statusTags) this._owner.tags.addTags(this.params.statusTags);
		setDelayedBuffEffects(this, this.params.effects);
		if (this.params.record) this.subscribeRecordEvent();
		this._subscribeEvent("ActionPostEvent", (event) => {
			if (event.caster !== this._owner) return;
			this.resolution = event.resolution;
			this.remainingTurns -= 1;
			if (this.remainingTurns > 0) return;
			this.trigger();
		}, 30);
	}
	trigger() {
		if (!this._owner) return;
		if (this.triggerCount >= (this.params.maxTriggers ?? 1)) return;
		this.triggerCount += 1;
		const owner = this._owner;
		const attribution = this.getCombatAttributionV3();
		if (!attribution) throw new Error(`Delayed buff ${this.id} has no CombatAttributionV3`);
		const trace = this._eventBus.getCurrentTrace();
		if (!trace) throw new Error(`Delayed buff ${this.id} trigger has no causal trace`);
		owner.buffs.removeBuff(this.id, {
			attribution,
			trace,
			resolution: this.resolution
		});
		this.executeDelayedEffects(owner);
	}
	executeDelayedEffects(owner) {
		if (!this.resolution) throw new Error(`Delayed buff ${this.id} requires an explicit combat resolution`);
		const attribution = this.getCombatAttributionV3();
		if (!attribution) throw new Error(`Delayed buff ${this.id} has no CombatAttributionV3`);
		executeEffectConfigs(this.params.effects, EffectExecutionContextV3.buff({
			owner: attribution.owner,
			caster: this._source ?? owner,
			target: owner,
			buff: this,
			resolution: this.resolution
		}));
	}
	subscribeRecordEvent() {
		const record = this.params.record;
		if (!record || !this._owner) return;
		if (record.event === "damage_taken") {
			this._subscribeEvent("DamageSegmentAppliedEvent", (event) => {
				if (event.target !== this._owner || !this._owner) return;
				rememberAmount(this._owner, record.key, event.damageTaken, this.resolveRecordMaxStored());
			}, 30);
			return;
		}
		if (record.event === "heal") {
			this._subscribeEvent("HealEvent", (event) => {
				if (event.target !== this._owner || !this._owner) return;
				rememberAmount(this._owner, record.key, event.healAmount, this.resolveRecordMaxStored());
			}, 30);
			return;
		}
		if (record.event === "shield") {
			this._subscribeEvent("ShieldEvent", (event) => {
				if (event.target !== this._owner || !this._owner) return;
				rememberAmount(this._owner, record.key, event.shieldAmount, this.resolveRecordMaxStored());
			}, 30);
			return;
		}
		this._subscribeEvent("ShieldBreakEvent", (event) => {
			if (event.target !== this._owner || !this._owner) return;
			rememberAmount(this._owner, record.key, event.brokenShieldAmount, this.resolveRecordMaxStored());
		}, 30);
	}
	resolveRecordMaxStored() {
		const record = this.params.record;
		if (!record || !this._owner) return void 0;
		if (record.maxStoredValue) {
			const valueCap = ValueCalculator.calculate(record.maxStoredValue, this._source ?? this._owner, this._owner);
			if (record.maxStored !== void 0) return Math.min(record.maxStored, valueCap);
			return valueCap;
		}
		return record.maxStored;
	}
	onDeactivate(reason) {
		const owner = this._owner;
		if (owner && this.params.statusTags) owner.tags.removeTags(this.params.statusTags);
		if (owner && reason === "dispel" && this.params.triggerOnDispel && this.triggerCount < (this.params.maxTriggers ?? 1)) {
			this.triggerCount += 1;
			this.executeDelayedEffects(owner);
		}
		super.onDeactivate();
	}
};
var DelayedEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		context.target.buffs.addBuff(new DelayedRuntimeBuff(this.params), context.caster, {
			ability: context.ability,
			buff: context.buff,
			attribution: CombatAttributionV3.rebind(context.owner, context.origin),
			trace: context.trace,
			resolution: context.resolution
		});
	}
};
EffectRegistry.getInstance().register("delayed_effect", (params) => new DelayedEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/DamageMemoryEffect.ts
var DamageMemoryEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const owner = this.params.target === "target" ? context.target : context.caster;
		if (this.params.mode === "clear") {
			clearMemory(owner, this.params.key);
			return;
		}
		if (this.params.mode === "record") {
			const amount = this.getRecordAmount(context);
			if (amount > 0) {
				const stored = rememberAmount(owner, this.params.key, amount, this.resolveMaxStored(context, owner));
				commitMechanicResultV3(context, {
					code: this.params.key,
					target: owner,
					payload: {
						kind: "memory_record",
						source: this.params.event ?? "damage_taken",
						sampledAmount: amount,
						before: stored.before,
						after: stored.after
					}
				});
			}
			return;
		}
		const memory = readMemory(owner, this.params.key);
		const storedAmount = memory.amount > 0 ? memory.amount : this.getRecordAmount(context);
		const amount = Math.round(storedAmount * (this.params.ratio ?? 1));
		if (amount <= 0) return;
		const narrativeContext = context.withNarrativeCause();
		switch (this.params.releaseAs ?? "damage") {
			case "heal": {
				const appliedAmount = owner.heal(amount);
				if (appliedAmount > 0) narrativeContext.commit(owner, {
					type: "recovery",
					resource: "hp",
					amount: Math.round(appliedAmount),
					after: Math.round(owner.getCurrentHp())
				});
				narrativeContext.emit({
					type: "HealEvent",
					timestamp: context.owner.runtime.clock.now(),
					caster: context.caster,
					target: owner,
					ability: context.ability,
					buff: context.buff,
					healAmount: amount,
					appliedAmount,
					healType: "hp"
				});
				break;
			}
			case "shield": {
				const beforeShield = owner.getCurrentShield();
				owner.addShield(amount);
				const appliedShield = owner.getCurrentShield() - beforeShield;
				if (appliedShield > 0) narrativeContext.commit(owner, {
					type: "shield",
					amount: Math.round(appliedShield),
					after: Math.round(owner.getCurrentShield())
				});
				narrativeContext.emit({
					type: "ShieldEvent",
					timestamp: context.owner.runtime.clock.now(),
					caster: context.caster,
					target: owner,
					ability: context.ability,
					shieldAmount: amount
				});
				break;
			}
			case "reflect":
				if (narrativeContext.triggerEvent?.type === "DamageSegmentAppliedEvent") {
					const attacker = narrativeContext.triggerEvent.caster;
					if (attacker?.isAlive()) this.publishDamage(narrativeContext, narrativeContext.target, attacker, amount, DamageSource.REFLECT);
				}
				break;
			case "counter":
				this.publishDamage(narrativeContext, narrativeContext.caster, narrativeContext.target, amount, DamageSource.COUNTER);
				break;
			case "follow_up":
				this.publishDamage(narrativeContext, narrativeContext.caster, narrativeContext.target, amount, DamageSource.FOLLOW_UP);
				break;
			case "resolved_follow_up":
				this.publishDamage(narrativeContext, narrativeContext.caster, narrativeContext.target, amount, DamageSource.FOLLOW_UP, true);
				break;
			default: this.publishDamage(narrativeContext, narrativeContext.caster, narrativeContext.target, amount, DamageSource.DIRECT);
		}
		narrativeContext.commitCue(narrativeContext.target, {
			type: "mechanic",
			code: this.params.key,
			payload: {
				kind: "memory_release",
				amount,
				releaseAs: this.params.releaseAs === "resolved_follow_up" ? "follow_up" : this.params.releaseAs ?? "damage"
			}
		});
		if (this.params.consume !== false) clearMemory(owner, this.params.key);
	}
	publishDamage(context, caster, target, amount, damageSource, resolvedFinal = false) {
		if (!target.isAlive()) return;
		context.emit({
			type: "DamageSegmentRequestedEvent",
			resolution: requireResolution(context),
			timestamp: context.owner.runtime.clock.now(),
			caster,
			target,
			ability: context.ability,
			buff: context.buff,
			damageSource,
			damageType: this.params.damageType ?? (damageSource === DamageSource.COUNTER || damageSource === DamageSource.FOLLOW_UP ? DamageType.PHYSICAL : DamageType.TRUE),
			calculationMode: resolvedFinal ? "resolved_final" : "standard",
			cause: this.params.cause ?? context.damageCause,
			damageTags: this.params.damageTags,
			damageComponents: [{
				kind: "memory",
				amount,
				mitigation: !resolvedFinal && (damageSource === DamageSource.COUNTER || damageSource === DamageSource.FOLLOW_UP) ? "normal" : "bypass_defense",
				...!resolvedFinal && (damageSource === DamageSource.COUNTER || damageSource === DamageSource.FOLLOW_UP) ? {
					attackBase: amount,
					segmentMultiplier: 1
				} : {}
			}],
			baseDamage: amount,
			finalDamage: amount
		});
	}
	getRecordAmount(context) {
		const event = context.triggerEvent;
		if (!event) return 0;
		if (this.params.event === "heal" && event.type === "HealEvent") return event.healAmount;
		if (this.params.event === "shield" && event.type === "ShieldEvent") return event.shieldAmount;
		if (this.params.event === "shield_break" && event.type === "ShieldBreakEvent") return event.brokenShieldAmount;
		if (event.type !== "DamageSegmentAppliedEvent") return 0;
		const damageEvent = event;
		if (this.params.event === "shield_absorbed") return damageEvent.shieldAbsorbed ?? 0;
		if (this.params.event === "critical_taken" && !damageEvent.isCritical) return 0;
		if (this.params.event === "damage_dealt" && damageEvent.caster !== context.caster) return 0;
		if ((this.params.event === "damage_taken" || this.params.event === "critical_taken") && damageEvent.target !== context.target) return 0;
		return damageEvent.damageTaken + (this.params.includeShieldAbsorbed ? damageEvent.shieldAbsorbed ?? 0 : 0);
	}
	resolveMaxStored(context, owner) {
		if (this.params.maxStoredValue) {
			const valueCap = ValueCalculator.calculate(this.params.maxStoredValue, context.caster, owner);
			if (this.params.maxStored !== void 0) return Math.min(this.params.maxStored, valueCap);
			return valueCap;
		}
		return this.params.maxStored;
	}
};
EffectRegistry.getInstance().register("damage_memory", (params) => new DamageMemoryEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/BuffLayerModifyEffect.ts
var BuffLayerModifyEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const unit = this.params.target === "caster" ? context.caster : context.target;
		const origin = {
			source: context.caster,
			ability: context.ability,
			buff: context.buff,
			attribution: context.attribution,
			trace: context.trace,
			resolution: context.resolution,
			layerChangeReason: "modified",
			statusFactVisibility: this.params.logVisibility
		};
		for (const buff of findMatchingBuffs(unit, this.params.match)) {
			if (!context.canExecuteEffect()) break;
			const before = buff.getLayer();
			switch (this.params.operation) {
				case "add":
					unit.buffs.modifyBuffLayer(buff.id, Math.max(1, this.params.layers ?? 1), origin);
					break;
				case "subtract":
					unit.buffs.modifyBuffLayer(buff.id, -Math.max(1, this.params.layers ?? 1), origin);
					break;
				case "clear":
					unit.buffs.setBuffLayer(buff.id, 0, origin);
					break;
				case "set": unit.buffs.setBuffLayer(buff.id, this.params.layers ?? 1, origin);
			}
			const repeat = this.params.scaleEffectsByLayer ? before : 1;
			for (let i = 0; i < repeat; i++) {
				if (!context.canExecuteEffect()) break;
				executeEffectConfigs(this.params.effects ?? [], context);
			}
		}
	}
};
EffectRegistry.getInstance().register("buff_layer_modify", (params) => new BuffLayerModifyEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/AbilityTransformEffect.ts
var AbilityTransformEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const modifiers = abilityTransformModifiersV3(this.params);
		addAbilityTransform(context.caster, {
			id: this.params.id,
			remainingTriggers: Math.max(1, this.params.triggers ?? 1),
			appliesToTags: this.params.appliesToTags,
			trueDamage: this.params.trueDamage,
			addDispel: this.params.addDispel ? {
				type: "dispel",
				params: this.params.addDispel
			} : void 0,
			mpCostToHp: this.params.mpCostToHp,
			freeManaCost: this.params.freeManaCost,
			cooldownModify: this.params.cooldownModify,
			forceCritical: this.params.forceCritical,
			bonusDamageMemory: this.params.bonusDamageMemory
		});
		if (modifiers.length > 0) commitMechanicResultV3(context, {
			code: this.params.id,
			target: context.caster,
			payload: {
				kind: "ability_transform",
				triggers: Math.max(1, this.params.triggers ?? 1),
				modifiers
			}
		});
	}
};
EffectRegistry.getInstance().register("ability_transform", (params) => new AbilityTransformEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/HpSacrificeDamageEffect.ts
var HpSacrificeDamageEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const floor = this.params.minHpFloor ?? 1;
		const spend = Math.max(0, Math.min(context.caster.getCurrentHp() - floor, Math.round(context.caster.getCurrentHp() * this.params.hpRatio)));
		if (spend <= 0) return;
		context.caster.takeDamage(spend);
		commitMechanicResultV3(context, {
			code: CombatMechanicCodeV3.HP_SACRIFICE,
			target: context.caster,
			visibility: "player",
			payload: {
				kind: "hp_sacrifice",
				amount: spend
			}
		});
		const damage = Math.round(spend * this.params.damagePerHp);
		if (damage <= 0) return;
		context.emit({
			type: "DamageSegmentRequestedEvent",
			resolution: requireResolution(context),
			timestamp: context.owner.runtime.clock.now(),
			caster: context.caster,
			target: context.target,
			ability: context.ability,
			damageSource: DamageSource.DIRECT,
			damageType: DamageType.MAGICAL,
			baseDamage: damage,
			finalDamage: damage
		});
	}
};
EffectRegistry.getInstance().register("hp_sacrifice_damage", (params) => new HpSacrificeDamageEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/AbilityLockEffect.ts
var AbilityLockEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const rounds = Math.max(1, Math.round(this.params.rounds));
		const matchedSkills = context.target.abilities.getAllAbilities().filter((ability) => ability instanceof ActiveSkill && ability !== context.ability && (!this.params.tags || ability.tags.hasAnyTag(this.params.tags))).sort((a, b) => {
			const maxCooldownDiff = b.maxCooldown - a.maxCooldown;
			if (maxCooldownDiff !== 0) return maxCooldownDiff;
			return b.currentCooldown - a.currentCooldown;
		});
		const countToLock = this.params.maxCount === void 0 ? matchedSkills.length : Math.min(matchedSkills.length, Math.max(0, Math.floor(this.params.maxCount)));
		for (let i = 0; i < countToLock; i++) {
			if (!context.canExecuteEffect()) break;
			const skill = matchedSkills[i];
			skill.modifyCooldown(rounds);
			context.commit(context.target, {
				type: "mechanic",
				code: CombatMechanicCodeV3.ABILITY_LOCK,
				payload: {
					kind: "ability_lock",
					abilityName: skill.name,
					rounds
				}
			});
			context.emit({
				type: "CooldownModifyEvent",
				timestamp: context.owner.runtime.clock.now(),
				caster: context.caster,
				target: context.target,
				ability: context.ability,
				cdModifyValue: rounds,
				affectedAbilityName: skill.name
			});
		}
	}
};
EffectRegistry.getInstance().register("ability_lock", (params) => new AbilityLockEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/StatusSpreadEffect.ts
var StatusSpreadEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		this.params;
	}
};
EffectRegistry.getInstance().register("status_spread", (params) => new StatusSpreadEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/BuffCopyEffect.ts
var BuffCopyEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const buffAddEvent = context.triggerEvent?.type === "BuffAddEvent" ? context.triggerEvent : void 0;
		const eventBuff = buffAddEvent?.buff;
		let sourceBuff = this.params.replayRemoved ? readRecentRemovedBuff(context.target, (buff) => matchesBuff(buff, this.params.match)) : void 0;
		if (!this.params.replayRemoved) sourceBuff = eventBuff && matchesBuff(eventBuff, this.params.match) ? eventBuff : findMatchingBuffs(context.target, this.params.match)[0];
		if (!sourceBuff || sourceBuff.dispelPolicy === "protected") return;
		const triggerOwner = context.caster;
		const triggerKey = `buff_copy:${context.ability?.id ?? "effect"}:${this.params.id ?? sourceBuff.id}`;
		const state = getBattleRuntimeState(triggerOwner);
		const maxTriggers = this.params.maxTriggers;
		if (maxTriggers !== void 0 && (state.counters.get(triggerKey) ?? 0) >= maxTriggers) return;
		const cloned = sourceBuff.clone();
		if (this.params.durationDelta && cloned.getMaxDuration() > 0) cloned.refreshToDuration(Math.max(1, cloned.getMaxDuration() + this.params.durationDelta));
		const receiver = this.params.target === "target" ? context.target : context.caster;
		if (maxTriggers !== void 0) state.counters.set(triggerKey, (state.counters.get(triggerKey) ?? 0) + 1);
		if (buffAddEvent?.target === receiver && eventBuff?.id === sourceBuff.id) {
			if (this.params.durationDelta && sourceBuff.getMaxDuration() > 0) sourceBuff.refreshToDuration(Math.max(1, sourceBuff.getMaxDuration() + this.params.durationDelta));
			else if (sourceBuff.stackRule === StackRule.STACK_LAYER) sourceBuff.addLayer(1);
			return;
		}
		const copyKey = `buff_copy:in_progress:${sourceBuff.id}`;
		if (!beginRuntimeGuard(receiver, copyKey)) return;
		try {
			receiver.buffs.addBuff(cloned, context.caster, {
				ability: context.ability,
				buff: context.buff,
				attribution: CombatAttributionV3.rebind(context.owner, context.origin),
				trace: context.trace,
				resolution: context.resolution
			});
		} finally {
			endRuntimeGuard(receiver, copyKey);
		}
	}
};
EffectRegistry.getInstance().register("buff_copy", (params) => new BuffCopyEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/DamageDeferEffect.ts
var DamageDeferEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		if (!context.triggerEvent || context.triggerEvent.type !== "DamageSegmentRequestedEvent") return;
		const event = context.triggerEvent;
		if (this.params.thresholdMaxHpRatio !== void 0 && event.finalDamage < event.target.getMaxHp() * this.params.thresholdMaxHpRatio) return;
		const deferred = Math.round(event.finalDamage * this.params.ratio);
		if (deferred <= 0) return;
		event.finalDamage = Math.max(0, event.finalDamage - deferred);
		if (this.params.memory) {
			const cap = this.params.memory.maxStoredValue ? ValueCalculator.calculate(this.params.memory.maxStoredValue, context.caster, event.target) : Number.POSITIVE_INFINITY;
			rememberAmount(event.target, this.params.memory.key, deferred, cap);
		}
		commitMechanicResultV3(context, {
			code: CombatMechanicCodeV3.DAMAGE_DEFER,
			target: event.target,
			visibility: "player",
			payload: {
				kind: "damage_defer",
				amount: deferred,
				turns: this.params.delayTurns
			}
		});
		event.target.buffs.addBuff(new DelayedRuntimeBuff({
			id: `deferred_damage_${nextRuntimeSequence(event.target, "damage_defer")}`,
			name: "延迟伤害",
			description: `${this.params.delayTurns}回合后结算被太虚袍延后的伤害。`,
			delayTurns: this.params.delayTurns,
			effects: [{
				type: "damage",
				params: {
					value: {
						base: deferred,
						attribute: AttributeType.MAGIC_ATK,
						coefficient: 0
					},
					damageType: event.damageType ?? DamageType.TRUE,
					damageSource: DamageSource.DELAYED
				}
			}],
			tags: [GameplayTags.BUFF.TYPE.DEBUFF]
		}), event.caster, {
			ability: context.ability,
			buff: context.buff,
			attribution: CombatAttributionV3.rebind(context.owner, context.origin),
			trace: context.trace,
			resolution: context.resolution
		});
	}
};
EffectRegistry.getInstance().register("damage_defer", (params) => new DamageDeferEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/NextHitRuleEffect.ts
var NextHitRuleEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const modifiers = abilityTransformModifiersV3(this.params);
		addAbilityTransform(context.caster, {
			id: `next_hit_rule_${context.ability?.id ?? "effect"}`,
			remainingTriggers: Math.max(1, this.params.triggers ?? 1),
			appliesToTags: this.params.appliesToTags,
			forceCritical: this.params.forceCritical
		});
		if (modifiers.length > 0) commitMechanicResultV3(context, {
			code: CombatMechanicCodeV3.NEXT_HIT_RULE,
			target: context.caster,
			visibility: "player",
			payload: {
				kind: "ability_transform",
				triggers: Math.max(1, this.params.triggers ?? 1),
				modifiers
			}
		});
	}
};
EffectRegistry.getInstance().register("next_hit_rule", (params) => new NextHitRuleEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/DynamicScalarEffect.ts
var DynamicScalarEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		if (!context.triggerEvent || context.triggerEvent.type !== "DamageSegmentRequestedEvent") return;
		const event = context.triggerEvent;
		const unit = this.params.mode === "increase" ? context.caster : context.target;
		const percent = this.params.resource === "hp" ? unit.getHpPercent() : unit.getMpPercent();
		const rawScalar = this.params.lowerIsStronger ? 1 - percent : percent;
		const scalar = Math.min(this.params.cap ?? Number.POSITIVE_INFINITY, rawScalar * this.params.value);
		if (this.params.mode === "increase") event.damageIncreasePctBucket = (event.damageIncreasePctBucket ?? 0) + scalar;
		else event.damageReductionPctBucket = (event.damageReductionPctBucket ?? 0) + scalar;
	}
};
EffectRegistry.getInstance().register("dynamic_scalar", (params) => new DynamicScalarEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/TurnStateCounterEffect.ts
var TurnStateCounterEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const state = getBattleRuntimeState(context.caster);
		if (this.params.event === "no_damage_dealt") {
			if (consumeDamageDealtFlag(context.caster)) {
				state.counters.delete(this.params.key);
				return;
			}
		} else if (context.triggerEvent && context.triggerEvent.type === "DamageSegmentAppliedEvent" && context.triggerEvent.caster !== context.caster) return;
		const next = (state.counters.get(this.params.key) ?? 0) + 1;
		state.counters.set(this.params.key, next);
		if (next < this.params.threshold) return;
		executeEffectConfigs(this.params.effects, context);
		if (this.params.resetOnTrigger !== false) state.counters.delete(this.params.key);
	}
};
EffectRegistry.getInstance().register("turn_state_counter", (params) => new TurnStateCounterEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/EffectSequenceEffect.ts
var EffectSequenceEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		executeEffectConfigs(this.params.effects, context);
	}
};
EffectRegistry.getInstance().register("effect_sequence", (params) => new EffectSequenceEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/CombatResourceModifyEffect.ts
var CombatResourceModifyEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const unit = this.params.target === "target" ? context.target : context.caster;
		const before = unit.combatResources.getCurrent(this.params.resourceId);
		let amount = 0;
		switch (this.params.operation) {
			case "add":
				unit.combatResources.modify(this.params.resourceId, Math.max(0, this.params.amount ?? 1), {
					attribution: context.attribution,
					trace: context.trace,
					caster: context.caster,
					ability: context.ability,
					operation: "add",
					reason: this.params.reason
				});
				amount = unit.combatResources.getCurrent(this.params.resourceId) - before;
				break;
			case "subtract":
				amount = unit.combatResources.consume(this.params.resourceId, Math.max(0, this.params.amount ?? 1), {
					attribution: context.attribution,
					trace: context.trace,
					caster: context.caster,
					ability: context.ability,
					operation: "subtract",
					reason: this.params.reason
				});
				break;
			case "set":
				unit.combatResources.set(this.params.resourceId, this.params.amount ?? 0, {
					attribution: context.attribution,
					trace: context.trace,
					caster: context.caster,
					ability: context.ability,
					operation: "set",
					reason: this.params.reason
				});
				amount = Math.abs(unit.combatResources.getCurrent(this.params.resourceId) - before);
				break;
			case "consume_all": amount = unit.combatResources.consume(this.params.resourceId, "all", {
				attribution: context.attribution,
				trace: context.trace,
				caster: context.caster,
				ability: context.ability,
				operation: "consume_all",
				reason: this.params.reason
			});
		}
		const repeat = this.params.scaleEffectsByAmount ? amount : amount > 0 ? 1 : 0;
		for (let index = 0; index < repeat; index += 1) {
			if (!context.canExecuteEffect()) break;
			executeEffectConfigs(this.params.effects ?? [], context);
		}
	}
};
EffectRegistry.getInstance().register("combat_resource_modify", (params) => new CombatResourceModifyEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/RuntimeCounterModifyEffect.ts
function eventAmount(context, field) {
	if (!field || !context.triggerEvent || typeof context.triggerEvent !== "object") return;
	const value = context.triggerEvent[field];
	return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
}
var RuntimeCounterModifyEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const unit = this.params.target === "target" ? context.target : context.caster;
		const before = readRuntimeCounter(unit, this.params.key);
		const amount = eventAmount(context, this.params.amountFromEvent) ?? Math.max(0, Math.trunc(this.params.amount ?? 1));
		let requested;
		switch (this.params.operation) {
			case "add":
				requested = before + amount;
				break;
			case "subtract":
				requested = before - amount;
				break;
			case "set":
				requested = amount;
				break;
			case "reset": requested = 0;
		}
		const min = this.params.min ?? 0;
		const max = this.params.max ?? Number.POSITIVE_INFINITY;
		const after = writeRuntimeCounter(unit, this.params.key, Math.max(min, Math.min(max, requested)));
		const changed = this.params.operation === "reset" ? Math.max(0, before) : Math.abs(after - before);
		const repeat = this.params.scaleEffectsByAmount ? changed : changed > 0 ? 1 : 0;
		for (let index = 0; index < repeat; index += 1) {
			if (!context.canExecuteEffect()) break;
			executeEffectConfigs(this.params.effects ?? [], context);
		}
	}
};
EffectRegistry.getInstance().register("runtime_counter_modify", (params) => new RuntimeCounterModifyEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/SkipActionEffect.ts
var SkipActionEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const count = this.params.count ?? 1;
		const name = this.params.name ?? "调息";
		const sourceAbility = context.ability ? {
			id: context.ability.id,
			name: context.ability.name
		} : void 0;
		queueSkippedActions(context.caster, count, this.params.reason, name, sourceAbility);
		context.commit(context.caster, {
			type: "action_state",
			stateType: "rest",
			phase: "entered",
			name,
			remainingActions: count
		});
		context.emit({
			type: "ActionStateEvent",
			timestamp: context.owner.runtime.clock.now(),
			unit: context.caster,
			stateType: "rest",
			phase: "entered",
			name,
			remainingActions: count,
			sourceAbility,
			reason: this.params.reason
		});
	}
};
EffectRegistry.getInstance().register("skip_action", (params) => new SkipActionEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/QueueActionEffect.ts
var QueueActionEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const abilityConfig = {
			slug: this.params.id,
			name: this.params.name,
			type: AbilityType.ACTIVE_SKILL,
			tags: this.params.tags,
			mpCost: 0,
			cooldown: 0,
			targetPolicy: this.params.targetPolicy ?? {
				team: "enemy",
				scope: "single"
			},
			effects: this.params.effects
		};
		const sourceAbility = context.ability ? {
			id: context.ability.id,
			name: context.ability.name
		} : void 0;
		setQueuedAction(context.caster, abilityConfig, {
			sourceAbility,
			cancelEffects: this.params.cancelEffects,
			interruptPolicy: this.params.interruptPolicy,
			hitPolicy: this.params.hitPolicy
		});
		context.commit(context.caster, {
			type: "action_state",
			stateType: "queued_action",
			phase: "entered",
			name: "蓄势",
			remainingActions: 1,
			ability: {
				id: abilityConfig.slug,
				name: abilityConfig.name
			}
		});
		context.emit({
			type: "ActionStateEvent",
			timestamp: context.owner.runtime.clock.now(),
			unit: context.caster,
			stateType: "queued_action",
			phase: "entered",
			name: "蓄势",
			remainingActions: 1,
			sourceAbility,
			ability: {
				id: abilityConfig.slug,
				name: abilityConfig.name
			}
		});
	}
};
EffectRegistry.getInstance().register("queue_action", (params) => new QueueActionEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/ResourceScaledDamageEffect.ts
var ResourceScaledDamageEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const current = context.caster.combatResources.getCurrent(this.params.resourceId);
		const points = Math.min(this.params.maxPoints ?? current, current);
		if (points < (this.params.minPoints ?? 0)) return;
		const coefficient = this.params.baseCoefficient + this.params.coefficientPerPoint * points;
		const attribute = this.params.attribute ?? AttributeType.ATK;
		const amount = context.caster.attributes.getValue(attribute) * coefficient;
		if (amount <= 0) return;
		const bypassRatio = Math.max(0, Math.min(1, this.params.bypassDefenseRatio ?? 0));
		const components = [];
		if (bypassRatio < 1) components.push({
			kind: `attribute:${attribute}`,
			amount: amount * (1 - bypassRatio),
			mitigation: "normal",
			attackBase: context.caster.attributes.getValue(attribute),
			segmentMultiplier: coefficient * (1 - bypassRatio)
		});
		if (bypassRatio > 0) components.push({
			kind: `attribute:${attribute}:bypass`,
			amount: amount * bypassRatio,
			mitigation: "bypass_defense"
		});
		if (this.params.consume) context.caster.combatResources.consume(this.params.resourceId, this.params.consume === "all" ? "all" : this.params.consume, {
			attribution: context.attribution,
			trace: context.trace,
			caster: context.caster,
			ability: context.ability
		});
		context.emit({
			type: "DamageSegmentRequestedEvent",
			resolution: requireResolution(context),
			timestamp: context.owner.runtime.clock.now(),
			caster: context.caster,
			target: context.target,
			ability: context.ability,
			damageSource: this.params.damageSource ?? DamageSource.DIRECT,
			damageType: this.params.damageType ?? DamageType.PHYSICAL,
			damageComponents: components,
			baseDamage: amount,
			finalDamage: amount,
			forceCritical: this.params.forceCritical
		});
	}
};
EffectRegistry.getInstance().register("resource_scaled_damage", (params) => new ResourceScaledDamageEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/AbilityModeEffect.ts
var AbilityModeEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const sourceAbility = context.ability ? {
			id: context.ability.id,
			name: context.ability.name
		} : void 0;
		const current = readAbilityMode(context.caster, this.params.key);
		if (this.params.operation === "set") {
			if (!this.params.mode) return;
			const mode = {
				key: this.params.key,
				mode: this.params.mode,
				remainingUses: Math.max(1, Math.trunc(this.params.remainingUses ?? 1)),
				displayName: this.params.displayName ?? this.params.mode,
				cleanupBuffIds: this.params.cleanupBuffIds ? [...this.params.cleanupBuffIds] : void 0
			};
			setAbilityMode(context.caster, mode);
			this.publishState(context, "entered", mode.displayName, mode.remainingUses, sourceAbility);
			return;
		}
		if (!current) return;
		if (this.params.operation === "advance") {
			const next = advanceAbilityMode(context.caster, this.params.key, {
				attribution: context.attribution,
				trace: context.trace
			});
			this.publishState(context, "triggered", current.displayName, next?.remainingUses ?? 0, sourceAbility);
			return;
		}
		clearAbilityMode(context.caster, this.params.key, {
			attribution: context.attribution,
			trace: context.trace
		});
		this.publishState(context, "cancelled", current.displayName, 0, sourceAbility);
	}
	publishState(context, phase, name, remainingActions, sourceAbility) {
		context.commit(context.caster, {
			type: "action_state",
			stateType: "ability_mode",
			phase,
			name,
			remainingActions
		});
		context.emit({
			type: "ActionStateEvent",
			timestamp: context.owner.runtime.clock.now(),
			unit: context.caster,
			stateType: "ability_mode",
			phase,
			name,
			remainingActions,
			sourceAbility
		});
	}
};
EffectRegistry.getInstance().register("ability_mode", (params) => new AbilityModeEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/LifestealEffect.ts
var LifestealEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		if (context.triggerEvent?.type !== "DamageSegmentAppliedEvent") return;
		const event = context.triggerEvent;
		if (event.canLifesteal === false) return;
		if (event.caster !== context.caster || event.damageSource !== DamageSource.DIRECT) return;
		const requested = Math.round(event.damageTaken * this.params.ratio);
		const amount = claimActionAmount(context.caster, "lifesteal", requested, Math.round(context.caster.getMaxHp() * this.params.maxHpRatioPerAction));
		if (amount <= 0) return;
		const appliedAmount = context.caster.heal(amount);
		if (appliedAmount > 0) context.commit(context.caster, {
			type: "recovery",
			resource: "hp",
			amount: Math.round(appliedAmount),
			after: Math.round(context.caster.getCurrentHp())
		});
		context.emit({
			type: "HealEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster: context.caster,
			target: context.caster,
			ability: event.ability,
			healAmount: amount,
			appliedAmount,
			healType: "hp"
		});
	}
};
EffectRegistry.getInstance().register("lifesteal", (params) => new LifestealEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/RefundPaidCostEffect.ts
/** 按本次施法快照中的实际支付法力返还资源。 */
var RefundPaidCostEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		const snapshot = context.castSnapshot;
		if (!snapshot || (this.params.resource ?? "mp") !== "mp") return;
		const paid = Math.max(0, snapshot.casterMpBeforeCost - snapshot.casterMpAfterCost);
		const requested = "amount" in this.params && typeof this.params.amount === "number" ? Math.min(paid, Math.round(Math.max(0, this.params.amount))) : Math.round(paid * Math.max(0, this.params.ratio));
		if (requested <= 0) return;
		const applied = context.caster.restoreMp(requested);
		if (applied > 0) context.commit(context.caster, {
			type: "recovery",
			resource: "mp",
			amount: Math.round(applied),
			after: Math.round(context.caster.getCurrentMp())
		});
		context.emit({
			type: "HealEvent",
			timestamp: context.owner.runtime.clock.now(),
			caster: context.caster,
			target: context.caster,
			ability: context.ability,
			buff: context.buff,
			healAmount: requested,
			appliedAmount: applied,
			healType: "mp"
		});
	}
};
EffectRegistry.getInstance().register("refund_paid_cost", (params) => new RefundPaidCostEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/effects/MechanicLogEffect.ts
/** 内容层发布通用具名机制与状态迁移，不接触日志聚合和渲染器。 */
var MechanicLogEffect = class extends GameplayEffect {
	params;
	constructor(params) {
		super();
		this.params = params;
	}
	execute(context) {
		commitMechanicResultV3(context, {
			code: this.params.internalKey,
			target: this.params.target === "caster" ? context.caster : context.target,
			visibility: this.params.visibility ?? "player",
			payload: this.params.mechanic === "named_trigger" ? {
				kind: "named_trigger",
				label: this.params.displayName
			} : {
				kind: "status_transition",
				label: this.params.displayName,
				operation: this.params.operation ?? "apply",
				previousLabel: this.params.previousDisplayName
			}
		});
	}
};
EffectRegistry.getInstance().register("mechanic_log", (params) => new MechanicLogEffect(params));
//#endregion
//#region src/shared/engine/battle-v5/factories/AbilityFactory.ts
/**
* 技能工厂
*
* 职责：
* - 解析强类型的 AbilityConfig
* - 实例化 DataDrivenActiveSkill 或 DataDrivenPassiveAbility
* - 递归装配效果链和监听器
*/
var AbilityFactory = class {
	static assertListenerContract(listener) {
		if (!listener.scope) throw new Error(`Listener ${listener.eventType} is missing required field: scope`);
	}
	/**
	* 根据配置创建技能实例
	*/
	static create(config) {
		validateAbilityEffectPlans(config);
		const id = config.slug;
		const name = config.name;
		const abilityTags = this.validateAbilityTags(config);
		if (config.type === AbilityType.ACTIVE_SKILL) {
			if (config.completionEffects?.length || config.effectLayers?.length || config.effectPlans?.length) {
				const skill = new LayeredDataDrivenActiveSkill(id, name, {
					description: config.description,
					mpCost: config.mpCost ?? 0,
					hpCost: config.hpCost ?? 0,
					costs: config.costs,
					cooldown: config.cooldown ?? 0,
					priority: config.priority ?? 0,
					targetPolicy: config.targetPolicy ? new TargetPolicy(config.targetPolicy) : TargetPolicy.default(),
					selectionProfile: config.selectionProfile ?? analyzeAbilityCapabilities(config).selectionProfile,
					castConditions: config.castConditions,
					hitPolicy: config.hitPolicy,
					effects: config.effects,
					completionEffects: config.completionEffects,
					castEffects: config.castEffects,
					effectLayers: config.effectLayers,
					effectPlans: config.effectPlans
				});
				skill.tags.addTags(abilityTags);
				skill.setSerializableConfig(config);
				return skill;
			}
			const skill = new DataDrivenActiveSkill(id, name, {
				description: config.description,
				mpCost: config.mpCost ?? 0,
				hpCost: config.hpCost ?? 0,
				costs: config.costs,
				cooldown: config.cooldown ?? 0,
				priority: config.priority ?? 0,
				targetPolicy: config.targetPolicy ? new TargetPolicy(config.targetPolicy) : TargetPolicy.default(),
				selectionProfile: config.selectionProfile ?? analyzeAbilityCapabilities(config).selectionProfile,
				castConditions: config.castConditions,
				hitPolicy: config.hitPolicy
			});
			skill.tags.addTags(abilityTags);
			if (config.effects) config.effects.forEach((effCfg) => {
				const effect = this.createEffect(effCfg);
				if (effect) skill.addEffect(effect);
			});
			if (config.castEffects) config.castEffects.forEach((effCfg) => {
				const effect = this.createEffect(effCfg);
				if (effect) skill.addCastEffect(effect);
			});
			if (config.listeners) config.listeners.forEach((listener, listenerIndex) => {
				this.assertListenerContract(listener);
				const effects = listener.effects.map((eff) => {
					const effect = this.createEffect(eff);
					return effect ? {
						effect,
						globalUnique: eff.globalUnique
					} : null;
				}).filter((e) => e !== null);
				skill.addInstantiatedListener(buildListenerRuntimeConfig(listener, `${config.slug}:active:${listenerIndex}`), effects);
			});
			skill.setSerializableConfig(config);
			return skill;
		}
		if (config.type === AbilityType.PASSIVE_SKILL) {
			const ability = new DataDrivenPassiveAbility(id, name);
			ability.tags.addTags(abilityTags);
			if (config.listeners) config.listeners.forEach((listener, listenerIndex) => {
				this.assertListenerContract(listener);
				const effects = listener.effects.map((eff) => {
					const effect = this.createEffect(eff);
					return effect ? {
						effect,
						globalUnique: eff.globalUnique
					} : null;
				}).filter((e) => e !== null);
				ability.addInstantiatedListener(buildListenerRuntimeConfig(listener, `${config.slug}:passive:${listenerIndex}`), effects);
			});
			if (config.modifiers) config.modifiers.forEach((modifier) => {
				ability.addModifier(modifier);
			});
			ability.setSerializableConfig(config);
			return ability;
		}
		throw new Error(`Ability type ${config.type} is not supported.`);
	}
	/**
	* 统一的效果实例化方法
	*/
	static createEffect(cfg) {
		return EffectRegistry.getInstance().create(cfg);
	}
	static validateAbilityTags(config) {
		const tags = config.tags ?? [];
		if (tags.length === 0) throw new Error(`[AbilityFactory] ability ${config.slug} is missing required tags`);
		const tagSet = new Set(tags);
		const capabilities = analyzeAbilityCapabilities(config);
		if (capabilities.hasDamage && !tagSet.has(GameplayTags.ABILITY.FUNCTION.DAMAGE)) throw new Error(`[AbilityFactory] damage-capable ability ${config.slug} must include ${GameplayTags.ABILITY.FUNCTION.DAMAGE}`);
		if (capabilities.damageChannels.has("magic")) this.assertTag(tagSet, config.slug, GameplayTags.ABILITY.CHANNEL.MAGIC);
		if (capabilities.damageChannels.has("physical")) this.assertTag(tagSet, config.slug, GameplayTags.ABILITY.CHANNEL.PHYSICAL);
		if (capabilities.damageChannels.has("true")) this.assertTag(tagSet, config.slug, GameplayTags.ABILITY.CHANNEL.TRUE);
		if (capabilities.hasHeal) this.assertTag(tagSet, config.slug, GameplayTags.ABILITY.FUNCTION.HEAL);
		if (capabilities.hasControl) this.assertTag(tagSet, config.slug, GameplayTags.ABILITY.FUNCTION.CONTROL);
		return tags;
	}
	static assertTag(tagSet, abilitySlug, tag) {
		if (!tagSet.has(tag)) throw new Error(`[AbilityFactory] ability ${abilitySlug} must include ${tag}`);
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/BattleRoster.ts
var BattleRoster = class BattleRoster {
	static MAX_TEAM_SIZE = 4;
	units;
	teams;
	constructor(units) {
		if (units.length < 2 || units.length > BattleRoster.MAX_TEAM_SIZE * 2) throw new Error("Battle roster must contain between 2 and 8 units");
		const unitMap = /* @__PURE__ */ new Map();
		const teamUnits = /* @__PURE__ */ new Map();
		for (const unit of units) {
			if (unitMap.has(unit.id)) throw new Error(`Duplicate battle unit id: ${unit.id}`);
			unitMap.set(unit.id, unit);
			const members = teamUnits.get(unit.teamId) ?? [];
			members.push(unit);
			teamUnits.set(unit.teamId, members);
		}
		if (teamUnits.size !== 2) throw new Error("Battle roster requires exactly two teams");
		const teams = /* @__PURE__ */ new Map();
		for (const [teamId, members] of teamUnits) {
			if (members.length > BattleRoster.MAX_TEAM_SIZE) throw new Error(`Team ${teamId} exceeds the 4-unit limit`);
			const slots = /* @__PURE__ */ new Set();
			for (const member of members) {
				if (slots.has(member.slot)) throw new Error(`Duplicate slot ${member.slot} in team ${teamId}`);
				slots.add(member.slot);
			}
			teams.set(teamId, Object.freeze({
				id: teamId,
				unitIds: Object.freeze([...members].sort((left, right) => left.slot - right.slot).map((member) => member.id))
			}));
		}
		this.units = unitMap;
		this.teams = teams;
	}
	static fromDuel(player, opponent) {
		return new BattleRoster([player, opponent]);
	}
	getUnit(unitId) {
		const unit = this.units.get(unitId);
		if (!unit) throw new Error(`Unknown battle unit: ${unitId}`);
		return unit;
	}
	getAllUnits() {
		return [...this.units.values()];
	}
	getTeam(teamId) {
		const team = this.teams.get(teamId);
		if (!team) throw new Error(`Unknown battle team: ${teamId}`);
		return team;
	}
	getTeamOf(unitId) {
		return this.getTeam(this.getUnit(unitId).teamId);
	}
	getAllies(unitId, includeSelf = false) {
		const unit = this.getUnit(unitId);
		return this.getTeam(unit.teamId).unitIds.filter((candidateId) => includeSelf || candidateId !== unitId).map((candidateId) => this.getUnit(candidateId));
	}
	getEnemies(unitId) {
		const teamId = this.getUnit(unitId).teamId;
		return [...this.teams.values()].filter((team) => team.id !== teamId).flatMap((team) => team.unitIds.map((candidateId) => this.getUnit(candidateId)));
	}
	getLivingUnits(teamId) {
		return (teamId ? this.getTeam(teamId).unitIds.map((unitId) => this.getUnit(unitId)) : this.getAllUnits()).filter((unit) => unit.isAlive());
	}
	isTeamEliminated(teamId) {
		return this.getLivingUnits(teamId).length === 0;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/core/BattleRandom.ts
var defaultSource = { next: () => Math.random() };
var sourceStack = [];
function battleRandom() {
	return (sourceStack[sourceStack.length - 1] ?? defaultSource).next();
}
var SeededBattleRandomSource = class SeededBattleRandomSource {
	state;
	constructor(seed) {
		this.state = typeof seed === "number" ? seed >>> 0 : SeededBattleRandomSource.hash(seed);
	}
	next() {
		this.state = this.state + 1831565813 >>> 0;
		let value = this.state;
		value = Math.imul(value ^ value >>> 15, value | 1);
		value ^= value + Math.imul(value ^ value >>> 7, value | 61);
		return ((value ^ value >>> 14) >>> 0) / 4294967296;
	}
	exportState() {
		return {
			algorithm: "mulberry32",
			state: this.state
		};
	}
	restoreState(snapshot) {
		if (snapshot.algorithm !== "mulberry32" || !Number.isSafeInteger(snapshot.state) || snapshot.state < 0 || snapshot.state > 4294967295) throw new Error("Invalid battle random state");
		this.state = snapshot.state >>> 0;
	}
	static hash(value) {
		let hash = 2166136261;
		for (const character of value) {
			hash ^= character.charCodeAt(0);
			hash = Math.imul(hash, 16777619);
		}
		return hash >>> 0;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/runtime/BattleRuntimeStateStore.ts
var BattleRuntimeStateStore = class {
	unitStates = /* @__PURE__ */ new WeakMap();
	delayedBuffEffects = /* @__PURE__ */ new WeakMap();
	activeAbilityTransforms = /* @__PURE__ */ new WeakMap();
	buffAppliedAtAction = /* @__PURE__ */ new WeakMap();
	getUnitState(unit) {
		let state = this.unitStates.get(unit);
		if (!state) {
			state = {
				memories: /* @__PURE__ */ new Map(),
				transforms: [],
				counters: /* @__PURE__ */ new Map(),
				activeEffectGuards: /* @__PURE__ */ new Set(),
				globalUniqueEffects: /* @__PURE__ */ new Map(),
				deathPreventTriggers: /* @__PURE__ */ new Set(),
				deathCommitted: false,
				sequences: /* @__PURE__ */ new Map(),
				dealtDamageSinceLastCheck: false,
				removedBuffs: [],
				actionSequence: 0,
				round: 0,
				triggerLedger: /* @__PURE__ */ new Map(),
				damageSegmentCounters: /* @__PURE__ */ new Map(),
				skippedActions: [],
				abilityModes: /* @__PURE__ */ new Map(),
				actionAmounts: /* @__PURE__ */ new Map()
			};
			this.unitStates.set(unit, state);
		}
		return state;
	}
	getDelayedBuffEffects(buff) {
		return this.delayedBuffEffects.get(buff);
	}
	setDelayedBuffEffects(buff, effects) {
		this.delayedBuffEffects.set(buff, effects);
	}
	getActiveAbilityTransform(ability) {
		return this.activeAbilityTransforms.get(ability);
	}
	setActiveAbilityTransform(ability, transform) {
		this.activeAbilityTransforms.set(ability, transform);
	}
	deleteActiveAbilityTransform(ability) {
		this.activeAbilityTransforms.delete(ability);
	}
	getBuffAppliedAtAction(buff) {
		return this.buffAppliedAtAction.get(buff);
	}
	setBuffAppliedAtAction(buff, action) {
		this.buffAppliedAtAction.set(buff, action);
	}
	clear() {
		this.unitStates = /* @__PURE__ */ new WeakMap();
		this.delayedBuffEffects = /* @__PURE__ */ new WeakMap();
		this.activeAbilityTransforms = /* @__PURE__ */ new WeakMap();
		this.buffAppliedAtAction = /* @__PURE__ */ new WeakMap();
	}
};
//#endregion
//#region src/shared/engine/battle-v5/runtime/BattleRuntime.ts
var BattleRuntime = class BattleRuntime {
	events;
	random;
	clock;
	states;
	constructor(options = {}) {
		this.clock = options.clock ?? new LogicalBattleClock();
		this.random = options.random ?? new SeededBattleRandomSource(0);
		this.events = options.events ?? new EventBus(this.clock);
		this.states = options.states ?? new BattleRuntimeStateStore();
	}
	dispose() {
		this.events.reset();
		this.states.clear();
	}
	exportCursor() {
		const random = this.random;
		const clock = this.clock;
		if (typeof random.exportState !== "function" || typeof clock.exportState !== "function") throw new Error("Battle runtime is not checkpoint-capable");
		return {
			random: random.exportState(),
			clock: clock.exportState(),
			events: this.events.exportCursor()
		};
	}
	restoreCursor(cursor) {
		const random = this.random;
		const clock = this.clock;
		if (typeof random.restoreState !== "function" || typeof clock.restoreState !== "function") throw new Error("Battle runtime is not checkpoint-capable");
		random.restoreState(cursor.random);
		clock.restoreState(cursor.clock);
		this.events.restoreCursor(cursor.events);
	}
	/** Shared runtime for standalone units that are not attached to a battle match. */
	static standalone = new BattleRuntime({
		events: EventBus.instance,
		random: { next: battleRandom },
		clock: EventBus.instance.clock
	});
};
//#endregion
//#region src/shared/engine/battle-v5/abilities/AbilitySelectionStrategy.ts
var DEFAULT_THRESHOLDS = {
	healHpSkip: .85,
	emergencyHealHp: .35,
	restoreMpSkip: .75
};
var DEFAULT_WEIGHTS = {
	damageBase: 25,
	damageExecuteScale: 45,
	healScale: 90,
	emergencyHealBonus: 140,
	restoreMpScale: 70,
	controlBonus: 35,
	controlLowHpPenalty: -25,
	buffBonus: 10,
	defensiveBase: 5,
	defensiveLowHpBonus: 35,
	shieldRepeatPenalty: -35
};
var DefaultAbilitySelectionStrategy = class {
	select(context, scoreModifier) {
		const scored = context.candidates.map((candidate) => {
			const result = this.scoreCandidate(candidate, context);
			return result && scoreModifier ? {
				...result,
				score: result.score + scoreModifier(candidate, context)
			} : result;
		}).filter((result) => result !== null);
		if (scored.length === 0) return null;
		scored.sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			if (b.ability.priority !== a.ability.priority) return b.ability.priority - a.ability.priority;
			return a.order - b.order || a.ability.id.localeCompare(b.ability.id);
		});
		const best = scored[0];
		return {
			ability: best.ability,
			target: best.target,
			score: best.score
		};
	}
	scoreCandidate(candidate, context) {
		const intents = this.resolveIntents(candidate.ability);
		const caster = context.caster;
		const target = candidate.target;
		let score = candidate.ability.priority;
		for (const rule of candidate.ability.selectionProfile?.rules ?? []) if (checkConditions({
			caster,
			target,
			ability: candidate.ability
		}, rule.conditions)) {
			if (rule.disqualify) return null;
			score += rule.scoreDelta ?? 0;
		}
		if (intents.includes("heal_hp")) {
			const hpPercent = caster.getHpPercent();
			if (hpPercent >= DEFAULT_THRESHOLDS.healHpSkip) return null;
			score += hpPercent <= DEFAULT_THRESHOLDS.emergencyHealHp ? DEFAULT_WEIGHTS.emergencyHealBonus : DEFAULT_WEIGHTS.healScale * (1 - hpPercent);
		}
		if (intents.includes("restore_mp")) {
			const mpPercent = caster.getMpPercent();
			if (mpPercent >= DEFAULT_THRESHOLDS.restoreMpSkip) return null;
			score += DEFAULT_WEIGHTS.restoreMpScale * (1 - mpPercent);
		}
		if (intents.includes("control")) {
			if (this.targetHasControl(target) || target.tags.hasTag(GameplayTags.STATUS.IMMUNE.CONTROL)) return null;
			score += target.getHpPercent() <= .2 ? DEFAULT_WEIGHTS.controlLowHpPenalty : DEFAULT_WEIGHTS.controlBonus;
		}
		if (intents.includes("damage")) score += DEFAULT_WEIGHTS.damageBase + (1 - target.getHpPercent()) * DEFAULT_WEIGHTS.damageExecuteScale;
		if (intents.includes("buff")) score += DEFAULT_WEIGHTS.buffBonus;
		if (intents.includes("defensive")) {
			if (caster.getCurrentShield() > 0) score += DEFAULT_WEIGHTS.shieldRepeatPenalty;
			score += caster.getHpPercent() <= .5 ? DEFAULT_WEIGHTS.defensiveLowHpBonus : DEFAULT_WEIGHTS.defensiveBase;
		}
		return {
			ability: candidate.ability,
			target,
			score,
			order: candidate.order
		};
	}
	resolveIntents(ability) {
		const explicit = ability.selectionProfile?.intents;
		if (explicit?.length) return explicit;
		const intents = [];
		if (ability.tags.hasTag(GameplayTags.ABILITY.FUNCTION.HEAL)) intents.push("heal_hp");
		if (ability.tags.hasTag(GameplayTags.ABILITY.FUNCTION.CONTROL)) intents.push("control");
		if (ability.tags.hasTag(GameplayTags.ABILITY.FUNCTION.DAMAGE)) intents.push("damage");
		if (ability.tags.hasTag(GameplayTags.ABILITY.FUNCTION.BUFF)) intents.push("buff");
		if (intents.length === 0 && ability.targetPolicy.team === "self") intents.push("buff");
		if (intents.length === 0) intents.push("damage");
		return intents;
	}
	targetHasControl(target) {
		if (target.tags.hasTag(GameplayTags.STATUS.CONTROL.ROOT)) return true;
		return target.buffs.getAllBuffs().some((buff) => buff.countsAsStatus && (buff.type === BuffType.CONTROL || buff.tags.hasTag(GameplayTags.BUFF.TYPE.CONTROL)));
	}
};
//#endregion
//#region src/shared/engine/battle-v5/abilities/BasicAttack.ts
/**
* 普攻技能
* 当没有可用技能时使用
*/
var BasicAttack = class extends ActiveSkill {
	_damageEffect;
	constructor() {
		super("basic_attack", "普攻", {
			mpCost: 0,
			cooldown: 0,
			priority: 0
		});
		this._damageEffect = new DamageEffect({ value: {
			attribute: AttributeType.ATK,
			coefficient: .8
		} });
		this.tags.addTags([GameplayTags.ABILITY.CHANNEL.PHYSICAL, GameplayTags.ABILITY.KIND.BASIC]);
	}
	/**
	* 执行普攻
	*/
	executeSkill(caster, target) {
		const context = EffectExecutionContextV3.activeAbility({
			owner: caster,
			caster,
			target,
			ability: this,
			resolution: this.resolution
		});
		executeGameplayEffectV3(this._damageEffect, context);
	}
};
//#endregion
//#region src/shared/engine/battle-v5/units/AbilityContainer.ts
/**
* AbilityContainer - 技能容器
*
* 职责：
* - 管理单位的所有技能（存储、添加、移除）
* - 保存自动战斗的技能选择策略
*
* 不负责：
* - 目标选择（由 TargetSelectionSystem 处理）
* - 技能执行（由 AbilityExecutionSystem 处理）
*/
var AbilityContainer = class AbilityContainer {
	_abilities = /* @__PURE__ */ new Map();
	_owner;
	_defaultAttack = null;
	_fallbackBasicAttack = null;
	_selectionStrategy = new DefaultAbilitySelectionStrategy();
	constructor(owner) {
		this._owner = owner;
	}
	/**
	* 获取所有可用技能（供外部查询使用，保留兼容性并优化逻辑）
	*/
	getAvailableAbilities(target) {
		return Array.from(this._abilities.values()).filter((ability) => ability instanceof ActiveSkill).filter((ability) => {
			const policy = ability.targetPolicy;
			const actualTarget = policy.team === "self" || policy.team === "ally" ? this._owner : target;
			return ability.canTrigger({
				caster: this._owner,
				target: actualTarget
			});
		});
	}
	setSelectionStrategy(strategy) {
		this._selectionStrategy = strategy;
	}
	getSelectionStrategy() {
		return this._selectionStrategy;
	}
	_getDefaultAttack() {
		if (!this._defaultAttack) {
			this._defaultAttack = new BasicAttack();
			this._defaultAttack.setOwner(this._owner);
			this._defaultAttack.setActive(true);
		}
		return this._defaultAttack;
	}
	getDefaultAttackForSnapshot() {
		return this._defaultAttack;
	}
	getDefaultAttack() {
		return this._getDefaultAttack();
	}
	getFallbackBasicAttack() {
		if (!this._fallbackBasicAttack) {
			this._fallbackBasicAttack = new BasicAttack();
			this._fallbackBasicAttack.setOwner(this._owner);
			this._fallbackBasicAttack.setActive(true);
		}
		return this._fallbackBasicAttack;
	}
	setDefaultAttack(ability) {
		if (this._defaultAttack) this._defaultAttack.setActive(false);
		this._defaultAttack = ability;
		this._defaultAttack.setOwner(this._owner);
		this._defaultAttack.setActive(true);
	}
	/**
	* 更新所有技能的冷却时间
	*/
	tickAbilitiesCooldown() {
		for (const ability of this._abilities.values()) if (ability instanceof ActiveSkill) ability.tickCooldown();
	}
	addAbility(ability) {
		this._abilities.set(ability.id, ability);
		ability.setOwner(this._owner);
		ability.setActive(true);
	}
	removeAbility(abilityId) {
		const ability = this._abilities.get(abilityId);
		if (ability) {
			ability.setActive(false);
			this._abilities.delete(abilityId);
		}
	}
	getAbility(abilityId) {
		return this._abilities.get(abilityId);
	}
	getAllAbilities() {
		return Array.from(this._abilities.values());
	}
	/**
	* 获取所有技能的快照
	*/
	getSnapshots() {
		return Array.from(this._abilities.values()).map((ability) => {
			if (ability instanceof ActiveSkill) return {
				id: ability.id,
				name: ability.name,
				currentCd: ability.currentCooldown,
				maxCd: ability.maxCooldown,
				mpCost: ability.manaCost,
				type: ability.type
			};
			return {
				id: ability.id,
				name: ability.name,
				currentCd: 0,
				maxCd: 0,
				mpCost: 0,
				type: ability.type
			};
		});
	}
	clone(owner) {
		const clonedContainer = new AbilityContainer(owner);
		clonedContainer._selectionStrategy = this._selectionStrategy;
		for (const ability of this._abilities.values()) {
			const clonedAbility = ability.clone();
			clonedContainer._abilities.set(clonedAbility.id, clonedAbility);
			clonedAbility.setOwner(owner);
			clonedAbility.setActive(true);
		}
		if (this._defaultAttack) clonedContainer.setDefaultAttack(this._defaultAttack.clone());
		return clonedContainer;
	}
	destroy() {
		for (const ability of this._abilities.values()) ability.setActive(false);
	}
};
//#endregion
//#region src/shared/engine/battle-v5/units/AttributeSet.ts
/**
* 外部注入型二级属性（base=0，isFloat=true，完全由装备/Buff/命格提供）
*/
var EXTERNAL_SECONDARY_ATTRS = /* @__PURE__ */ new Set([
	AttributeType.ARMOR_PENETRATION,
	AttributeType.MAGIC_PENETRATION,
	AttributeType.CRIT_RESIST,
	AttributeType.CRIT_DAMAGE_REDUCTION,
	AttributeType.HEAL_AMPLIFY,
	AttributeType.HEAL_RECEIVED_REDUCTION
]);
function curve(x, scale, cap) {
	const value = Math.max(0, x);
	return cap * value / (value + scale);
}
/**
* 属性类 - 管理单个属性的基础值和修改器
*
* 修改器计算流程（6阶段）：
* OVERRIDE（直接覆盖）> BASE(固定值或派生公式) → FIXED → ADD → MULTIPLY → FINAL
*
* 对于派生型属性（baseValueFn 存在），getBaseValue() 返回公式结算值，
* setBaseValue() 无效（公式由构造时绑定，不可外部覆写）。
*/
var Attribute = class {
	type;
	_baseValue;
	_baseValueFn;
	_modifiers = [];
	_isFloat;
	constructor(type, baseValue, isFloat = false, baseValueFn) {
		this.type = type;
		this._baseValue = baseValue;
		this._isFloat = isFloat;
		this._baseValueFn = baseValueFn;
	}
	/** 是否为派生型属性（base 由公式推算） */
	isDerived() {
		return !!this._baseValueFn;
	}
	_computeBase() {
		return this._baseValueFn ? this._baseValueFn() : this._baseValue;
	}
	getFinalValue() {
		const override = this._modifiers.find((m) => m.type === ModifierType.OVERRIDE);
		if (override) return this._isFloat ? Math.max(0, override.value) : Math.max(0, Math.floor(override.value));
		let final = this._computeBase();
		final += this._modifiers.filter((m) => m.type === ModifierType.FIXED).reduce((sum, m) => sum + m.value, 0);
		const addBonus = this._modifiers.filter((m) => m.type === ModifierType.ADD).reduce((sum, m) => sum + m.value, 0);
		final *= 1 + addBonus;
		const multBonus = this._modifiers.filter((m) => m.type === ModifierType.MULTIPLY).reduce((product, m) => product * m.value, 1);
		final *= multBonus;
		const finalMod = this._modifiers.find((m) => m.type === ModifierType.FINAL);
		if (finalMod) final += finalMod.value;
		return this._isFloat ? Math.max(0, final) : Math.max(0, Math.floor(final));
	}
	/**
	* 返回不含 modifier 的基础值。
	* 派生属性返回公式结算值（即玩家面板的"底座"）。
	*/
	getBaseValue() {
		return this._computeBase();
	}
	/**
	* 设置存储的基础值。
	* 派生属性（有 baseValueFn）调用此方法无效，其 base 由公式决定。
	*/
	setBaseValue(value) {
		if (this._baseValueFn) return;
		if (value < 0) throw new Error(`Base value cannot be negative: ${value}`);
		this._baseValue = value;
	}
	addModifier(modifier) {
		this._modifiers.push(modifier);
	}
	removeModifier(modifierId) {
		this._modifiers = this._modifiers.filter((m) => m.id !== modifierId);
	}
	clearModifiers() {
		this._modifiers = [];
	}
	getModifiers() {
		return [...this._modifiers];
	}
	setModifiers(modifiers) {
		this._modifiers = modifiers;
	}
};
/**
* 六维属性系统 + 派生二级属性体系
*
* 主属性（六维，整数，默认 10）：
* - VITALITY  (体魄)    — 气血上限、少量法术防御
* - STRENGTH  (力道)    — 物理攻击
* - SPIRIT    (灵力)    — 法术攻击、少量法力
* - ENDURANCE (根骨)    — 物理防御、少量气血上限
* - SPEED     (身法)    — 行动速度、闪避率、命中
* - WILLPOWER (神识)    — 法防、法力、控制命中与抗性
*
* 派生型二级属性（浮点，base=公式，modifier 可叠加）：
* - ATK                物理攻击   = 40 + STRENGTH×3.5
* - DEF                物理防御   = 10 + ENDURANCE×1.75
* - MAGIC_ATK          法术攻击   = 40 + SPIRIT×3.5
* - MAGIC_DEF          法术防御   = 10 + WILLPOWER×1.75 + VITALITY×0.25
* - ACTION_SPEED       行动速度   = SPEED
* - CRIT_RATE          暴击率     = 0.05
* - CRIT_DAMAGE_MULT   暴击伤害   = 1.5
* - EVASION_RATE       闪避率     = 0.02 + curve(SPEED, 240, 0.24)
* - ACCURACY           命中       = 0.05 + curve(SPEED, 240, 0.27)
* - CONTROL_HIT        控制命中   = 0.04 + curve(WILLPOWER, 240, 0.30)
* - CONTROL_RESISTANCE 控制抗性   = 0.04 + curve(WILLPOWER, 240, 0.34)
* - MAX_HP             最大气血   = 400 + VITALITY×20 + ENDURANCE×3
* - MAX_MP             最大法力   = 200 + SPIRIT×4 + WILLPOWER×10
*
* 外部注入型二级属性（浮点，base=0，由装备/Buff/命格提供）：
* - ARMOR_PENETRATION、MAGIC_PENETRATION、CRIT_RESIST、CRIT_DAMAGE_REDUCTION、HEAL_AMPLIFY
*/
var AttributeSet = class AttributeSet {
	_attributes = /* @__PURE__ */ new Map();
	/**
	* Create a new AttributeSet with optional base values.
	* @param baseValues - Partial record of primary attribute base values
	*/
	constructor(baseValues) {
		const primaryAttrs = [
			AttributeType.VITALITY,
			AttributeType.STRENGTH,
			AttributeType.SPIRIT,
			AttributeType.ENDURANCE,
			AttributeType.SPEED,
			AttributeType.WILLPOWER
		];
		for (const attrType of primaryAttrs) this._attributes.set(attrType, new Attribute(attrType, baseValues[attrType] ?? 10, false));
		this._attributes.set(AttributeType.ATK, new Attribute(AttributeType.ATK, 0, true, () => Math.floor(40 + this.getValue(AttributeType.STRENGTH) * 3.5)));
		this._attributes.set(AttributeType.DEF, new Attribute(AttributeType.DEF, 0, true, () => Math.floor(10 + this.getValue(AttributeType.ENDURANCE) * 1.75)));
		this._attributes.set(AttributeType.MAGIC_ATK, new Attribute(AttributeType.MAGIC_ATK, 0, true, () => Math.floor(40 + this.getValue(AttributeType.SPIRIT) * 3.5)));
		this._attributes.set(AttributeType.MAGIC_DEF, new Attribute(AttributeType.MAGIC_DEF, 0, true, () => Math.floor(10 + this.getValue(AttributeType.WILLPOWER) * 1.75 + this.getValue(AttributeType.VITALITY) * .25)));
		this._attributes.set(AttributeType.ACTION_SPEED, new Attribute(AttributeType.ACTION_SPEED, 0, true, () => this.getValue(AttributeType.SPEED)));
		this._attributes.set(AttributeType.CRIT_RATE, new Attribute(AttributeType.CRIT_RATE, 0, true, () => .05));
		this._attributes.set(AttributeType.CRIT_DAMAGE_MULT, new Attribute(AttributeType.CRIT_DAMAGE_MULT, 0, true, () => 1.5));
		this._attributes.set(AttributeType.EVASION_RATE, new Attribute(AttributeType.EVASION_RATE, 0, true, () => .02 + curve(this.getValue(AttributeType.SPEED), 240, .24)));
		this._attributes.set(AttributeType.ACCURACY, new Attribute(AttributeType.ACCURACY, 0, true, () => .05 + curve(this.getValue(AttributeType.SPEED), 240, .27)));
		this._attributes.set(AttributeType.CONTROL_HIT, new Attribute(AttributeType.CONTROL_HIT, 0, true, () => .04 + curve(this.getValue(AttributeType.WILLPOWER), 240, .3)));
		this._attributes.set(AttributeType.CONTROL_RESISTANCE, new Attribute(AttributeType.CONTROL_RESISTANCE, 0, true, () => .04 + curve(this.getValue(AttributeType.WILLPOWER), 240, .34)));
		this._attributes.set(AttributeType.MAX_HP, new Attribute(AttributeType.MAX_HP, 0, false, () => Math.floor(400 + this.getValue(AttributeType.VITALITY) * 20 + this.getValue(AttributeType.ENDURANCE) * 3)));
		this._attributes.set(AttributeType.MAX_MP, new Attribute(AttributeType.MAX_MP, 0, false, () => Math.floor(200 + this.getValue(AttributeType.SPIRIT) * 4 + this.getValue(AttributeType.WILLPOWER) * 10)));
		for (const attrType of EXTERNAL_SECONDARY_ATTRS) this._attributes.set(attrType, new Attribute(attrType, 0, true));
	}
	/**
	* Get all base attribute values as a record.
	* For derived attributes, returns the formula-computed base.
	* @returns Record mapping attribute types to their base values
	*/
	getAllBaseValues() {
		const result = {};
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
	getValue(attrType) {
		return this._attributes.get(attrType)?.getFinalValue() ?? 0;
	}
	/**
	* Get the base value of an attribute without modifiers.
	* For derived attributes, returns the formula-computed base (panel floor value).
	* @param attrType - The attribute type to query
	* @returns The base attribute value (0 if attribute doesn't exist)
	*/
	getBaseValue(attrType) {
		return this._attributes.get(attrType)?.getBaseValue() ?? 0;
	}
	/**
	* Set the base value of a primary attribute.
	* Has no effect on derived attributes (their base is formula-driven).
	* @param attrType - The attribute type to modify
	* @param value - The new base value (must be non-negative)
	*/
	setBaseValue(attrType, value) {
		this._attributes.get(attrType)?.setBaseValue(value);
	}
	/**
	* Add a modifier to an attribute.
	* @param modifier - The modifier to add
	*/
	addModifier(modifier) {
		this._attributes.get(modifier.attrType)?.addModifier(modifier);
	}
	/**
	* Remove a modifier from all attributes by its ID.
	* @param modifierId - The ID of the modifier to remove
	*/
	removeModifier(modifierId) {
		this._attributes.forEach((attr) => attr.removeModifier(modifierId));
	}
	/**
	* Remove modifiers by source object reference.
	* @param source - The source object to match
	*/
	removeModifierBySource(source) {
		this._attributes.forEach((attr) => {
			attr.setModifiers(attr.getModifiers().filter((m) => m.source !== source));
		});
	}
	/**
	* Clear all modifiers from all attributes.
	*/
	clearModifiers() {
		this._attributes.forEach((attr) => attr.clearModifiers());
	}
	getModifiers() {
		return [...this._attributes.values()].flatMap((attribute) => attribute.getModifiers());
	}
	/**
	* Get all final attribute values as a record.
	* @returns Record mapping attribute types to their final values
	*/
	getAllValues() {
		const result = {};
		this._attributes.forEach((attr, type) => {
			result[type] = attr.getFinalValue();
		});
		return result;
	}
	/**
	* 气血 = 340 + VITALITY×16.2
	*/
	getMaxHp() {
		return this.getValue(AttributeType.MAX_HP);
	}
	/**
	* 法力 = 200 + SPIRIT×10.8 + WILLPOWER×5.4
	*/
	getMaxMp() {
		return this.getValue(AttributeType.MAX_MP);
	}
	/**
	* Create a deep clone of this AttributeSet.
	* Derived attribute formulas are re-bound automatically via constructor.
	* Only primary attribute base values and all modifiers need to be copied.
	*/
	clone() {
		const cloned = new AttributeSet({});
		this._attributes.forEach((attr, type) => {
			if (!attr.isDerived()) cloned.setBaseValue(type, attr.getBaseValue());
			attr.getModifiers().forEach((mod) => cloned.addModifier({ ...mod }));
		});
		return cloned;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/units/BuffContainer.ts
/**
* BuffContainer - Buff 容器
*
* GAS+EDA 架构设计：
* - 管理 Unit 身上的所有 Buff
* - 负责调用 Buff 的生命周期方法（setOwner → onActivate → onDeactivate）
* - 处理标签免疫检查和堆叠规则
*/
var BuffContainer = class BuffContainer {
	_buffs = /* @__PURE__ */ new Map();
	_owner;
	constructor(owner) {
		this._owner = owner;
	}
	/**
	* 添加 Buff
	* @param buff 要添加的 Buff
	* @param source Buff 来源（通常是施法者），用于 DOT 伤害归属等
	*/
	addBuff(buff, source, origin) {
		this._applyBuff(buff, source, origin, "runtime");
	}
	/**
	* 绑定战斗开始前已经存在的 Buff。
	* 初始化状态只进入首帧快照，不产生战斗中的申请、触发或可见事实。
	*/
	initializeBuff(buff, source, origin) {
		this._applyBuff(buff, source, origin, "initialization");
	}
	_applyBuff(buff, source, origin, mode) {
		const attribution = this._resolveAttribution(buff, source, origin);
		buff.setResolution?.(origin?.resolution);
		buff.setCombatAttributionV3(attribution);
		let publishedAddEvent;
		if (mode === "runtime") {
			const event = {
				type: "BuffAddEvent",
				timestamp: this._owner.runtime.clock.now(),
				target: this._owner,
				buff,
				source,
				resolution: origin?.resolution,
				isCancelled: false
			};
			publishedAddEvent = this._owner.runtime.events.runInCausalContext({
				origin: attribution.origin,
				trace: this._owner.runtime.events.getCurrentTrace(),
				resolution: origin?.resolution
			}, () => this._owner.runtime.events.publish(event));
			if (event.isCancelled) return;
		}
		const existing = this._buffs.get(buff.id);
		if (existing) {
			const previousLayer = existing.getLayer();
			const application = this._applyStackRule(existing, buff, source, attribution);
			if (application) {
				const appliedBuff = application.buff;
				if (mode === "runtime") {
					this._commitAppliedFact(appliedBuff, attribution, publishedAddEvent.trace, application.transition, previousLayer);
					this._publishLayerChanged(appliedBuff, previousLayer, appliedBuff.getLayer(), "stack", source, origin);
					markBuffAppliedAtCurrentAction(this._owner, appliedBuff);
					this._publishAppliedEvent(appliedBuff, attribution, publishedAddEvent.trace, source, origin);
				}
			}
			return;
		}
		this._buffs.set(buff.id, buff);
		buff.setOwner(this._owner);
		if (source) buff.setSource(source);
		buff.onActivate();
		if (mode === "runtime") {
			this._commitAppliedFact(buff, attribution, publishedAddEvent.trace, "added", 0);
			this._publishLayerChanged(buff, 0, buff.getLayer(), "apply", source, origin);
			markBuffAppliedAtCurrentAction(this._owner, buff);
		}
		this._owner.updateDerivedStats();
		if (mode === "runtime") this._publishAppliedEvent(buff, attribution, publishedAddEvent.trace, source, origin);
	}
	/**
	* 移除 BUFF（手动移除，如驱散）
	*/
	removeBuff(buffId, origin) {
		this._removeBuffWithReason(buffId, "manual", origin);
	}
	removeBuffDispel(buffId, origin) {
		const buff = this._buffs.get(buffId);
		if (!buff || buff.dispelPolicy !== "normal") return false;
		if (buff.dispelMode === "one_layer" && buff.getLayer() > 1) {
			const previousLayer = buff.getLayer();
			buff.setLayer(previousLayer - 1);
			this._commitLayerFact(buff, previousLayer, buff.getLayer(), "dispelled", origin);
			this._publishLayerChanged(buff, previousLayer, buff.getLayer(), "dispel", origin?.source, origin);
			this._owner.updateDerivedStats();
			return true;
		}
		this._publishLayerChanged(buff, buff.getLayer(), 0, "dispel", origin?.source, origin);
		this._removeBuffWithReason(buffId, "dispel", origin);
		return true;
	}
	modifyBuffLayer(buffId, delta, origin) {
		const buff = this._buffs.get(buffId);
		if (!buff) return 0;
		const previousLayer = buff.getLayer();
		const nextLayer = buff.getLayer() + delta;
		if (nextLayer <= 0) {
			this._publishLayerChanged(buff, previousLayer, 0, "effect", origin?.source, origin);
			this._removeBuffWithReason(buffId, origin?.layerChangeReason === "consumed" ? "consumed" : "manual", origin);
			return 0;
		}
		buff.setLayer(nextLayer);
		this._commitLayerFact(buff, previousLayer, buff.getLayer(), origin?.layerChangeReason ?? "modified", origin);
		this._publishLayerChanged(buff, previousLayer, buff.getLayer(), "effect", origin?.source, origin);
		this._owner.updateDerivedStats();
		return buff.getLayer();
	}
	setBuffLayer(buffId, layer, origin) {
		const buff = this._buffs.get(buffId);
		if (!buff) return 0;
		const previousLayer = buff.getLayer();
		if (layer <= 0) {
			this._publishLayerChanged(buff, previousLayer, 0, "effect", origin?.source, origin);
			this._removeBuffWithReason(buffId, origin?.layerChangeReason === "consumed" ? "consumed" : "manual", origin);
			return 0;
		}
		buff.setLayer(layer);
		this._commitLayerFact(buff, previousLayer, buff.getLayer(), origin?.layerChangeReason ?? "modified", origin);
		this._publishLayerChanged(buff, previousLayer, buff.getLayer(), "effect", origin?.source, origin);
		this._owner.updateDerivedStats();
		return buff.getLayer();
	}
	/**
	* 移除 BUFF（过期）
	*/
	removeBuffExpired(buffId, origin) {
		this._removeBuffWithReason(buffId, "expired", origin);
	}
	_removeBuffWithReason(buffId, reason, operation) {
		const buff = this._buffs.get(buffId);
		if (!buff) return;
		if (reason === "dispel") rememberRemovedBuff(this._owner, buff);
		buff.onDeactivate(reason === "consumed" ? "manual" : reason);
		this._buffs.delete(buffId);
		this._owner.updateDerivedStats();
		const attribution = buff.getCombatAttributionV3();
		if (!attribution) throw new Error(`Buff ${buff.id} has no attribution when removed`);
		const resultOrigin = this._resolveFactAttribution(operation?.attribution ?? attribution).origin;
		const causalTrace = operation?.trace ?? this._owner.runtime.events.reserveTrace();
		const previousLayers = buff.getLayer();
		let removedEventParentTrace = causalTrace;
		if (buff.logVisibility !== "debug" && operation?.statusFactVisibility !== "debug") {
			const statusTrace = this._owner.runtime.events.reserveTrace({ parentEventId: causalTrace.eventId });
			removedEventParentTrace = new CombatResultEmitterV3().commit(this._owner, {
				type: "status",
				operation: "remove",
				statusId: buff.id,
				statusName: operation?.statusDisplayName ?? buff.name,
				statusType: buff.type,
				reason: this._statusRemovalReason(reason),
				beforeLayers: previousLayers,
				afterLayers: 0
			}, {
				origin: resultOrigin,
				parentTrace: causalTrace,
				reservedTrace: statusTrace
			}).trace;
		}
		const removedEvent = {
			type: "BuffRemovedEvent",
			timestamp: this._owner.runtime.clock.now(),
			target: this._owner,
			buff,
			resolution: operation?.resolution,
			reason: reason === "consumed" ? "manual" : reason
		};
		this._owner.runtime.events.runInCausalContext({
			origin: resultOrigin,
			trace: removedEventParentTrace,
			resolution: operation?.resolution
		}, () => this._owner.runtime.events.publish(removedEvent));
	}
	removeBuffsOnDeath() {
		let changed = false;
		for (const [id, buff] of this._buffs) {
			if (!buff.removeOnDeath) continue;
			buff.onDeactivate("death");
			this._buffs.delete(id);
			changed = true;
		}
		if (changed) this._owner.updateDerivedStats();
	}
	getAllBuffs() {
		return Array.from(this._buffs.values());
	}
	getAllBuffIds() {
		return Array.from(this._buffs.keys());
	}
	clear() {
		const buffIds = Array.from(this._buffs.keys());
		for (const id of buffIds) {
			const buff = this._buffs.get(id);
			if (buff) buff.onDeactivate("manual");
		}
		this._buffs.clear();
		this._owner.updateDerivedStats();
	}
	_applyStackRule(existing, newBuff, source, attribution) {
		switch (newBuff.stackRule) {
			case StackRule.STACK_LAYER: {
				const previousLayer = existing.getLayer();
				existing.addLayer(newBuff.getLayer());
				existing.refreshToDuration(newBuff.getMaxDuration());
				if (source) existing.setSource(source);
				existing.setCombatAttributionV3(attribution);
				return {
					buff: existing,
					transition: existing.getLayer() > previousLayer ? "stacked" : "refreshed"
				};
			}
			case StackRule.REFRESH_DURATION:
				if (newBuff.stackPriority > existing.stackPriority) return {
					buff: this._replaceBuff(existing, newBuff, source, attribution),
					transition: "replaced"
				};
				existing.refreshToDuration(newBuff.getMaxDuration());
				if (source) existing.setSource(source);
				existing.setCombatAttributionV3(attribution);
				return {
					buff: existing,
					transition: "refreshed"
				};
			case StackRule.OVERRIDE: return {
				buff: this._replaceBuff(existing, newBuff, source, attribution),
				transition: "replaced"
			};
			case StackRule.IGNORE: return null;
		}
		return null;
	}
	_replaceBuff(existing, newBuff, source, attribution) {
		existing.onDeactivate("replace");
		this._buffs.set(existing.id, newBuff);
		newBuff.setOwner(this._owner);
		newBuff.setCombatAttributionV3(attribution);
		if (source) newBuff.setSource(source);
		newBuff.onActivate();
		this._owner.updateDerivedStats();
		return newBuff;
	}
	_publishAppliedEvent(buff, attribution, parentTrace, source, origin) {
		const appliedEvent = {
			type: "BuffAppliedEvent",
			timestamp: this._owner.runtime.clock.now(),
			target: this._owner,
			buff,
			source,
			ability: origin?.ability,
			resolution: origin?.resolution,
			sourceBuff: origin?.buff
		};
		this._owner.runtime.events.runInCausalContext({
			origin: attribution.origin,
			trace: parentTrace,
			resolution: origin?.resolution
		}, () => this._owner.runtime.events.publish(appliedEvent));
	}
	_commitAppliedFact(buff, attribution, parentTrace, transition, beforeLayers) {
		if (buff.logVisibility !== "debug") new CombatResultEmitterV3().commit(this._owner, {
			type: "status",
			operation: "apply",
			transition,
			statusId: buff.id,
			statusName: buff.name,
			statusType: buff.type,
			beforeLayers,
			afterLayers: buff.getLayer(),
			duration: buff.getMaxDuration()
		}, {
			origin: this._resolveFactAttribution(attribution).origin,
			parentTrace
		});
	}
	_statusRemovalReason(reason) {
		if (reason === "dispel") return "dispelled";
		if (reason === "replace") return "replaced";
		return reason;
	}
	_commitLayerFact(buff, beforeLayers, afterLayers, reason, operation) {
		if (buff.logVisibility === "debug" || operation?.statusFactVisibility === "debug" || beforeLayers === afterLayers) return;
		const attribution = buff.getCombatAttributionV3();
		if (!attribution) throw new Error(`Buff ${buff.id} has no attribution when layers change`);
		const parentTrace = operation?.trace ?? this._owner.runtime.events.getCurrentTrace() ?? this._owner.runtime.events.reserveTrace();
		new CombatResultEmitterV3().commit(this._owner, {
			type: "status",
			operation: "layers",
			reason,
			statusId: buff.id,
			statusName: operation?.statusDisplayName ?? buff.name,
			statusType: buff.type,
			beforeLayers,
			afterLayers
		}, {
			origin: this._resolveFactAttribution(operation?.attribution ?? attribution).origin,
			parentTrace
		});
	}
	_resolveFactAttribution(attribution) {
		if (attribution.origin.kind === "system" || attribution.owner === this._owner || attribution.owner.isAlive()) return attribution;
		return CombatAttributionV3.system(this._owner, CombatSystemSourceV3.ACTION_FLOW);
	}
	_resolveAttribution(buff, source, origin) {
		if (origin?.attribution) return origin.attribution;
		if (origin?.ability) return CombatAttributionV3.owned(source ?? this._owner, combatCarrierFromAbilityV3(origin.ability));
		const sourceAttribution = origin?.buff?.getCombatAttributionV3();
		if (sourceAttribution) return CombatAttributionV3.rebind(sourceAttribution.owner, sourceAttribution.origin);
		const carrier = {
			kind: "buff",
			id: buff.id,
			name: buff.name
		};
		return CombatAttributionV3.owned(source ?? this._owner, carrier);
	}
	_publishLayerChanged(buff, previousLayer, currentLayer, reason, source, origin) {
		if (previousLayer === currentLayer) return;
		this._owner.runtime.events.publish({
			type: "BuffLayerChangedEvent",
			timestamp: this._owner.runtime.clock.now(),
			target: this._owner,
			buff,
			source,
			ability: origin?.ability,
			resolution: origin?.resolution,
			previousLayer,
			currentLayer,
			delta: currentLayer - previousLayer,
			reason
		});
	}
	clone(owner) {
		const clone = new BuffContainer(owner);
		for (const buff of this._buffs.values()) {
			const clonedBuff = buff.clone();
			clone._buffs.set(clonedBuff.id, clonedBuff);
			clonedBuff.setOwner(owner);
			const attribution = buff.getCombatAttributionV3();
			if (attribution) clonedBuff.setCombatAttributionV3(CombatAttributionV3.rebind(attribution.owner === this._owner ? owner : attribution.owner, attribution.origin.kind === "owned" && attribution.origin.owner.id === this._owner.id ? {
				...attribution.origin,
				owner: {
					id: owner.id,
					name: owner.name
				}
			} : attribution.origin));
			clonedBuff.onActivate();
		}
		return clone;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/units/CombatResourceContainer.ts
var CombatResourceContainer = class CombatResourceContainer {
	resources = /* @__PURE__ */ new Map();
	noDirectDamageActionCounts = /* @__PURE__ */ new Map();
	dealtDirectDamageThisAction = false;
	owner;
	bindOwner(owner) {
		this.owner = owner;
	}
	define(definition) {
		const max = Math.max(0, Math.floor(definition.max));
		const initial = Math.max(0, Math.min(max, Math.floor(definition.initial)));
		this.resources.set(definition.id, {
			...definition,
			max,
			initial,
			current: initial
		});
		this.noDirectDamageActionCounts.set(definition.id, 0);
	}
	has(id) {
		return this.resources.has(id);
	}
	getCurrent(id) {
		return this.resources.get(id)?.current ?? 0;
	}
	getMax(id) {
		return this.resources.get(id)?.max ?? 0;
	}
	modify(id, delta, source) {
		const resource = this.resources.get(id);
		if (!resource) return 0;
		const before = resource.current;
		const requested = Math.trunc(delta);
		resource.current = Math.max(0, Math.min(resource.max, resource.current + requested));
		this.publishChange(resource, before, requested, source);
		return resource.current;
	}
	set(id, value, source) {
		const resource = this.resources.get(id);
		if (!resource) return 0;
		const before = resource.current;
		resource.current = Math.max(0, Math.min(resource.max, Math.trunc(value)));
		this.publishChange(resource, before, Math.trunc(value) - before, source ? {
			...source,
			operation: source.operation ?? "set"
		} : void 0);
		return resource.current;
	}
	consume(id, amount, source) {
		const resource = this.resources.get(id);
		if (!resource) return 0;
		const before = resource.current;
		const consumed = amount === "all" ? resource.current : Math.min(resource.current, Math.max(0, Math.trunc(amount)));
		resource.current -= consumed;
		const requested = -(amount === "all" ? before : Math.max(0, Math.trunc(amount)));
		this.publishChange(resource, before, requested, source ? {
			...source,
			operation: source.operation ?? (amount === "all" ? "consume_all" : "subtract")
		} : void 0);
		return consumed;
	}
	beginAction() {
		this.dealtDirectDamageThisAction = false;
	}
	markDirectDamageDealt() {
		this.dealtDirectDamageThisAction = true;
		for (const id of this.resources.keys()) this.noDirectDamageActionCounts.set(id, 0);
	}
	finishAction(controlledSkip = false, hasShield = false) {
		if (this.dealtDirectDamageThisAction) return;
		for (const resource of this.resources.values()) {
			if (hasShield && resource.pauseDecayWhileShielded) continue;
			if (this.owner && resource.pauseDecayWhenCounterAtLeast && readRuntimeCounter(this.owner, resource.pauseDecayWhenCounterAtLeast.key) >= resource.pauseDecayWhenCounterAtLeast.value) continue;
			const decay = controlledSkip ? resource.decayOnControlledSkip ?? resource.decayOnNoDirectDamage ?? 0 : resource.decayOnNoDirectDamage ?? 0;
			if (decay <= 0) continue;
			if (controlledSkip) {
				this.noDirectDamageActionCounts.set(resource.id, 0);
				this.applyDecay(resource.id, decay);
				continue;
			}
			const threshold = Math.max(1, Math.floor(resource.noDirectDamageActionsPerDecay ?? 1));
			const count = (this.noDirectDamageActionCounts.get(resource.id) ?? 0) + 1;
			if (count < threshold) {
				this.noDirectDamageActionCounts.set(resource.id, count);
				continue;
			}
			this.noDirectDamageActionCounts.set(resource.id, 0);
			this.applyDecay(resource.id, decay);
		}
	}
	applyDecay(resourceId, decay) {
		if (!this.owner) {
			this.modify(resourceId, -decay);
			return;
		}
		this.modify(resourceId, -decay, {
			attribution: CombatAttributionV3.system(this.owner, CombatSystemSourceV3.RESOURCE_DECAY),
			trace: this.owner.runtime.events.reserveTrace(),
			operation: "decay"
		});
	}
	publishChange(resource, before, requested, source) {
		const owner = this.owner;
		if (!owner || requested === 0 || !source) return;
		const applied = resource.current - before;
		if (applied === 0) return;
		const attribution = source.attribution;
		const parentTrace = source.trace;
		new CombatResultEmitterV3().commit(owner, {
			type: "resource",
			resourceId: resource.id,
			resourceName: resource.name,
			before,
			after: resource.current,
			applied,
			max: resource.max
		}, {
			origin: attribution.origin,
			parentTrace
		});
		const runtime = owner.runtime;
		runtime.events.runInCausalContext({
			origin: attribution.origin,
			trace: parentTrace
		}, () => runtime.events.publish({
			type: "CombatResourceChangeEvent",
			timestamp: runtime.clock.now(),
			target: owner,
			caster: source?.caster,
			ability: source?.ability,
			resourceId: resource.id,
			resourceName: resource.name,
			resourceMax: resource.max,
			operation: source?.operation ?? (requested > 0 ? "add" : "subtract"),
			reason: source?.reason ?? (source?.operation === "decay" ? "decay" : requested > 0 ? "gain" : "spend"),
			requested,
			applied,
			overflow: requested > 0 ? Math.max(0, requested - applied) : 0,
			before,
			after: resource.current
		}));
	}
	snapshots() {
		return Array.from(this.resources.values()).map(({ id, name, icon, current, max }) => ({
			id,
			name,
			icon,
			current,
			max
		}));
	}
	exportDefinitions() {
		return [...this.resources.values()].map((resource) => {
			const definition = { ...resource };
			delete definition.current;
			return definition;
		});
	}
	clone() {
		const clone = new CombatResourceContainer();
		for (const resource of this.resources.values()) {
			clone.define(resource);
			clone.set(resource.id, resource.current);
			clone.noDirectDamageActionCounts.set(resource.id, this.noDirectDamageActionCounts.get(resource.id) ?? 0);
		}
		return clone;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/units/Unit.ts
var Unit = class Unit {
	id;
	name;
	attributes;
	abilities;
	buffs;
	combatResources;
	tags;
	runtime;
	teamId;
	slot;
	currentHp;
	currentMp;
	maxHp;
	maxMp;
	currentShield = 0;
	isDefending = false;
	_runtimeMeta = { spiritualRoots: [] };
	constructor(id, name, baseAttrs, options) {
		this.id = id;
		this.name = name;
		this.runtime = options?.runtime ?? BattleRuntime.standalone;
		this.teamId = options?.teamId ?? `team:${id}`;
		this.slot = options?.slot ?? 0;
		this.attributes = options?.attributes ?? new AttributeSet(baseAttrs);
		this.abilities = options?.abilities ?? new AbilityContainer(this);
		this.buffs = options?.buffs ?? new BuffContainer(this);
		this.combatResources = options?.combatResources ?? new CombatResourceContainer();
		this.combatResources.bindOwner(this);
		this.tags = new GameplayTagContainer();
		this.tags.addTags([GameplayTags.UNIT.TYPE.COMBATANT]);
		this.maxHp = this.attributes.getMaxHp();
		this.maxMp = this.attributes.getMaxMp();
		this.currentHp = this.maxHp;
		this.currentMp = this.maxMp;
		this.currentShield = 0;
	}
	updateDerivedStats() {
		this.maxHp = this.attributes.getMaxHp();
		this.maxMp = this.attributes.getMaxMp();
		this.currentHp = Math.min(this.currentHp, this.maxHp);
		this.currentMp = Math.min(this.currentMp, this.maxMp);
	}
	/**
	* 仅用于战斗单元组装完成后的初始状态。
	* 战斗中的派生属性刷新必须继续使用 updateDerivedStats，避免隐式治疗。
	*/
	initializeCurrentResourcesToMax() {
		this.currentHp = this.maxHp;
		this.currentMp = this.maxMp;
	}
	initializeResources(options) {
		if (typeof options.hp === "number") {
			if (!Number.isFinite(options.hp)) throw new Error("初始气血必须为有限数值");
			this.currentHp = Math.max(0, Math.min(this.maxHp, options.hp));
		}
		if (typeof options.mp === "number") {
			if (!Number.isFinite(options.mp)) throw new Error("初始法力必须为有限数值");
			this.currentMp = Math.max(0, Math.min(this.maxMp, options.mp));
		}
		if (typeof options.shield === "number") {
			if (!Number.isFinite(options.shield)) throw new Error("初始护盾必须为有限数值");
			this.currentShield = Math.max(0, Math.round(options.shield));
		}
	}
	/**
	* 增加护盾
	*/
	addShield(amount) {
		if (amount <= 0) return;
		this.currentShield += Math.round(amount);
	}
	setHp(amount, reason = "set") {
		const beforeHp = this.currentHp;
		const afterHp = Math.max(0, Math.min(this.maxHp, amount));
		if (afterHp === beforeHp) return;
		this.currentHp = afterHp;
		this.runtime.events.publish({
			type: "HpChangedEvent",
			timestamp: this.runtime.clock.now(),
			unit: this,
			beforeHp,
			afterHp,
			delta: afterHp - beforeHp,
			reason
		});
	}
	setMp(amount) {
		this.currentMp = Math.max(0, Math.min(this.maxMp, amount));
	}
	setShield(amount) {
		this.currentShield = Math.max(0, Math.round(amount));
	}
	/**
	* 扣除护盾
	* @returns 剩余未被护盾抵扣的伤害
	*/
	absorbDamage(damage) {
		if (this.currentShield <= 0) return damage;
		if (this.currentShield >= damage) {
			this.currentShield -= damage;
			return 0;
		} else {
			const remainingDamage = damage - this.currentShield;
			this.currentShield = 0;
			return remainingDamage;
		}
	}
	takeDamage(damage) {
		if (damage < 0) {
			console.warn(`Unit.takeDamage: 负数输入 ${damage}，应使用 heal() 方法`);
			damage = 0;
		}
		this.setHp(this.currentHp - damage, "damage");
	}
	heal(amount) {
		const before = this.currentHp;
		const reduction = Math.max(0, Math.min(1, this.attributes.getValue(AttributeType.HEAL_RECEIVED_REDUCTION)));
		const received = Math.round(Math.max(0, amount) * (1 - reduction));
		this.setHp(this.currentHp + received, "heal");
		return this.currentHp - before;
	}
	consumeMp(amount) {
		if (amount < 0) {
			console.warn(`Unit.consumeMp: 负数输入 ${amount}，应使用 restoreMp() 方法`);
			amount = 0;
		}
		if (this.currentMp < amount) return false;
		this.currentMp -= amount;
		return true;
	}
	/**
	* @param amount
	* @returns 削减了多少法力（如果 amount 大于当前法力，则削减当前法力的全部）
	*/
	takeMp(amount) {
		if (amount < 0) {
			console.warn(`Unit.takeMp: 负数输入 ${amount}，应使用 restoreMp() 方法`);
			amount = 0;
		}
		const actualTaken = Math.min(this.currentMp, amount);
		this.currentMp = Math.max(0, this.currentMp - actualTaken);
		return actualTaken;
	}
	restoreMp(amount) {
		const before = this.currentMp;
		this.setMp(this.currentMp + amount);
		return this.currentMp - before;
	}
	isAlive() {
		return this.currentHp > 0;
	}
	getHpPercent() {
		return this.maxHp > 0 ? this.currentHp / this.maxHp : 0;
	}
	getMpPercent() {
		return this.maxMp > 0 ? this.currentMp / this.maxMp : 0;
	}
	clone() {
		const tempUnit = new Unit(this.id + "_mirror", this.name + "的镜像", this.attributes.getAllValues(), {
			runtime: this.runtime,
			teamId: this.teamId,
			slot: this.slot
		});
		const clonedAttributes = this.attributes.clone();
		const clonedAbilities = this.abilities.clone(tempUnit);
		const clonedBuffs = this.buffs.clone(tempUnit);
		const clonedCombatResources = this.combatResources.clone();
		const clone = new Unit(this.id + "_mirror", this.name + "的镜像", this.attributes.getAllValues(), {
			attributes: clonedAttributes,
			abilities: clonedAbilities,
			buffs: clonedBuffs,
			combatResources: clonedCombatResources,
			runtime: this.runtime,
			teamId: this.teamId,
			slot: this.slot
		});
		clone.currentHp = this.currentHp;
		clone.currentMp = this.currentMp;
		clone.maxHp = this.maxHp;
		clone.maxMp = this.maxMp;
		clone.currentShield = this.currentShield;
		clone.setSpiritualRoots(this.getSpiritualRoots());
		clone.setRealmMeta(this.getRealmMeta());
		clone.tags.clear();
		clone.tags.addTags(this.tags.getTags());
		return clone;
	}
	getSnapshot() {
		return {
			unitId: this.id,
			name: this.name,
			attributes: this.attributes.getAllValues(),
			currentHp: this.currentHp,
			maxHp: this.maxHp,
			currentMp: this.currentMp,
			maxMp: this.maxMp,
			buffs: this.buffs.getAllBuffIds(),
			combatResources: this.combatResources.snapshots(),
			isAlive: this.isAlive(),
			hpPercent: this.getHpPercent(),
			mpPercent: this.getMpPercent(),
			currentShield: this.currentShield,
			abilities: this.abilities.getSnapshots(),
			baseAttributes: this.attributes.getAllBaseValues()
		};
	}
	resetTurnState() {
		this.isDefending = false;
	}
	setSpiritualRoots(spiritualRoots) {
		this._runtimeMeta.spiritualRoots = spiritualRoots.map((root) => ({ ...root }));
	}
	getSpiritualRoots() {
		return this._runtimeMeta.spiritualRoots.map((root) => ({ ...root }));
	}
	setRealmMeta(meta) {
		this._runtimeMeta.realm = meta.realm;
		this._runtimeMeta.realmStage = meta.realmStage;
		this._runtimeMeta.realmRank = meta.realmRank;
	}
	getRealmMeta() {
		return {
			realm: this._runtimeMeta.realm,
			realmStage: this._runtimeMeta.realmStage,
			realmRank: this._runtimeMeta.realmRank
		};
	}
	getCurrentShield() {
		return this.currentShield;
	}
	getMaxHp() {
		return this.maxHp;
	}
	getMaxMp() {
		return this.maxMp;
	}
	getCurrentHp() {
		return this.currentHp;
	}
	getCurrentMp() {
		return this.currentMp;
	}
};
//#endregion
//#region src/shared/engine/battle-v5/persistence/BattleStateCodec.ts
function instantiateBattleBlueprint(blueprint, runtime = new BattleRuntime(), applyStartingBuffs = true) {
	validateBlueprint(blueprint);
	const roster = new BattleRoster(blueprint.teams.flatMap((team) => team.units.map((unitBlueprint) => instantiateUnit(team.id, unitBlueprint, runtime))));
	if (applyStartingBuffs) for (const team of blueprint.teams) for (const unitBlueprint of team.units) {
		const owner = roster.getUnit(unitBlueprint.id);
		for (const startingBuff of unitBlueprint.startingBuffs) applyBuffBlueprint(owner, startingBuff, roster);
	}
	return {
		runtime,
		roster
	};
}
function captureBattleCheckpoint(input) {
	validateBlueprint(input.blueprint);
	const expectedIds = new Set(input.blueprint.teams.flatMap((team) => team.units.map((unit) => unit.id)));
	assertSameUnitIds(new Set(input.roster.units.keys()), expectedIds, "checkpoint roster");
	const units = {};
	for (const unit of input.roster.getAllUnits()) {
		const runtimeState = getBattleRuntimeState(unit);
		units[unit.id] = {
			unitId: unit.id,
			hp: unit.getCurrentHp(),
			mp: unit.getCurrentMp(),
			shield: unit.getCurrentShield(),
			cooldowns: Object.fromEntries(unit.abilities.getAllAbilities().filter((ability) => ability instanceof ActiveSkill).map((ability) => [ability.id, ability.currentCooldown])),
			combatResources: Object.fromEntries(unit.combatResources.snapshots().map((resource) => [resource.id, resource.current])),
			tags: unit.tags.getTags(),
			buffs: unit.buffs.getAllBuffs().map((buff) => serializeBuff(buff)),
			recentRemovedBuffs: runtimeState.removedBuffs.map((buff) => serializeBuff(buff)),
			runtimeState: exportBattleRuntimeState(unit)
		};
	}
	const checkpoint = {
		version: "battle_checkpoint_v1",
		battleId: input.blueprint.battleId,
		blueprintRevision: input.blueprint.revision,
		checkpointRevision: input.checkpointRevision,
		round: input.round,
		phase: "planning",
		runtime: input.runtime.exportCursor(),
		units
	};
	validateCheckpoint(input.blueprint, checkpoint);
	return cloneJson(checkpoint);
}
function restoreBattleSave(save) {
	validateBattleSave(save);
	const runtime = new BattleRuntime();
	runtime.restoreCursor(save.checkpoint.runtime);
	const { roster } = instantiateBattleBlueprint(save.blueprint, runtime, false);
	for (const checkpointUnit of Object.values(save.checkpoint.units)) {
		const unit = roster.getUnit(checkpointUnit.unitId);
		unit.initializeResources({
			hp: checkpointUnit.hp,
			mp: checkpointUnit.mp,
			shield: checkpointUnit.shield
		});
		for (const [resourceId, value] of Object.entries(checkpointUnit.combatResources)) unit.combatResources.set(resourceId, value);
		for (const [abilityId, cooldown] of Object.entries(checkpointUnit.cooldowns)) {
			const ability = unit.abilities.getAbility(abilityId);
			if (!(ability instanceof ActiveSkill)) throw new Error(`Checkpoint references unknown active ability: ${abilityId}`);
			ability.resetCooldown();
			ability.modifyCooldown(cooldown);
		}
		for (const serializedBuff of checkpointUnit.buffs) restoreBuff(unit, serializedBuff, roster);
		unit.tags.clear();
		unit.tags.addTags(checkpointUnit.tags);
		restoreBattleRuntimeState(unit, checkpointUnit.runtimeState);
		const state = getBattleRuntimeState(unit);
		state.removedBuffs = checkpointUnit.recentRemovedBuffs.map((buff) => deserializeBuff(buff));
	}
	return {
		blueprint: cloneJson(save.blueprint),
		checkpoint: cloneJson(save.checkpoint),
		runtime,
		roster
	};
}
function validateBattleSave(save) {
	if (!save || save.version !== "battle_save_v1") throw new Error("Battle save has an invalid version");
	validateBlueprint(save.blueprint);
	validateCheckpoint(save.blueprint, save.checkpoint);
}
function instantiateUnit(teamId, blueprint, runtime) {
	const unit = new Unit(blueprint.id, blueprint.name, blueprint.baseAttributes, {
		runtime,
		teamId,
		slot: blueprint.slot
	});
	unit.setSpiritualRoots(blueprint.spiritualRoots);
	unit.setRealmMeta({
		realm: blueprint.realm,
		realmStage: blueprint.realmStage,
		realmRank: blueprint.realmRank
	});
	blueprint.modifiers.forEach((modifier, index) => {
		unit.attributes.addModifier({
			id: `blueprint:${blueprint.id}:${index}`,
			...modifier,
			source: { sourceType: "battle_blueprint" }
		});
	});
	for (const resource of blueprint.combatResources) unit.combatResources.define(resource);
	for (const config of blueprint.abilityConfigs) unit.abilities.addAbility(AbilityFactory.create(config));
	if (blueprint.defaultAttackConfig) unit.abilities.setDefaultAttack(AbilityFactory.create(blueprint.defaultAttackConfig));
	unit.tags.clear();
	unit.tags.addTags(blueprint.tags);
	unit.updateDerivedStats();
	unit.initializeCurrentResourcesToMax();
	return unit;
}
function applyBuffBlueprint(owner, blueprint, roster) {
	const buff = BuffFactory.create(blueprint.config);
	if (blueprint.layers) buff.setLayer(blueprint.layers);
	owner.buffs.initializeBuff(buff, blueprint.sourceUnitId ? roster.getUnit(blueprint.sourceUnitId) : owner);
	if (blueprint.duration !== void 0) buff.restoreDuration(blueprint.duration, blueprint.config.duration);
}
function serializeBuff(buff) {
	const attribution = buff.getCombatAttributionV3();
	const common = {
		id: buff.id,
		sourceUnitId: buff.getSource()?.id,
		attributionOwnerId: attribution?.owner.id,
		origin: attribution?.origin,
		layer: buff.getLayer(),
		duration: buff.getDuration(),
		maxDuration: buff.getMaxDuration()
	};
	if (buff instanceof DataDrivenBuff) return {
		...common,
		kind: "data",
		config: buff.getConfig()
	};
	if (buff instanceof DelayedRuntimeBuff) return {
		...common,
		kind: "delayed",
		params: buff.getParams(),
		...buff.getRuntimeState()
	};
	throw new Error(`Buff ${buff.id} is not checkpoint-serializable`);
}
function deserializeBuff(serialized) {
	const buff = serialized.kind === "data" ? BuffFactory.create(serialized.config) : new DelayedRuntimeBuff(serialized.params);
	buff.setLayer(serialized.layer);
	buff.restoreDuration(serialized.duration, serialized.maxDuration);
	if (buff instanceof DelayedRuntimeBuff && serialized.kind === "delayed") buff.restoreRuntimeState(serialized.remainingTurns, serialized.triggerCount);
	return buff;
}
function restoreBuff(owner, serialized, roster) {
	const buff = deserializeBuff(serialized);
	const source = serialized.sourceUnitId ? roster.getUnit(serialized.sourceUnitId) : void 0;
	if (!serialized.attributionOwnerId || !serialized.origin) throw new Error(`Active buff ${serialized.id} has no attribution`);
	const attributionOwner = roster.getUnit(serialized.attributionOwnerId);
	owner.buffs.initializeBuff(buff, source, { attribution: CombatAttributionV3.rebind(attributionOwner, serialized.origin) });
}
function validateBlueprint(blueprint) {
	if (!blueprint || blueprint.version !== "battle_blueprint_v1" || !blueprint.battleId || !Number.isSafeInteger(blueprint.revision) || blueprint.revision < 1 || blueprint.teams.length !== 2) throw new Error("Invalid battle blueprint");
	const teamIds = /* @__PURE__ */ new Set();
	const unitIds = /* @__PURE__ */ new Set();
	for (const team of blueprint.teams) {
		if (!team.id || teamIds.has(team.id) || team.units.length < 1 || team.units.length > 4) throw new Error(`Invalid battle blueprint team: ${team.id}`);
		teamIds.add(team.id);
		const slots = /* @__PURE__ */ new Set();
		for (const unit of team.units) {
			if (!unit.id || unitIds.has(unit.id) || slots.has(unit.slot)) throw new Error(`Invalid battle blueprint unit: ${unit.id}`);
			unitIds.add(unit.id);
			slots.add(unit.slot);
		}
	}
}
function validateCheckpoint(blueprint, checkpoint) {
	if (!checkpoint || checkpoint.version !== "battle_checkpoint_v1" || checkpoint.phase !== "planning" || checkpoint.battleId !== blueprint.battleId || checkpoint.blueprintRevision !== blueprint.revision || !Number.isSafeInteger(checkpoint.checkpointRevision) || checkpoint.checkpointRevision < 0 || !Number.isSafeInteger(checkpoint.round) || checkpoint.round < 0) throw new Error("Invalid battle checkpoint");
	const expectedIds = new Set(blueprint.teams.flatMap((team) => team.units.map((unit) => unit.id)));
	assertSameUnitIds(new Set(Object.keys(checkpoint.units)), expectedIds, "checkpoint");
	for (const [unitId, unit] of Object.entries(checkpoint.units)) if (unit.unitId !== unitId || !Number.isFinite(unit.hp) || !Number.isFinite(unit.mp) || !Number.isFinite(unit.shield)) throw new Error(`Invalid checkpoint unit: ${unitId}`);
}
function assertSameUnitIds(actual, expected, label) {
	if (actual.size !== expected.size || [...actual].some((unitId) => !expected.has(unitId))) throw new Error(`${label} unit ids do not match the blueprint`);
}
function cloneJson(value) {
	return JSON.parse(JSON.stringify(value));
}
//#endregion
//#region src/shared/engine/battle-v5/systems/ActionExecutionSystem.ts
/**
* ActionExecutionSystem - 行动执行系统
*
* EDA 架构设计：
* - 订阅 SkillPreCastEvent（施法前摇事件）
* - 检查施法是否被打断
* - 发布 SkillCastEvent（技能正式释放事件）
* - 调用 Ability.execute() 执行技能效果
*
* 职责边界：
* - 此系统负责：施法流程控制、打断判定、技能执行
* - AbilityContainer 负责：技能筛选、发布前摇事件
* - ActiveSkill.execute 负责：MP消耗、冷却启动、技能效果
*/
var ActionExecutionSystem = class {
	eventBus;
	_handlers = /* @__PURE__ */ new Map();
	constructor(eventBus = EventBus.instance) {
		this.eventBus = eventBus;
		this._subscribeToEvents();
	}
	_subscribeToEvents() {
		const preCastHandler = (event) => this._onSkillPreCast(event);
		this.eventBus.subscribe("SkillPreCastEvent", preCastHandler, EventPriorityLevel.SKILL_PRE_CAST);
		this._handlers.set("SkillPreCastEvent", preCastHandler);
	}
	/**
	* 处理施法前摇事件
	* EDA 模式：通过订阅 SkillPreCastEvent 被动触发
	*/
	_onSkillPreCast(event) {
		const eventTrace = event.trace;
		if (!eventTrace) throw new Error("SkillPreCastEvent has no V3 trace");
		if (event.isImmune || event.isInterrupted && event.interruptPolicy !== "uninterruptible") {
			event.ability.cancelPreparedCast();
			const interruptedOrigin = {
				kind: "owned",
				owner: {
					id: event.caster.id,
					name: event.caster.name
				},
				carrier: combatCarrierFromAbilityV3(event.ability)
			};
			this.eventBus.runInCausalContext({
				origin: interruptedOrigin,
				trace: eventTrace
			}, () => {
				new CombatResultEmitterV3().commit(event.isImmune ? event.target : event.caster, {
					type: "defense",
					defense: event.isImmune ? "skill_immune" : "interrupt",
					detail: event.isImmune ? event.immunityReason : void 0
				}, {
					origin: interruptedOrigin,
					parentTrace: eventTrace
				});
				this.eventBus.publish({
					type: "SkillInterruptEvent",
					timestamp: event.caster.runtime.clock.now(),
					caster: event.caster,
					target: event.target,
					ability: event.ability,
					reason: event.isImmune ? `${event.immunityReason ?? "技能免疫"}：技能被免疫` : "施法被打断"
				});
				if (event.queuedActionState) {
					new CombatResultEmitterV3().commit(event.caster, {
						type: "action_state",
						stateType: "queued_action",
						phase: "cancelled",
						name: event.queuedActionState.name,
						remainingActions: 0,
						ability: {
							id: event.ability.id,
							name: event.ability.name
						}
					}, {
						origin: interruptedOrigin,
						parentTrace: eventTrace
					});
					this.eventBus.publish({
						type: "ActionStateEvent",
						timestamp: event.caster.runtime.clock.now(),
						unit: event.caster,
						stateType: "queued_action",
						phase: "cancelled",
						name: event.queuedActionState.name,
						remainingActions: 0,
						sourceAbility: event.queuedActionState.sourceAbility,
						ability: {
							id: event.ability.id,
							name: event.ability.name
						},
						reason: event.isImmune ? `${event.immunityReason ?? "技能免疫"}：技能被免疫` : "施法被打断"
					});
				}
			});
			return;
		}
		let ability = event.ability;
		let target = event.target;
		let targets = event.targets?.length ? [...event.targets] : [target];
		if (ability instanceof ActiveSkill && !ability.canExecutePreparedCast(event.caster)) {
			ability.cancelPreparedCast();
			const fallbackTarget = event.fallbackTarget;
			if (!fallbackTarget || fallbackTarget === event.caster || !fallbackTarget.isAlive()) return;
			const fallback = event.caster.abilities.getFallbackBasicAttack();
			fallback.prepareCast({
				caster: event.caster,
				target: fallbackTarget
			});
			ability = fallback;
			target = fallbackTarget;
			targets = [fallbackTarget];
		} else if (ability instanceof ActiveSkill && ability.preparedTarget) {
			target = ability.preparedTarget;
			if (!event.targets?.length) targets = [target];
		}
		const origin = {
			kind: "owned",
			owner: {
				id: event.caster.id,
				name: event.caster.name
			},
			carrier: combatCarrierFromAbilityV3(ability)
		};
		const sequence = this.eventBus.getCurrentSequence();
		if (sequence?.phase === "action") sequence.ability = {
			id: ability.id,
			name: ability.name
		};
		const castEvents = targets.map((castTarget) => {
			const resolution = createHitResolution({
				actionId: `${event.caster.id}:action:${event.caster.runtime.states.getUnitState(event.caster).actionSequence}`,
				castId: `${event.caster.id}:cast:${eventTrace.eventId}`,
				caster: event.caster,
				target: castTarget
			});
			const castEvent = {
				type: "SkillCastEvent",
				timestamp: event.caster.runtime.clock.now(),
				caster: event.caster,
				target: castTarget,
				ability,
				interruptPolicy: event.interruptPolicy,
				hitPolicy: event.hitPolicy,
				resolution
			};
			this.eventBus.publish({
				type: "AbilityCastStartedEvent",
				timestamp: event.caster.runtime.clock.now(),
				caster: event.caster,
				target: castTarget,
				ability,
				resolution
			});
			return this.eventBus.runInCausalContext({
				origin,
				trace: eventTrace
			}, () => this.eventBus.publish(castEvent));
		});
		const castTrace = castEvents[0]?.trace;
		if (!castTrace) throw new Error("SkillCastEvent has no V3 trace");
		this.eventBus.runInCausalContext({
			origin,
			trace: castTrace
		}, () => {
			if (event.queuedActionState) {
				new CombatResultEmitterV3().commit(event.caster, {
					type: "action_state",
					stateType: "queued_action",
					phase: "triggered",
					name: event.queuedActionState.name,
					remainingActions: 0,
					ability: {
						id: ability.id,
						name: ability.name
					}
				}, {
					origin,
					parentTrace: castTrace
				});
				this.eventBus.publish({
					type: "ActionStateEvent",
					timestamp: event.caster.runtime.clock.now(),
					unit: event.caster,
					stateType: "queued_action",
					phase: "triggered",
					name: event.queuedActionState.name,
					remainingActions: 0,
					sourceAbility: event.queuedActionState.sourceAbility,
					ability: {
						id: ability.id,
						name: ability.name
					}
				});
			}
			if (ability instanceof ActiveSkill) {
				ability.executeMultiple(event.caster, castEvents.map((castEvent) => ({
					target: castEvent.target,
					shouldApplyEffects: castEvent.isHit !== false,
					resolution: castEvent.resolution
				})));
				for (const castEvent of castEvents) {
					const resolution = castEvent.resolution;
					if (!resolution) continue;
					this.eventBus.publish({
						type: "HitSettledEvent",
						timestamp: event.caster.runtime.clock.now(),
						caster: event.caster,
						target: castEvent.target,
						ability,
						segmentCount: consumeDamageSegmentCount(resolution),
						resolution
					});
				}
			} else {
				const castEvent = castEvents[0];
				ability.execute({
					caster: event.caster,
					target,
					shouldApplyEffects: castEvent?.isHit !== false
				});
				const resolution = castEvent?.resolution;
				if (resolution) this.eventBus.publish({
					type: "HitSettledEvent",
					timestamp: event.caster.runtime.clock.now(),
					caster: event.caster,
					target: castEvent.target,
					ability,
					segmentCount: consumeDamageSegmentCount(resolution),
					resolution
				});
			}
			const primaryResolution = castEvents[0]?.resolution;
			if (primaryResolution) this.eventBus.publish({
				type: "AbilityCastSettledEvent",
				timestamp: event.caster.runtime.clock.now(),
				caster: event.caster,
				target: primaryResolution.target,
				ability,
				resolution: primaryResolution
			});
		});
	}
	/**
	* 销毁系统，取消订阅
	*/
	destroy() {
		for (const [eventType, handler] of this._handlers) this.eventBus.unsubscribe(eventType, handler);
		this._handlers.clear();
	}
};
//#endregion
//#region src/shared/engine/battle-v5/systems/spiritualRootResonance.ts
var SPIRITUAL_ROOT_DAMAGE_MATCH_PER_STRENGTH = .002;
var SPIRITUAL_ROOT_DAMAGE_MISMATCH_MULTIPLIER = 1;
var SPIRITUAL_ROOT_NEUTRAL_RESONANCE_RATIO = .3;
var RUNTIME_ABILITY_TAG_TO_ELEMENT = Object.fromEntries(Object.entries(ELEMENT_TO_RUNTIME_ABILITY_TAG).map(([element, tag]) => [tag, element]));
function collectEventElements(event) {
	const matched = /* @__PURE__ */ new Set();
	const tags = [...event.ability?.tags.getTags() ?? [], ...event.buff?.tags.getTags() ?? []];
	for (const tag of tags) {
		const element = RUNTIME_ABILITY_TAG_TO_ELEMENT[tag];
		if (element) matched.add(element);
	}
	return Array.from(matched);
}
function calculateSpiritualRootDamageMultiplier(event) {
	if (event.damageSource === DamageSource.REFLECT || !event.caster) return 1;
	const elements = collectEventElements(event);
	const spiritualRoots = event.caster.getSpiritualRoots();
	if (elements.length === 0) {
		const strongestStrength = spiritualRoots.reduce((strongest, root) => Math.max(strongest, root.strength), -1);
		return strongestStrength >= 0 ? 1 + strongestStrength * SPIRITUAL_ROOT_DAMAGE_MATCH_PER_STRENGTH * SPIRITUAL_ROOT_NEUTRAL_RESONANCE_RATIO : 1;
	}
	let strongestMatchedStrength = -1;
	for (const root of spiritualRoots) if (elements.includes(root.element) && root.strength > strongestMatchedStrength) strongestMatchedStrength = root.strength;
	if (strongestMatchedStrength >= 0) return 1 + strongestMatchedStrength * SPIRITUAL_ROOT_DAMAGE_MATCH_PER_STRENGTH;
	if (event.ability?.tags.hasTag(GameplayTags.ABILITY.MECHANIC.IGNORE_SPIRITUAL_ROOT_MISMATCH) || event.buff?.tags.hasTag(GameplayTags.ABILITY.MECHANIC.IGNORE_SPIRITUAL_ROOT_MISMATCH)) return 1;
	return SPIRITUAL_ROOT_DAMAGE_MISMATCH_MULTIPLIER;
}
//#endregion
//#region src/shared/engine/battle-v5/systems/DamageSystem.ts
/**
* DamageSystem - 伤害系统
*
* EDA 架构设计：
* - 订阅 SkillCastEvent，执行命中判定，发布 DamageSegmentRequestedEvent
* - 订阅 DamageSegmentRequestedEvent，先完成数值结算，再由较低优先级处理最终应用
*
* 统一伤害管道：
* ┌─────────────────────────────────────────────────────────────────────┐
* │  技能伤害: SkillCastEvent → HitCheckEvent → DamageSegmentRequestedEvent     │
* │  DOT伤害:  ActionPreEvent ─────────────────→ DamageSegmentRequestedEvent     │
* │  反伤等:   其他来源 ──────────────────────→ DamageSegmentRequestedEvent     │
* └─────────────────────────────────────────────────────────────────────┘
*                              ↓
*         DamageSegmentRequestedEvent → [数值结算] → [护盾/免疫响应] → 气血更新 → DamageSegmentAppliedEvent
*/
var DamageSystem = class {
	eventBus;
	random;
	_handlers = /* @__PURE__ */ new Map();
	constructor(eventBus = EventBus.instance, random = { next: battleRandom }) {
		this.eventBus = eventBus;
		this.random = random;
		this._subscribeToEvents();
	}
	_subscribeToEvents() {
		const skillCastHandler = (event) => this._onSkillCast(event);
		this.eventBus.subscribe("SkillCastEvent", skillCastHandler, EventPriorityLevel.HIT_CHECK);
		this._handlers.set("SkillCastEvent", skillCastHandler);
		const damageRequestHandler = (event) => this._onDamageRequestCalculate(event);
		this.eventBus.subscribe("DamageSegmentRequestedEvent", damageRequestHandler, EventPriorityLevel.DAMAGE_REQUEST);
		this._handlers.set("DamageSegmentRequestedEvent", damageRequestHandler);
		const damageApplyHandler = (event) => this._onDamageApply(event);
		this.eventBus.subscribe("DamageSegmentRequestedEvent", damageApplyHandler, EventPriorityLevel.DAMAGE_APPLY - 1);
		this._handlers.set("DamageSegmentRequestedEvent:apply", damageApplyHandler);
	}
	/**
	* 响应技能释放事件，执行命中判定
	* 流程：SkillCastEvent → HitCheckEvent → DamageSegmentRequestedEvent
	*/
	_onSkillCast(event) {
		const { caster, target, ability } = event;
		const resolution = requireResolution(event);
		const hitCheckEvent = {
			type: "HitCheckEvent",
			timestamp: caster.runtime.clock.now(),
			caster,
			target,
			ability,
			resolution,
			isHit: true,
			isDodged: false,
			isResisted: false,
			hitPolicy: event.hitPolicy
		};
		if (caster === target || event.hitPolicy === "guaranteed") hitCheckEvent.isHit = true;
		else {
			const evasionRate = target.attributes.getValue(AttributeType.EVASION_RATE);
			const accuracy = caster.attributes.getValue(AttributeType.ACCURACY);
			const dodgeChance = Math.max(3, Math.min(45, (evasionRate - accuracy) * 100));
			if (this.random.next() * 100 < dodgeChance) {
				hitCheckEvent.isDodged = true;
				hitCheckEvent.isHit = false;
			}
		}
		const publishedHitCheck = this.eventBus.publish(hitCheckEvent);
		this.eventBus.publish({
			type: "HitResolvedEvent",
			timestamp: caster.runtime.clock.now(),
			caster,
			target,
			ability,
			isHit: hitCheckEvent.isHit,
			isDodged: hitCheckEvent.isDodged,
			isResisted: hitCheckEvent.isResisted,
			resolution
		});
		if (hitCheckEvent.isDodged) {
			const attribution = CombatAttributionV3.owned(target, {
				kind: "mechanic",
				id: "evasion",
				name: "闪避"
			});
			if (!publishedHitCheck.trace) throw new Error("Dodge result has no trace");
			new CombatResultEmitterV3().commit(target, {
				type: "defense",
				defense: "dodge"
			}, {
				origin: attribution.origin,
				parentTrace: publishedHitCheck.trace
			});
			this.eventBus.publish({
				type: "DodgeEvent",
				timestamp: caster.runtime.clock.now(),
				caster,
				target,
				ability,
				resolution
			});
		}
		event.isHit = hitCheckEvent.isHit;
		event.isDodged = hitCheckEvent.isDodged;
		event.isResisted = hitCheckEvent.isResisted;
	}
	/**
	* 响应伤害请求事件，执行减伤、随机浮动和伤害应用
	* 所有伤害来源（技能、DOT、反伤）都走此管道
	*
	* 统一结算管道顺序：
	* ① 按伤害类型计算有效防御（物理DEF/法术DEF/真伤）
	* ② 应用平滑防御 A²/(A+D)
	* ③ 应用现有增伤/减伤乘区
	* ④ 应用灵根共鸣/失配倍率
	* ⑤ 暴击判定（减伤后）
	* ⑥ 随机浮动 (0.9~1.1)
	* ⑦ 最小伤害保证 + 四舍五入
	*/
	_onDamageRequestCalculate(event) {
		if (!event.target.isAlive()) return;
		const { target } = event;
		const damageType = this._resolveDamageType(event);
		if (event.calculationMode === "resolved_final") {
			event.finalDamage = Math.max(1, Math.round(event.finalDamage));
			return;
		}
		let effectiveDef = 0;
		if (event.damageSource === DamageSource.DIRECT || event.damageSource === DamageSource.COUNTER || event.damageSource === DamageSource.FOLLOW_UP) {
			if (damageType === DamageType.PHYSICAL) effectiveDef = target.attributes.getValue(AttributeType.DEF) * (1 - Math.max(0, Math.min(.5, event.caster?.attributes.getValue(AttributeType.ARMOR_PENETRATION) ?? 0)));
			else if (damageType === DamageType.MAGICAL) effectiveDef = target.attributes.getValue(AttributeType.MAGIC_DEF) * (1 - Math.max(0, Math.min(.5, event.caster?.attributes.getValue(AttributeType.MAGIC_PENETRATION) ?? 0)));
		}
		const preMitigationDamage = event.finalDamage;
		event.finalDamage = this._applyDefense(event, preMitigationDamage, effectiveDef);
		const increasePct = Math.max(0, event.damageIncreasePctBucket ?? 0);
		const reductionPct = Math.min(.7, Math.max(0, event.damageReductionPctBucket ?? 0));
		const damageMultiplier = Math.max(0, 1 + increasePct - reductionPct);
		event.finalDamage *= damageMultiplier;
		event.finalDamage *= this._getRealmDamageMultiplier(event);
		event.finalDamage *= calculateSpiritualRootDamageMultiplier(event);
		if (event.caster && event.canCrit !== false && event.damageSource !== DamageSource.REFLECT) {
			const rawCritRate = event.caster.attributes.getValue(AttributeType.CRIT_RATE);
			const critResist = target.attributes.getValue(AttributeType.CRIT_RESIST);
			const effectiveCritRate = Math.max(0, Math.min(.95, rawCritRate - critResist));
			if (event.forceCritical || event.isCritical || this.random.next() < effectiveCritRate) {
				event.isCritical = true;
				const baseCritMult = event.caster.attributes.getValue(AttributeType.CRIT_DAMAGE_MULT);
				const critDmgReduction = target.attributes.getValue(AttributeType.CRIT_DAMAGE_REDUCTION);
				event.critMultiplier = Math.max(1, baseCritMult - critDmgReduction);
				event.finalDamage *= event.critMultiplier;
			}
		}
		const randomFactor = .9 + this.random.next() * .2;
		event.finalDamage = event.finalDamage * randomFactor;
		event.finalDamage = Math.max(1, Math.round(event.finalDamage));
	}
	_onDamageApply(event) {
		if (!event.target.isAlive() || event.finalDamage <= 0) return;
		if (this._isOwnedDamageSourceDead(event)) return;
		this._updateTargetHealth(event, this._resolveDamageType(event));
	}
	_isOwnedDamageSourceDead(event) {
		if (event.origin?.kind !== "owned") return false;
		const ownerId = event.origin.owner.id;
		const source = [
			event.ability?.getOwner(),
			event.buff?.getCombatAttributionV3()?.owner,
			event.caster
		].find((unit) => unit?.id === ownerId);
		return source ? !source.isAlive() : false;
	}
	_resolveDamageType(event) {
		if (event.damageType) return event.damageType;
		const tags = event.ability?.tags || event.buff?.tags;
		if (tags?.hasTag(GameplayTags.ABILITY.CHANNEL.TRUE)) return DamageType.TRUE;
		if (tags?.hasTag(GameplayTags.ABILITY.CHANNEL.MAGIC)) return DamageType.MAGICAL;
		if (tags?.hasTag(GameplayTags.ABILITY.CHANNEL.PHYSICAL)) return DamageType.PHYSICAL;
		if (tags?.hasTag(GameplayTags.BUFF.DOT.ROOT)) return DamageType.DOT;
		return DamageType.PHYSICAL;
	}
	_applyDefense(event, preMitigationDamage, effectiveDef) {
		const components = event.damageComponents?.filter((component) => Number.isFinite(component.amount) && component.amount > 0);
		if (!components?.length) return this._applySmoothDefense(preMitigationDamage, effectiveDef);
		const componentTotal = components.reduce((sum, component) => sum + component.amount, 0);
		if (componentTotal <= 0) return this._applySmoothDefense(preMitigationDamage, effectiveDef);
		const scale = preMitigationDamage / componentTotal;
		return components.reduce((sum, component) => {
			if (component.mitigation === "bypass_defense") return sum + component.amount * scale;
			if (component.attackBase !== void 0 && component.segmentMultiplier !== void 0) {
				const attackBase = Math.max(0, component.attackBase);
				const multiplier = Math.max(0, component.segmentMultiplier) * scale;
				return sum + this._applySmoothDefense(attackBase, effectiveDef) * multiplier;
			}
			throw new BattleResolutionError("BATTLE_DAMAGE_COMPONENT_INVALID", `Damage component ${component.kind} is missing attackBase/segmentMultiplier`);
		}, 0);
	}
	_applySmoothDefense(attackBase, effectiveDef) {
		const attack = Math.max(0, attackBase);
		const defense = Math.max(0, effectiveDef);
		if (attack <= 0) return 0;
		return attack * attack / (attack + defense);
	}
	_getRealmDamageMultiplier(event) {
		const attackerRank = event.caster?.getRealmMeta().realmRank;
		const defenderRank = event.target.getRealmMeta().realmRank;
		if (attackerRank === void 0 || defenderRank === void 0) return 1;
		return getRealmDamagePressureMultiplier(attackerRank - defenderRank);
	}
	/**
	* 更新目标气血，发布受击事件
	*/
	_updateTargetHealth(damageEvent, damageType) {
		const { target, finalDamage, caster, ability, buff, isCritical, critMultiplier, canLifesteal } = damageEvent;
		if (finalDamage <= 0) return;
		const parentTrace = damageEvent.trace;
		const origin = damageEvent.origin;
		if (!parentTrace || !origin) throw new Error("Damage settlement requires explicit V3 trace and origin");
		const damageResultTrace = this.eventBus.reserveResolutionTrace(parentTrace.eventId);
		const { resolutionId } = damageResultTrace;
		const beforeHp = target.getCurrentHp();
		const beforeShield = target.getCurrentShield();
		const remainingDamage = target.absorbDamage(finalDamage);
		const absorbedAmount = beforeShield - target.getCurrentShield();
		if (beforeShield > 0 && target.getCurrentShield() <= 0) this.eventBus.publish({
			type: "ShieldBreakEvent",
			timestamp: target.runtime.clock.now(),
			caster,
			target,
			ability,
			buff,
			brokenShieldAmount: beforeShield,
			overflowDamage: remainingDamage,
			damageSource: damageEvent.damageSource
		});
		const hpDamage = damageEvent.resolution?.hitId !== void 0 && isDeathProtectedHit(target, damageEvent.resolution.hitId, damageEvent.damageSource) ? Math.min(remainingDamage, Math.max(0, beforeHp - 1)) : remainingDamage;
		target.takeDamage(hpDamage);
		const actualHpDamage = Math.max(0, beforeHp - target.getCurrentHp());
		if (actualHpDamage + absorbedAmount <= 0) return;
		if (actualHpDamage + absorbedAmount > 0) {
			markDamageDealt(caster);
			if (damageEvent.damageSource === DamageSource.DIRECT) caster?.combatResources.markDirectDamageDealt();
		}
		const damageTakenTrace = this.eventBus.reserveTrace({
			resolutionId,
			parentEventId: parentTrace.eventId
		});
		this.eventBus.runInCausalContext({
			origin,
			trace: parentTrace
		}, () => this.eventBus.publishImmutable({
			type: "DamageSegmentAppliedEvent",
			timestamp: target.runtime.clock.now(),
			caster,
			target,
			ability,
			buff,
			damageSource: damageEvent.damageSource,
			damageType,
			calculationMode: damageEvent.calculationMode,
			cause: damageEvent.cause,
			damageTags: damageEvent.damageTags,
			finalDamage: damageEvent.finalDamage,
			reflectSourceName: damageEvent.damageSource === DamageSource.REFLECT ? caster?.name : void 0,
			damageTaken: actualHpDamage,
			beforeHp,
			remainHp: target.getCurrentHp(),
			shieldAbsorbed: absorbedAmount,
			remainShield: target.getCurrentShield(),
			hpReachedZeroBeforeReactions: target.getCurrentHp() <= 0,
			isCritical,
			critMultiplier,
			canLifesteal,
			trace: damageTakenTrace,
			origin,
			resolution: damageEvent.resolution
		}));
		const finalHp = target.getCurrentHp();
		const damageResult = new CombatResultEmitterV3().commit(target, {
			type: "damage",
			amount: Math.round(actualHpDamage),
			beforeHp: Math.round(beforeHp),
			afterHp: Math.round(finalHp),
			damageType,
			damageSource: damageEvent.damageSource,
			critical: isCritical ?? false,
			shieldAbsorbed: Math.round(absorbedAmount)
		}, {
			origin,
			parentTrace,
			reservedTrace: damageResultTrace
		});
		if (beforeHp > 0 && finalHp <= 0 && !hasCommittedDeath(target)) {
			markDeathCommitted(target);
			target.buffs.removeBuffsOnDeath();
			new CombatResultEmitterV3().commit(target, {
				type: "unit_died",
				killer: caster ? {
					id: caster.id,
					name: caster.name
				} : void 0
			}, {
				origin,
				parentTrace: damageResult.trace
			});
		}
	}
	/**
	* 销毁系统，取消订阅
	*/
	destroy() {
		for (const [eventType, handler] of this._handlers) this.eventBus.unsubscribe(eventType.split(":", 1)[0], handler);
		this._handlers.clear();
	}
};
//#endregion
//#region src/shared/engine/battle-v5/systems/InitiativeSystem.ts
var InitiativeSystem = class {
	static order(units, random) {
		const ordered = units.filter((unit) => unit.isAlive()).map((unit, index) => ({
			unit,
			index,
			speed: unit.attributes.getValue(AttributeType.ACTION_SPEED)
		})).sort((left, right) => right.speed - left.speed || left.index - right.index);
		let start = 0;
		while (start < ordered.length) {
			let end = start + 1;
			while (end < ordered.length && ordered[end].speed === ordered[start].speed) end += 1;
			for (let index = end - 1; index > start; index--) {
				const swapIndex = start + Math.floor(random.next() * (index - start + 1));
				[ordered[index], ordered[swapIndex]] = [ordered[swapIndex], ordered[index]];
			}
			start = end;
		}
		return ordered.map((entry) => entry.unit);
	}
};
//#endregion
//#region src/shared/lib/gameConceptDisplay.ts
var GAME_CONCEPT_DISPLAY_MAP = {
	hp: {
		label: "气血",
		icon: "❤️",
		description: "当前气血、气血条、恢复气血"
	},
	mp: {
		label: "法力",
		icon: "💧",
		description: "当前法力、法力条、法力消耗"
	},
	maxHp: {
		label: "气血上限",
		icon: "❤️",
		description: "最大气血"
	},
	maxMp: {
		label: "法力上限",
		icon: "💧",
		description: "最大法力"
	},
	hp_loss: {
		label: "气血损失",
		icon: "🩸",
		description: "气血百分比损失"
	},
	mp_loss: {
		label: "法力损失",
		icon: "💧",
		description: "法力百分比损失"
	},
	spirit_stones: {
		label: "灵石",
		icon: "💰",
		description: "通用货币"
	},
	reputation: {
		label: "声望",
		icon: "🏵️",
		description: "天骄宝阁兑换所需的声望"
	},
	contribution: {
		label: "宗门贡献",
		icon: "📜",
		description: "宗门任务与建设所得的宗门内部凭证"
	},
	cultivation_exp: {
		label: "修为",
		icon: "🧘",
		description: "修为进度"
	},
	comprehension_insight: {
		label: "感悟",
		shortLabel: "感悟",
		icon: "💡",
		description: "突破、推演功法与神通所需的感悟"
	},
	world_qi: {
		label: "天地灵气",
		shortLabel: "灵气",
		icon: "🍃",
		description: "玩法行动所消耗的天地灵气"
	},
	lifespan: {
		label: "寿元",
		icon: "🕯️",
		description: "角色寿元"
	},
	material: {
		label: "材料",
		icon: "📦",
		description: "通用材料"
	},
	artifact: {
		label: "法宝",
		icon: "🗡️",
		description: "法宝物品",
		aliases: { naming: "法宝灵器" }
	},
	consumable: {
		label: "消耗品",
		icon: "💊",
		description: "丹药、符箓等消耗品"
	},
	battle: {
		label: "战斗",
		icon: "⚔️",
		description: "战斗事件或代价"
	},
	vitality: {
		label: "体魄",
		icon: "💪",
		shortLabel: "体",
		description: "气血与生命根基，决定最大气血并提供少量法术防御"
	},
	strength: {
		label: "力道",
		icon: "⚔️",
		shortLabel: "力",
		description: "筋力与兵刃威势，决定物理攻击"
	},
	spirit: {
		label: "灵力",
		icon: "⚡",
		shortLabel: "灵",
		description: "灵力浑厚程度，决定法术攻击并提供少量法力"
	},
	endurance: {
		label: "根骨",
		icon: "🦴",
		shortLabel: "骨",
		description: "筋骨坚韧程度，决定物理防御并提供少量最大气血"
	},
	speed: {
		label: "身法",
		icon: "🦶",
		shortLabel: "身",
		description: "身形腾挪与步法根基，影响闪避、命中与行动速度"
	},
	willpower: {
		label: "神识",
		icon: "👁️",
		shortLabel: "识",
		description: "神魂与意志强度，影响法术防御、法力和控制攻防"
	},
	gongfa: {
		label: "功法",
		icon: "📖",
		description: "功法产品",
		aliases: { naming: "功法典籍" }
	},
	skill: {
		label: "神通",
		icon: "📜",
		description: "神通产品",
		aliases: { naming: "神通招式" }
	},
	consumable_pill: {
		label: "丹药",
		icon: "🌕",
		description: "丹药消耗品"
	},
	consumable_talisman: {
		label: "符箓",
		icon: "📜",
		description: "符箓消耗品"
	},
	material_herb: {
		label: "灵药",
		icon: "🌿"
	},
	material_ore: {
		label: "矿石",
		icon: "🪨"
	},
	material_monster: {
		label: "妖兽材料",
		icon: "🐉"
	},
	material_tcdb: {
		label: "天材地宝",
		icon: "💎"
	},
	material_aux: {
		label: "特殊辅料",
		icon: "💧"
	},
	material_gongfa_manual: {
		label: "功法典籍",
		icon: "📖"
	},
	material_skill_manual: {
		label: "神通秘术",
		icon: "📜"
	},
	element_metal: {
		label: "金",
		icon: "⚔️"
	},
	element_wood: {
		label: "木",
		icon: "🌿"
	},
	element_water: {
		label: "水",
		icon: "💧"
	},
	element_fire: {
		label: "火",
		icon: "🔥"
	},
	element_earth: {
		label: "土",
		icon: "⛰️"
	},
	element_wind: {
		label: "风",
		icon: "🌪️"
	},
	element_thunder: {
		label: "雷",
		icon: "⚡"
	},
	element_ice: {
		label: "冰",
		icon: "❄️"
	},
	equipment_weapon: {
		label: "攻击法宝",
		icon: "🗡️",
		aliases: {
			intent: "武器",
			naming: "战器",
			productNaming: "兵刃"
		}
	},
	equipment_armor: {
		label: "护身法宝",
		icon: "🛡️",
		aliases: {
			intent: "护甲",
			naming: "护甲",
			productNaming: "护具"
		}
	},
	equipment_accessory: {
		label: "辅助法宝",
		icon: "💍",
		aliases: {
			intent: "配饰",
			naming: "玉佩",
			productNaming: "饰物"
		}
	},
	attribute_atk: {
		label: "物理攻击",
		icon: "⚔️",
		shortLabel: "物攻"
	},
	attribute_def: {
		label: "物理防御",
		icon: "🛡️",
		shortLabel: "物防"
	},
	attribute_magic_atk: {
		label: "法术攻击",
		icon: "⚡",
		shortLabel: "法攻"
	},
	attribute_magic_def: {
		label: "法术防御",
		icon: "🛡️",
		shortLabel: "法防"
	},
	attribute_action_speed: {
		label: "速度",
		icon: "💨",
		shortLabel: "速度",
		description: "决定战斗中的出手顺序"
	},
	attribute_crit_rate: {
		label: "暴击率",
		icon: "🎯",
		shortLabel: "暴"
	},
	attribute_crit_damage: {
		label: "暴击伤害",
		icon: "💥",
		shortLabel: "暴伤"
	},
	attribute_damage_reduction: {
		label: "伤害减免",
		icon: "🛡️",
		shortLabel: "减伤"
	},
	attribute_hit_rate: {
		label: "命中率",
		icon: "🎯",
		shortLabel: "命"
	},
	attribute_dodge_rate: {
		label: "闪避率",
		icon: "🏃‍♂️",
		shortLabel: "闪避"
	},
	attribute_evasion_rate: {
		label: "闪避率",
		icon: "🏃‍♂️",
		shortLabel: "闪避"
	},
	attribute_control_hit: {
		label: "控制命中",
		icon: "🎯",
		shortLabel: "控命"
	},
	attribute_control_resistance: {
		label: "控制抗性",
		icon: "🛡️",
		shortLabel: "控抗"
	},
	attribute_armor_penetration: {
		label: "破防",
		icon: "🗡️",
		shortLabel: "破防",
		aliases: { detailed: "破甲" }
	},
	attribute_magic_penetration: {
		label: "法术穿透",
		icon: "⚡",
		shortLabel: "法穿",
		aliases: { compact: "法穿" }
	},
	attribute_crit_resist: {
		label: "暴击抗性",
		icon: "🛡️",
		shortLabel: "暴抗",
		aliases: { detailed: "暴击韧性" }
	},
	attribute_crit_damage_reduction: {
		label: "暴伤减免",
		icon: "🛡️",
		shortLabel: "暴减",
		aliases: { detailed: "暴击减伤" }
	},
	attribute_accuracy: {
		label: "命中",
		icon: "🎯",
		shortLabel: "命中",
		aliases: { detailed: "精准" }
	},
	attribute_heal_amplify: {
		label: "治疗加成",
		icon: "💚",
		shortLabel: "治疗",
		aliases: { detailed: "治疗增强" }
	},
	skill_type_attack: {
		label: "攻击",
		icon: "⚔️",
		description: "以伤害为主的直接输出神通"
	},
	skill_type_heal: {
		label: "治疗",
		icon: "💚",
		description: "恢复气血或护持自身的术法"
	},
	skill_type_control: {
		label: "控制",
		icon: "🌀",
		description: "封禁、禁锢、限制对手行动的术法"
	},
	skill_type_debuff: {
		label: "削弱",
		icon: "😈",
		description: "削减对手战力或叠加负面状态的术法"
	},
	skill_type_buff: {
		label: "增益",
		icon: "🌟",
		description: "临时强化自身或友方能力的神通"
	},
	status_burn: {
		label: "灼烧",
		icon: "🔥",
		description: "业火缠身，每回合损失气血"
	},
	status_bleed: {
		label: "流血",
		icon: "🩸",
		description: "伤口难愈，随时间流失气血"
	},
	status_poison: {
		label: "中毒",
		icon: "☠️",
		description: "剧毒入骨，气血与法力缓慢流逝"
	},
	status_stun: {
		label: "眩晕",
		icon: "🌀",
		description: "元神震荡，暂时无法行动"
	},
	status_silence: {
		label: "沉默",
		icon: "🤐",
		description: "法咒受限，无法施展部分神通"
	},
	status_root: {
		label: "定身",
		icon: "🔒",
		description: "身形被禁锢，难以移动与闪避"
	},
	status_armor_up: {
		label: "护体",
		icon: "🛡️",
		description: "护体罡气环绕，大幅减免伤害"
	},
	status_speed_up: {
		label: "疾速",
		icon: "🏃‍♂️",
		description: "身形如电，出手与闪避皆获加成"
	},
	status_crit_rate_up: {
		label: "会心",
		icon: "🎯",
		description: "战意如虹，暴击几率大幅提升"
	},
	status_armor_down: {
		label: "破防",
		icon: "💔",
		description: "护体被破，所受伤害显著增加"
	},
	status_crit_rate_down: {
		label: "暴击降低",
		icon: "💔",
		description: "暴击几率大幅降低"
	},
	status_weakness: {
		label: "虚弱",
		icon: "😰",
		description: "元气大伤，战力大幅下降"
	},
	status_minor_wound: {
		label: "轻伤",
		icon: "🩹",
		description: "身负轻伤，稍有影响"
	},
	status_major_wound: {
		label: "重伤",
		icon: "💥",
		description: "身负重伤，实力大损"
	},
	status_near_death: {
		label: "濒死",
		icon: "☠️",
		description: "命悬一线，随时可能陨落"
	},
	status_breakthrough_focus: {
		label: "破境凝神",
		icon: "🕯️",
		description: "心神收束，下一次破境成功率提升"
	},
	status_protect_meridians: {
		label: "护脉",
		icon: "🪢",
		description: "药力护住经脉，突破失败时降低修为损失"
	},
	status_clear_mind: {
		label: "清心",
		icon: "🪷",
		description: "心境澄明，突破失败不会滋生心魔"
	},
	status_cultivation_boost: {
		label: "养元",
		icon: "🌿",
		description: "药力温养丹田，下一次闭关修为提升"
	},
	status_artifact_damaged: {
		label: "法宝受损",
		icon: "💔",
		description: "法宝损坏，威力大减"
	},
	status_mana_depleted: {
		label: "法力枯竭",
		icon: "💧",
		description: "法力耗尽，难以施展术法"
	},
	status_hp_deficit: {
		label: "气血不足",
		icon: "❤️",
		description: "气血亏虚，行动受限"
	},
	status_scorching: {
		label: "酷热",
		icon: "🌡️",
		description: "烈日当空，持续受到灼烧"
	},
	status_freezing: {
		label: "严寒",
		icon: "❄️",
		description: "天寒地冻，行动迟缓"
	},
	status_toxic_air: {
		label: "瘴气",
		icon: "☁️",
		description: "毒气弥漫，持续中毒"
	},
	status_formation_suppressed: {
		label: "阵法压制",
		icon: "⛓️",
		description: "被阵法压制，实力受限"
	},
	status_abundant_qi: {
		label: "灵气充沛",
		icon: "🍃",
		description: "灵气浓郁，修炼速度提升"
	}
};
function getConceptInfo(key) {
	const info = getGameConceptInfo(key);
	return {
		label: info.label,
		icon: info.icon
	};
}
function getResourceText(key) {
	return getGameConceptLabel(key);
}
function getResourceLabel(resource) {
	return getResourceText(resource);
}
var ELEMENT_CONCEPT_KEYS = {
	金: "element_metal",
	木: "element_wood",
	水: "element_water",
	火: "element_fire",
	土: "element_earth",
	风: "element_wind",
	雷: "element_thunder",
	冰: "element_ice"
};
getConceptInfo(ELEMENT_CONCEPT_KEYS.金), getConceptInfo(ELEMENT_CONCEPT_KEYS.木), getConceptInfo(ELEMENT_CONCEPT_KEYS.水), getConceptInfo(ELEMENT_CONCEPT_KEYS.火), getConceptInfo(ELEMENT_CONCEPT_KEYS.土), getConceptInfo(ELEMENT_CONCEPT_KEYS.风), getConceptInfo(ELEMENT_CONCEPT_KEYS.雷), getConceptInfo(ELEMENT_CONCEPT_KEYS.冰);
function getAttributeConceptInfo(key) {
	const info = getGameConceptInfo(key);
	return {
		label: info.label,
		icon: info.icon,
		shortLabel: info.shortLabel ?? info.label,
		description: info.description ?? ""
	};
}
getAttributeConceptInfo("vitality"), getAttributeConceptInfo("strength"), getAttributeConceptInfo("spirit"), getAttributeConceptInfo("endurance"), getAttributeConceptInfo("speed"), getAttributeConceptInfo("willpower"), getAttributeConceptInfo("attribute_crit_rate"), getAttributeConceptInfo("attribute_crit_damage"), getAttributeConceptInfo("attribute_damage_reduction"), getAttributeConceptInfo("attribute_damage_reduction"), getAttributeConceptInfo("attribute_hit_rate"), getAttributeConceptInfo("attribute_dodge_rate");
function getSkillTypeConceptInfo(key) {
	const info = getGameConceptInfo(key);
	return {
		label: info.label,
		icon: info.icon,
		description: info.description ?? ""
	};
}
getSkillTypeConceptInfo("skill_type_attack"), getSkillTypeConceptInfo("skill_type_heal"), getSkillTypeConceptInfo("skill_type_control"), getSkillTypeConceptInfo("skill_type_debuff"), getSkillTypeConceptInfo("skill_type_buff");
function getStatusConceptInfo(key) {
	const info = getGameConceptInfo(key);
	return {
		label: info.label,
		icon: info.icon,
		description: info.description ?? ""
	};
}
getStatusConceptInfo("status_burn"), getStatusConceptInfo("status_bleed"), getStatusConceptInfo("status_poison"), getStatusConceptInfo("status_stun"), getStatusConceptInfo("status_silence"), getStatusConceptInfo("status_root"), getStatusConceptInfo("status_armor_up"), getStatusConceptInfo("status_speed_up"), getStatusConceptInfo("status_crit_rate_up"), getStatusConceptInfo("status_armor_down"), getStatusConceptInfo("status_crit_rate_down"), getStatusConceptInfo("status_weakness"), getStatusConceptInfo("status_minor_wound"), getStatusConceptInfo("status_major_wound"), getStatusConceptInfo("status_near_death"), getStatusConceptInfo("status_breakthrough_focus"), getStatusConceptInfo("status_protect_meridians"), getStatusConceptInfo("status_clear_mind"), getStatusConceptInfo("status_cultivation_boost"), getStatusConceptInfo("status_artifact_damaged"), getStatusConceptInfo("status_mana_depleted"), getStatusConceptInfo("status_hp_deficit"), getStatusConceptInfo("status_scorching"), getStatusConceptInfo("status_freezing"), getStatusConceptInfo("status_toxic_air"), getStatusConceptInfo("status_formation_suppressed"), getStatusConceptInfo("status_abundant_qi");
getConceptInfo("equipment_weapon"), getConceptInfo("equipment_armor"), getConceptInfo("equipment_accessory");
getConceptInfo("consumable_pill"), getConceptInfo("consumable_talisman");
getConceptInfo("material_herb"), getConceptInfo("material_ore"), getConceptInfo("material_monster"), getConceptInfo("material_tcdb"), getConceptInfo("material_aux"), getConceptInfo("material_gongfa_manual"), getConceptInfo("material_skill_manual");
getConceptInfo("hp"), getConceptInfo("mp"), getConceptInfo("maxHp"), getConceptInfo("maxMp"), getConceptInfo("spirit_stones"), getConceptInfo("reputation"), getConceptInfo("lifespan"), getConceptInfo("cultivation_exp"), getConceptInfo("comprehension_insight"), getConceptInfo("world_qi"), getConceptInfo("material"), getConceptInfo("artifact"), getConceptInfo("consumable"), getConceptInfo("hp_loss"), getConceptInfo("mp_loss"), getConceptInfo("battle");
function getGameConceptInfo(key) {
	return GAME_CONCEPT_DISPLAY_MAP[key] ?? {
		label: key,
		icon: ""
	};
}
function getGameConceptLabel(key) {
	return getGameConceptInfo(key).label;
}
function getGameConceptVariantLabel(key, variant) {
	const info = getGameConceptInfo(key);
	if (variant === "short" && info.shortLabel) return info.shortLabel;
	return info.aliases?.[variant] ?? info.label;
}
//#endregion
//#region src/shared/engine/battle-v5/effects/affixText/attributes.ts
/**
* 属性 → 中文标签的唯一字典。
*
* 所有面向玩家的文案（词缀渲染、战报、UI）都应从这里引用，避免在多处重复定义。
*/
var ATTR_LABELS = {
	[AttributeType.VITALITY]: getGameConceptLabel("vitality"),
	[AttributeType.STRENGTH]: getGameConceptLabel("strength"),
	[AttributeType.SPIRIT]: getGameConceptLabel("spirit"),
	[AttributeType.ENDURANCE]: getGameConceptLabel("endurance"),
	[AttributeType.SPEED]: getGameConceptLabel("speed"),
	[AttributeType.WILLPOWER]: getGameConceptLabel("willpower"),
	[AttributeType.ATK]: getGameConceptVariantLabel("attribute_atk", "short"),
	[AttributeType.DEF]: getGameConceptVariantLabel("attribute_def", "short"),
	[AttributeType.MAGIC_ATK]: getGameConceptVariantLabel("attribute_magic_atk", "short"),
	[AttributeType.MAGIC_DEF]: getGameConceptVariantLabel("attribute_magic_def", "short"),
	[AttributeType.ACTION_SPEED]: getGameConceptLabel("attribute_action_speed"),
	[AttributeType.CRIT_RATE]: getGameConceptLabel("attribute_crit_rate"),
	[AttributeType.CRIT_DAMAGE_MULT]: getGameConceptLabel("attribute_crit_damage"),
	[AttributeType.EVASION_RATE]: getGameConceptLabel("attribute_evasion_rate"),
	[AttributeType.CONTROL_HIT]: getGameConceptLabel("attribute_control_hit"),
	[AttributeType.CONTROL_RESISTANCE]: getGameConceptLabel("attribute_control_resistance"),
	[AttributeType.MAX_HP]: getResourceText("maxHp"),
	[AttributeType.MAX_MP]: getResourceText("maxMp"),
	[AttributeType.ARMOR_PENETRATION]: getGameConceptLabel("attribute_armor_penetration"),
	[AttributeType.MAGIC_PENETRATION]: getGameConceptVariantLabel("attribute_magic_penetration", "compact"),
	[AttributeType.CRIT_RESIST]: getGameConceptLabel("attribute_crit_resist"),
	[AttributeType.CRIT_DAMAGE_REDUCTION]: getGameConceptLabel("attribute_crit_damage_reduction"),
	[AttributeType.ACCURACY]: getGameConceptLabel("attribute_accuracy"),
	[AttributeType.HEAL_AMPLIFY]: getGameConceptLabel("attribute_heal_amplify"),
	[AttributeType.HEAL_RECEIVED_REDUCTION]: "受治疗削弱"
};
function attrLabel(attrType) {
	return ATTR_LABELS[attrType] ?? attrType;
}
//#endregion
//#region src/shared/engine/battle-v5/effects/affixText/format.ts
/**
* 词缀面向玩家的数值格式化。
*
* 与战斗日志 (`effectTextFormat`) 的差异：
*   - 百分比默认四舍五入到整数（34%而非33.75%），更简洁。
*   - 数值默认最多保留 1 位小数，去除多余零。
*/
function formatAffixNumber(value, maxDigits = 1) {
	if (!Number.isFinite(value)) return "0";
	if (Math.abs(value) >= 1 || value === 0) return Math.round(value).toString();
	return value.toFixed(maxDigits).replace(/\.?0+$/, "");
}
/**
* `0.3375` → `"34%"`；`0.015` → `"1.5%"`
*/
function formatAffixPercent(value) {
	if (!Number.isFinite(value)) return "0%";
	const pct = value * 100;
	if (Math.abs(pct) < 1 && pct !== 0) return `${pct.toFixed(1).replace(/\.?0+$/, "")}%`;
	return `${Math.round(pct)}%`;
}
//#endregion
//#region src/shared/engine/battle-v5/effects/affixText/gameplayTagText.ts
var GAMEPLAY_TAG_LABELS = {
	[GameplayTags.ABILITY.FUNCTION.DAMAGE]: "伤害",
	[GameplayTags.ABILITY.FUNCTION.CONTROL]: getGameConceptLabel("skill_type_control"),
	[GameplayTags.ABILITY.FUNCTION.HEAL]: getGameConceptLabel("skill_type_heal"),
	[GameplayTags.ABILITY.FUNCTION.BUFF]: getGameConceptLabel("skill_type_buff"),
	[GameplayTags.ABILITY.FUNCTION.DEBUFF]: "负面技能",
	[GameplayTags.ABILITY.CHANNEL.MAGIC]: "法术",
	[GameplayTags.ABILITY.CHANNEL.PHYSICAL]: "物理",
	[GameplayTags.ABILITY.CHANNEL.TRUE]: "真实",
	[GameplayTags.ABILITY.KIND.SKILL]: getGameConceptLabel("skill"),
	[GameplayTags.ABILITY.KIND.PASSIVE]: "被动",
	[GameplayTags.ABILITY.KIND.ARTIFACT]: getGameConceptLabel("artifact"),
	[GameplayTags.ABILITY.KIND.GONGFA]: getGameConceptLabel("gongfa"),
	[GameplayTags.ABILITY.ELEMENT.FIRE]: `${getGameConceptLabel("element_fire")}系`,
	[GameplayTags.ABILITY.ELEMENT.WATER]: `${getGameConceptLabel("element_water")}系`,
	[GameplayTags.ABILITY.ELEMENT.WOOD]: `${getGameConceptLabel("element_wood")}系`,
	[GameplayTags.ABILITY.ELEMENT.EARTH]: `${getGameConceptLabel("element_earth")}系`,
	[GameplayTags.ABILITY.ELEMENT.METAL]: `${getGameConceptLabel("element_metal")}系`,
	[GameplayTags.ABILITY.ELEMENT.WIND]: `${getGameConceptLabel("element_wind")}系`,
	[GameplayTags.ABILITY.ELEMENT.ICE]: `${getGameConceptLabel("element_ice")}系`,
	[GameplayTags.ABILITY.ELEMENT.THUNDER]: `${getGameConceptLabel("element_thunder")}系`,
	[GameplayTags.ABILITY.TARGET.SINGLE]: "单体",
	[GameplayTags.ABILITY.TARGET.AOE]: "群体",
	[GameplayTags.STATUS.IMMUNE.CONTROL]: "控制免疫",
	[GameplayTags.STATUS.IMMUNE.DEBUFF]: "减益免疫",
	[GameplayTags.STATUS.IMMUNE.FIRE]: "火系免疫",
	[GameplayTags.STATUS.STATE.POISONED]: getGameConceptLabel("status_poison"),
	[GameplayTags.STATUS.STATE.BURNED]: getGameConceptLabel("status_burn"),
	[GameplayTags.STATUS.STATE.FROZEN]: "冻结",
	[GameplayTags.STATUS.STATE.BLEEDING]: getGameConceptLabel("status_bleed"),
	[GameplayTags.STATUS.STATE.CHILLED]: "冰缓",
	[GameplayTags.STATUS.STATE.SHOCKED]: "感电",
	[GameplayTags.STATUS.CATEGORY.BUFF]: "正面状态",
	[GameplayTags.STATUS.CATEGORY.DEBUFF]: "负面状态",
	[GameplayTags.STATUS.CATEGORY.DOT]: "持续伤害状态",
	[GameplayTags.STATUS.CATEGORY.DEF_DEBUFF]: "防御削弱状态",
	[GameplayTags.STATUS.CATEGORY.MYTHIC]: "神话状态",
	[GameplayTags.STATUS.CATEGORY.COMBO]: "连携状态",
	[GameplayTags.STATUS.CATEGORY.MANA_EFF]: "法力效率状态",
	[GameplayTags.STATUS.CONTROL.ROOT]: "控制状态",
	[GameplayTags.STATUS.CONTROL.STUNNED]: getGameConceptLabel("status_stun"),
	[GameplayTags.STATUS.CONTROL.NO_ACTION]: "无法行动",
	[GameplayTags.STATUS.CONTROL.NO_SKILL]: "无法施放神通",
	[GameplayTags.STATUS.CONTROL.NO_BASIC]: "无法普通攻击",
	[GameplayTags.BUFF.TYPE.BUFF]: "正面状态",
	[GameplayTags.BUFF.TYPE.DEBUFF]: "负面状态",
	[GameplayTags.BUFF.TYPE.CONTROL]: "控制状态",
	[GameplayTags.BUFF.DOT.ROOT]: "持续伤害",
	[GameplayTags.BUFF.DOT.POISON]: `${getGameConceptLabel("status_poison")}伤害`,
	[GameplayTags.BUFF.DOT.BURN]: `${getGameConceptLabel("status_burn")}伤害`,
	[GameplayTags.BUFF.DOT.FREEZE]: "冻结伤害",
	[GameplayTags.BUFF.DOT.BLEED]: `${getGameConceptLabel("status_bleed")}伤害`,
	[GameplayTags.BUFF.ELEMENT.FIRE]: `${getGameConceptLabel("element_fire")}系状态`,
	[GameplayTags.BUFF.ELEMENT.WATER]: `${getGameConceptLabel("element_water")}系状态`,
	[GameplayTags.BUFF.ELEMENT.WOOD]: `${getGameConceptLabel("element_wood")}系状态`,
	[GameplayTags.BUFF.ELEMENT.EARTH]: `${getGameConceptLabel("element_earth")}系状态`,
	[GameplayTags.BUFF.ELEMENT.METAL]: `${getGameConceptLabel("element_metal")}系状态`,
	[GameplayTags.BUFF.ELEMENT.WIND]: `${getGameConceptLabel("element_wind")}系状态`,
	[GameplayTags.BUFF.ELEMENT.ICE]: `${getGameConceptLabel("element_ice")}系状态`,
	[GameplayTags.BUFF.ELEMENT.THUNDER]: `${getGameConceptLabel("element_thunder")}系状态`,
	[GameplayTags.BUFF.ELEMENT.POISON]: "毒系状态",
	[GameplayTags.TRAIT.EXECUTE]: "斩杀",
	[GameplayTags.TRAIT.REFLECT]: "反伤",
	[GameplayTags.TRAIT.LIFESTEAL]: "吸血",
	[GameplayTags.TRAIT.MANA_THIEF]: `夺取${getGameConceptLabel("mp")}`,
	[GameplayTags.TRAIT.SHIELD_MASTER]: "护盾强化",
	[GameplayTags.TRAIT.BERSERKER]: "狂战",
	[GameplayTags.TRAIT.COOLDOWN]: "冷却干扰"
};
var DAMAGE_TYPE_LABELS = {
	[DamageType.PHYSICAL]: "物理",
	[DamageType.MAGICAL]: "法术",
	[DamageType.TRUE]: "真实",
	[DamageType.DOT]: "持续伤害（DOT）"
};
var DAMAGE_CHANNEL_TAGS = [
	GameplayTags.ABILITY.CHANNEL.TRUE,
	GameplayTags.ABILITY.CHANNEL.MAGIC,
	GameplayTags.ABILITY.CHANNEL.PHYSICAL
];
var ELEMENT_TAGS = [
	GameplayTags.ABILITY.ELEMENT.FIRE,
	GameplayTags.ABILITY.ELEMENT.WATER,
	GameplayTags.ABILITY.ELEMENT.WOOD,
	GameplayTags.ABILITY.ELEMENT.EARTH,
	GameplayTags.ABILITY.ELEMENT.METAL,
	GameplayTags.ABILITY.ELEMENT.WIND,
	GameplayTags.ABILITY.ELEMENT.ICE,
	GameplayTags.ABILITY.ELEMENT.THUNDER
];
function labelGameplayTag(tag) {
	return GAMEPLAY_TAG_LABELS[tag] ?? tag.split(".").pop() ?? tag;
}
function labelGameplayTags(tags) {
	return Array.from(new Set(tags ?? [])).map(labelGameplayTag);
}
function labelDamageType(damageType) {
	if (!damageType) return "伤害";
	return DAMAGE_TYPE_LABELS[damageType] ?? damageType;
}
function inferDamageTypeLabels(args) {
	const { abilityTags = [], buffTags = [], explicitDamageType, valueAttribute } = args;
	const channel = DAMAGE_CHANNEL_TAGS.find((tag) => abilityTags.includes(tag));
	const element = ELEMENT_TAGS.find((tag) => abilityTags.includes(tag));
	const inferredDamageType = explicitDamageType ?? (buffTags.includes(GameplayTags.BUFF.DOT.ROOT) ? DamageType.DOT : inferDamageTypeFromAttribute(valueAttribute));
	if (inferredDamageType === DamageType.TRUE) return [`${labelDamageType(inferredDamageType)}伤害`];
	if (inferredDamageType === DamageType.DOT) return [labelDamageType(inferredDamageType)];
	const channelLabel = inferredDamageType ? labelDamageType(inferredDamageType) : channel ? labelGameplayTag(channel) : "";
	const labels = [element ? labelGameplayTag(element) : "", channelLabel].filter(Boolean);
	return labels.length > 0 ? [`${labels.join("")}伤害`] : ["伤害"];
}
function labelTagList(tags) {
	return labelGameplayTags(tags).join("、");
}
function inferDamageTypeFromAttribute(attribute) {
	switch (attribute) {
		case AttributeType.MAGIC_ATK:
		case AttributeType.MAGIC_DEF: return DamageType.MAGICAL;
		case AttributeType.ATK:
		case AttributeType.DEF: return DamageType.PHYSICAL;
		default: return;
	}
}
//#endregion
//#region src/shared/engine/battle-v5/effects/affixText/listeners.ts
var EVENT_LABEL = {
	DamageSegmentAppliedEvent: "受击后",
	DamageSegmentRequestedEvent: "造成伤害时",
	RoundPreEvent: "每回合",
	ActionPreEvent: "行动前",
	SkillCastEvent: "施法时",
	BuffAddEvent: "获得状态时",
	BuffAppliedEvent: "状态生效时",
	DodgeEvent: "闪避时",
	ControlResistEvent: "抵抗控制时",
	ShieldBreakEvent: "护盾破裂时",
	HealEvent: "治疗时",
	DeathPreventEvent: "免死触发时"
};
function describeDamageTakenListener(scope) {
	switch (scope) {
		case "owner_as_caster": return "造成伤害后";
		case "owner_as_actor":
		case "global": return "伤害结算后";
		default: return "受击后";
	}
}
function describeDamageRequestListener(scope) {
	switch (scope) {
		case "owner_as_target": return "将受伤害时";
		case "owner_as_actor":
		case "global": return "伤害计算时";
		default: return "造成伤害时";
	}
}
/**
* 把 listenerSpec 翻译成中文前缀。无 listener（静态属性词条）返回空串。
*/
function describeListener(spec, context) {
	if (!spec) return "";
	const eventType = context?.eventType ?? spec.eventType;
	const scope = context?.listenerScope ?? spec.scope;
	switch (eventType) {
		case "DamageSegmentAppliedEvent": return describeDamageTakenListener(scope);
		case "DamageSegmentRequestedEvent": return describeDamageRequestListener(scope);
		default: return EVENT_LABEL[eventType] ?? "";
	}
}
//#endregion
//#region src/shared/engine/battle-v5/effects/affixText/buffText.ts
var BUFF_ID_LABELS = {
	karma_mirror_ready: "业镜",
	thunder_devour_charge: "蓄雷",
	thunder_mark: "雷印",
	blood_ink_talisman: "血墨符",
	wind_exchange_step: "借风",
	heaven_jealousy: "天妒",
	leakless_body: "无漏",
	steal_heaven_first_buff: "偷天印",
	calamity_debt: "劫债"
};
function describeBuffMatch(match) {
	if (match.id) return `「${BUFF_ID_LABELS[match.id] ?? "该状态"}」`;
	if (match.tags?.length) return labelTagList(match.tags);
	return "状态";
}
function describeBuffType(type) {
	switch (type) {
		case "buff": return "正面状态";
		case "debuff": return "负面状态";
		case "control": return "控制状态";
		default: return "状态";
	}
}
function describeStackRuleShort(rule) {
	switch (rule) {
		case "stack_layer": return "可叠层";
		case "refresh_duration": return "重复命中刷新持续";
		case "override": return "新效果覆盖旧效果";
		case "ignore": return "已有时不重复附加";
		default: return "";
	}
}
function describeBuffStatusEffects(buff) {
	const statusTags = buff.statusTags ?? [];
	return [
		statusTags.includes(GameplayTags.STATUS.CONTROL.NO_ACTION) ? "无法行动" : "",
		statusTags.includes(GameplayTags.STATUS.CONTROL.NO_SKILL) ? "无法施放神通" : "",
		statusTags.includes(GameplayTags.STATUS.CONTROL.NO_BASIC) ? "无法普通攻击" : ""
	].filter(Boolean);
}
function formatBuffModifier(mod) {
	const label = attrLabel(mod.attrType);
	const value = mod.value;
	const abs = Math.abs(value);
	const sign = value >= 0 ? "+" : "-";
	switch (mod.type) {
		case ModifierType.ADD: return `${label} ${sign}${formatAffixPercent(abs)}`;
		case ModifierType.MULTIPLY: return `${label} ×${formatAffixNumber(value)}`;
		case ModifierType.BASE:
		case ModifierType.FIXED:
		default: return isPercentageAttributeType(mod.attrType) ? `${label} ${sign}${formatAffixPercent(abs)}` : `${label} ${sign}${formatAffixNumber(abs)}`;
	}
}
function formatBuffValueByLayerModifiers(modifiers) {
	const grouped = /* @__PURE__ */ new Map();
	for (const modifier of modifiers) {
		if (!modifier.valueByLayer?.length) continue;
		const key = `${modifier.type}:${modifier.valueByLayer.join(",")}:${modifierUsesPercent(modifier)}`;
		const group = grouped.get(key) ?? [];
		group.push(modifier);
		grouped.set(key, group);
	}
	return [...grouped.values()].map((group) => {
		const labels = group.map((modifier) => attrLabel(modifier.attrType)).join("、");
		const curve = group[0].valueByLayer ?? [];
		const parts = [];
		for (let start = 0; start < curve.length;) {
			let end = start;
			while (end + 1 < curve.length && curve[end + 1] === curve[start]) end += 1;
			const layer = start === end ? `${start + 1}层` : `${start + 1}～${end + 1}层`;
			const value = modifierUsesPercent(group[0]) ? formatAffixPercent(curve[start]) : formatAffixNumber(curve[start]);
			parts.push(`${layer}${value}`);
			start = end + 1;
		}
		return `${labels}：${parts.join("，")}`;
	});
}
function modifierUsesPercent(modifier) {
	return modifier.type === ModifierType.ADD || modifier.type === ModifierType.FIXED && isPercentageAttributeType(modifier.attrType);
}
function describeBuffListenerInline(listener, buffTags, stackRule, describeEffect) {
	const trigger = describeListener({
		eventType: listener.eventType,
		scope: listener.scope,
		priority: listener.priority,
		...listener.mapping ? { mapping: listener.mapping } : {},
		...listener.guard ? { guard: listener.guard } : {}
	});
	const effectTexts = listener.effects.map((effect) => describeEffect(effect, { buffTags }));
	const stackText = stackRule === "stack_layer" && buffTags?.includes(GameplayTags.BUFF.DOT.ROOT) ? "，按层数放大" : "";
	return `${trigger || "触发时"}${effectTexts.join("、")}${stackText}`;
}
function describeBuffRuntimeSummary(buff, describeEffect) {
	return [
		buff.description ?? "",
		...describeBuffStatusEffects(buff),
		...(buff.modifiers ?? []).filter((modifier) => !modifier.valueByLayer?.length).map(formatBuffModifier),
		...formatBuffValueByLayerModifiers(buff.modifiers ?? []),
		buff.dispelMode === "one_layer" ? "普通驱散每次只移除1层" : "",
		...(buff.listeners ?? []).map((listener) => describeBuffListenerInline(listener, buff.tags, buff.stackRule, describeEffect))
	].filter(Boolean);
}
function describeBuffRuntimeSummaryText(buff, describeEffect) {
	const summary = describeBuffRuntimeSummary(buff, describeEffect);
	return summary.length > 0 ? summary.join("；") : void 0;
}
function describeApplyBuffText(buff, chance, target, describeEffect) {
	const chanceText = chance !== void 0 ? `${formatAffixPercent(chance)}概率` : "";
	const targetText = target === "caster" ? "自身" : target === "target" ? "目标" : "";
	const stateParts = [
		describeBuffType(buff.type),
		buff.duration === -1 ? "常驻" : `${buff.duration}回合`,
		describeStackRuleShort(buff.stackRule)
	].filter(Boolean);
	const effectParts = describeBuffRuntimeSummary(buff, describeEffect);
	const detail = [...stateParts, ...effectParts].join("；");
	return `${chanceText}${targetText ? `给${targetText}` : ""}附加「${buff.name}」${detail ? `（${detail}）` : ""}`;
}
//#endregion
//#region src/shared/engine/battle-v5/effects/affixText/values.ts
/**
* 格式化一个 ScalableValue，例如：
*   { base: 38 }                                  → "38"
*   { base: 38, attribute: 'willpower', coefficient: 0.29 } → "38 + 神识×29%"
*   { attribute: 'spirit', coefficient: 0.5 }     → "灵力×50%"
*   { targetMaxHpRatio: 0.08 }                    → "目标气血8%"
*   { targetMaxMpRatio: 0.08 }                    → "目标法力8%"
*/
function formatScalableValue(value) {
	const parts = [];
	if (value.base !== void 0 && value.base !== 0) parts.push(formatAffixNumber(value.base ?? 0));
	if (value.attribute && value.coefficient) parts.push(`${attrLabel(value.attribute)}×${formatAffixPercent(value.coefficient)}`);
	if (value.targetMaxHpRatio && value.targetMaxHpRatio > 0) parts.push(`目标气血${formatAffixPercent(value.targetMaxHpRatio)}`);
	if (value.targetMaxMpRatio && value.targetMaxMpRatio > 0) parts.push(`目标法力${formatAffixPercent(value.targetMaxMpRatio)}`);
	if (parts.length === 0) return formatAffixNumber(value.base ?? 0);
	return parts.join(" + ");
}
//#endregion
//#region src/shared/engine/battle-v5/effects/affixText/effectCore.ts
/**
* EffectConfig → 词缀效果核心文本（"动词 + 数值"）。
*
* 约定：这里只描述"做什么 + 多少"，**不**包含触发条件、**不**包含监听语境前缀。
* 条件与监听由 conditions.ts / listeners.ts 分别处理，再由 index.ts 统一拼接。
*
* 例：
*   reflect 34%            → "反弹 34% 伤害"
*   shield {base=38, ...}  → "获得护盾 38 + 神识×29%"
*   heal mp                → "回复法力 12 + 灵力×40%"
*/
function describeEffectCore(effect, context = {}) {
	const describeChildren = (effects) => effects.map((child) => describeEffectCore(child, context)).join("、");
	switch (effect.type) {
		case "damage": {
			const damageLabel = inferDamageTypeLabels({
				abilityTags: context.abilityTags,
				buffTags: context.buffTags,
				explicitDamageType: effect.params.damageType,
				valueAttribute: effect.params.value.attribute
			})[0] ?? "伤害";
			return `造成 ${formatScalableValue(effect.params.value)} 点${damageLabel}`;
		}
		case "heal": return `回复${getResourceLabel(effect.params.target ?? "hp")} ${formatScalableValue(effect.params.value)}`;
		case "shield": return `获得护盾 ${formatScalableValue(effect.params.value)}`;
		case "mana_burn": return `削减法力 ${formatScalableValue(effect.params.value)}`;
		case "reflect": return `反弹 ${formatAffixPercent(effect.params.ratio)} 伤害`;
		case "resource_drain": {
			const source = effect.params.sourceType === "hp" ? "伤害" : "法力消耗";
			const target = getResourceLabel(effect.params.targetType);
			return `将 ${formatAffixPercent(effect.params.ratio)} ${source}转化为${target}`;
		}
		case "percent_damage_modifier":
			if (effect.params.mode === "increase") return `提升造成的伤害 ${formatAffixPercent(effect.params.value)}`;
			return `降低受到的伤害 ${formatAffixPercent(effect.params.value)}`;
		case "death_prevent":
			if (effect.params.hpFloorPercent === void 0) return "免疫死亡保留 1 点气血";
			return `免疫死亡保留 ${formatAffixPercent(effect.params.hpFloorPercent)} 气血`;
		case "damage_immunity": return `免疫${labelTagList(effect.params.tags)}伤害`;
		case "buff_immunity": return `免疫状态：${labelTagList(effect.params.tags)}`;
		case "skill_immunity": return "有概率免疫整个主动法术";
		case "dispel": return effect.params.targetTag ? `驱散 ${effect.params.maxCount ?? 1} 个${labelGameplayTag(effect.params.targetTag)}` : `驱散 ${effect.params.maxCount ?? 1} 个状态`;
		case "magic_shield": return `优先使用法力吸收受到的伤害，吸收比例 ${formatAffixPercent(effect.params.absorbRatio ?? .98)}`;
		case "apply_buff": return describeApplyBuffText(effect.params.buffConfig, effect.params.chance, effect.params.target, (child, childContext) => describeEffectCore(child, {
			...context,
			...childContext
		}));
		case "cooldown_modify": return `${effect.params.cdModifyValue >= 0 ? "增加" : "减少"}冷却 ${formatAffixNumber(Math.abs(effect.params.cdModifyValue))} 回合`;
		case "tag_trigger":
			if (effect.params.damageRatio !== void 0) return `命中「${labelGameplayTag(effect.params.triggerTag)}」触发额外伤害（系数 ${formatAffixPercent(effect.params.damageRatio)}）`;
			return `命中「${labelGameplayTag(effect.params.triggerTag)}」触发额外效果`;
		case "consume_status_trigger": return `消耗${describeBuffMatch(effect.params.match)}后${effect.params.aggregateDamageByLayer ? "按原层数合并" : effect.params.scaleEffectsByLayer ? "按原层数重复" : ""}${describeChildren(effect.params.effects)}`;
		case "delayed_effect": return `${effect.params.delayTurns} 回合后触发「${effect.params.name}」：${describeChildren(effect.params.effects)}`;
		case "damage_memory":
			if (effect.params.mode === "record") return `记录${describeMemoryEvent(effect.params.event)}${describeMemoryCap(effect)}`;
			if (effect.params.mode === "clear") return "清除战斗记忆";
			return `将${describeMemorySource(effect.params.event)}的 ${formatAffixPercent(effect.params.ratio ?? 1)} 转为${describeMemoryRelease(effect.params.releaseAs)}`;
		case "buff_layer_modify": return `${describeLayerOperation(effect.params.operation, effect.params.layers)}${describeBuffMatch(effect.params.match)}${effect.params.effects?.length ? `并${effect.params.scaleEffectsByLayer ? "按原层数重复" : ""}${describeChildren(effect.params.effects)}` : ""}`;
		case "ability_transform": return `强化下一次神通：${describeTransform(effect.params)}`;
		case "hp_sacrifice_damage": return `消耗当前气血 ${formatAffixPercent(effect.params.hpRatio)} 追加伤害`;
		case "ability_lock": return `封禁神通 ${effect.params.rounds} 回合`;
		case "status_spread": return `扩散${describeBuffMatch(effect.params.match)}（1v1 无额外目标时不生效）`;
		case "buff_copy": return `${effect.params.maxTriggers ? `最多 ${effect.params.maxTriggers} 次，` : ""}${effect.params.replayRemoved ? "重施最近被驱散的" : "复制"}${effect.params.match ? describeBuffMatch(effect.params.match) : "状态"}给${effect.params.target === "target" ? "目标" : "自身/施加者"}${effect.params.durationDelta ? `，持续延长 ${formatAffixNumber(effect.params.durationDelta)} 回合` : ""}`;
		case "damage_defer": return `延迟结算 ${formatAffixPercent(effect.params.ratio)} 伤害`;
		case "next_hit_rule": return effect.params.forceCritical ? "下一次命中必定暴击" : "强化下一次命中";
		case "dynamic_scalar": return `根据${effect.params.resource === "hp" ? "气血" : "法力"}动态修正伤害`;
		case "turn_state_counter": return `累计 ${effect.params.threshold} 次${effect.params.event === "no_damage_dealt" ? "未造成伤害" : "造成伤害"}后${describeChildren(effect.params.effects)}`;
		case "effect_sequence": return describeChildren(effect.params.effects);
		case "buff_duration_modify": return `${effect.params.rounds >= 0 ? "延长" : "缩短"}状态 ${Math.abs(effect.params.rounds)} 回合`;
		case "combat_resource_modify": return effect.params.operation === "consume_all" ? "消耗全部战斗资源" : `${effect.params.operation === "add" ? "获得" : "调整"} ${Math.abs(effect.params.amount ?? 0)} 点战斗资源`;
		case "runtime_counter_modify": return effect.params.operation === "reset" ? "重置战斗计数" : `${effect.params.operation === "add" ? "增加" : "调整"}战斗计数${effect.params.effects?.length ? `并${describeChildren(effect.params.effects)}` : ""}`;
		case "skip_action": return `调息 ${effect.params.count ?? 1} 次行动`;
		case "queue_action": return `下一次行动发动「${effect.params.name}」${effect.params.interruptPolicy === "uninterruptible" ? "，除自身死亡外不可打断" : ""}${effect.params.hitPolicy === "guaranteed" ? "，必然命中" : ""}`;
		case "resource_scaled_damage": return `按战斗资源造成 ${formatAffixNumber(effect.params.baseCoefficient)} + 每点 ${formatAffixNumber(effect.params.coefficientPerPoint)} 倍单段伤害`;
		case "ability_mode": return effect.params.operation === "set" ? `进入「${effect.params.displayName ?? effect.params.mode ?? "战斗形态"}」` : effect.params.operation === "advance" ? "推进战斗形态" : "结束战斗形态";
		case "lifesteal": return `直接伤害吸血 ${formatAffixPercent(effect.params.ratio)}`;
		case "refund_paid_cost": return typeof effect.params.amount === "number" ? `返还本次实际支付的 ${formatAffixNumber(effect.params.amount)} 点法力` : `返还本次实际支付法力的 ${formatAffixPercent(effect.params.ratio)}`;
		case "mechanic_log": return `触发「${effect.params.displayName}」`;
		default: return effect.type;
	}
}
function describeMemorySource(event) {
	if (event === "shield_break") return "破盾量";
	return "记录值";
}
function describeMemoryEvent(event) {
	switch (event) {
		case "damage_dealt": return "造成伤害";
		case "heal": return "治疗量";
		case "shield": return "护盾量";
		case "shield_break": return "破盾量";
		case "shield_absorbed": return "护盾承伤量";
		case "critical_taken": return "受到暴击伤害";
		default: return "受到伤害";
	}
}
function describeMemoryCap(effect) {
	if (effect.params.maxStoredValue) return `，上限 ${formatScalableValue(effect.params.maxStoredValue)}`;
	if (effect.params.maxStored !== void 0) return `，上限 ${formatAffixNumber(effect.params.maxStored)}`;
	return "";
}
function describeMemoryRelease(releaseAs) {
	switch (releaseAs) {
		case "heal": return "治疗";
		case "shield": return "护盾";
		case "reflect": return "反射真实伤害";
		default: return "真实伤害";
	}
}
function describeLayerOperation(operation, layers) {
	switch (operation) {
		case "add": return `增加 ${formatAffixNumber(layers ?? 1)} 层`;
		case "subtract": return `减少 ${formatAffixNumber(layers ?? 1)} 层`;
		case "clear": return "清空";
		case "set": return `设为 ${formatAffixNumber(layers ?? 1)} 层`;
		default: return "调整";
	}
}
function describeTransform(params) {
	const parts = [
		params.trueDamage ? "转为真实伤害" : "",
		params.forceCritical ? "必定暴击" : "",
		params.addDispel ? "附带驱散" : "",
		params.mpCostToHp ? "法力消耗改为气血消耗" : "",
		params.freeManaCost ? "不消耗法力" : "",
		params.cooldownModify !== void 0 ? `冷却${params.cooldownModify >= 0 ? "增加" : "减少"} ${formatAffixNumber(Math.abs(params.cooldownModify))} 回合` : "",
		params.bonusDamageMemory ? `附加记录值 ${formatAffixPercent(params.bonusDamageMemory.ratio ?? 1)} 伤害` : ""
	].filter(Boolean);
	return parts.length > 0 ? parts.join("、") : "获得一次强化";
}
//#endregion
//#region src/shared/engine/battle-v5/systems/state/BattleStateRecorder.ts
/**
* BattleStateRecorder
*
* 职责：在每次行动前后对双方单位进行状态快照，并计算帧间 Delta。
*
* 采样时机（由单回合解析器与自动战斗外壳触发）：
*  1. battle_init  — 战斗开始后（基线快照）
*  2. action_pre   — 每个单位的 ActionPreEvent 发布并处理完毕后
*  3. action_post  — 该单位的动作执行、行动型 Buff 过期、CD 刷新完成后
*  4. round_post   — 回合结束周期结算与回合型 Buff 过期完成后
*  5. battle_end   — 战斗结束后（终态快照）
*
* 设计原则：
*  - 与日志系统完全解耦，不依赖 EventBus
*  - 只记录 Unit 的公开 API，不侵入内部状态
*  - Delta 仅包含实际变化的字段（控制体积）
*/
var BattleStateRecorder = class {
	_frames = [];
	_frameCounter = 0;
	/** 上一帧各单位的快照，用于计算 delta */
	_prevSnapshots = /* @__PURE__ */ new Map();
	/**
	* 记录一个状态帧
	* @param phase         帧所在阶段
	* @param turn          当前回合数
	* @param units         所有参战单位
	* @param actorId       当前行动者 ID（action_pre / action_post 时传入）
	* @param sourceSequenceId  关联 V3 战斗序列 ID（可选，供前端联动使用）
	*/
	record(phase, turn, units, actorId, sourceSequenceId) {
		const snapshots = {};
		const deltas = {};
		for (const unit of units) {
			const snapshot = this._buildSnapshot(unit);
			snapshots[unit.id] = snapshot;
			const prev = this._prevSnapshots.get(unit.id);
			if (prev) {
				const delta = this._computeDelta(prev, snapshot);
				if (this._hasDelta(delta)) deltas[unit.id] = delta;
			}
			this._prevSnapshots.set(unit.id, snapshot);
		}
		const frame = {
			frameId: ++this._frameCounter,
			turn,
			phase,
			actorId,
			sourceSequenceId,
			units: snapshots,
			deltas: Object.keys(deltas).length > 0 ? deltas : void 0
		};
		this._frames.push(frame);
	}
	/** 获取所有状态帧的副本 */
	getFrames() {
		return [...this._frames];
	}
	/** 获取结构化时间线（含单位 ID/名称映射） */
	getTimeline(units) {
		const unitIds = units.map((u) => u.id);
		const unitNames = {};
		for (const unit of units) unitNames[unit.id] = unit.name;
		return {
			frames: [...this._frames],
			unitIds,
			unitNames
		};
	}
	_buildSnapshot(unit) {
		const { currentHp, maxHp, currentMp, maxMp, currentShield } = unit.getSnapshot();
		const hpPercent = maxHp > 0 ? Math.round(currentHp / maxHp * 1e4) / 100 : 0;
		const mpPercent = maxMp > 0 ? Math.round(currentMp / maxMp * 1e4) / 100 : 0;
		return {
			id: unit.id,
			name: unit.name,
			alive: unit.isAlive(),
			hp: {
				current: Math.round(currentHp),
				max: maxHp,
				percent: hpPercent
			},
			mp: {
				current: Math.round(currentMp),
				max: maxMp,
				percent: mpPercent
			},
			shield: Math.round(currentShield),
			attrs: this._buildAttrs(unit),
			baseAttrs: this._buildAttrs(unit, true),
			buffs: this._buildBuffs(unit),
			combatResources: unit.combatResources.snapshots(),
			cooldowns: this._buildCooldowns(unit),
			actionStates: getActionStateViews(unit),
			canAct: unit.isAlive() && (peekQueuedAction(unit)?.interruptPolicy === "uninterruptible" || !unit.tags.hasAnyTag([GameplayTags.STATUS.CONTROL.NO_ACTION, GameplayTags.STATUS.CONTROL.STUNNED]))
		};
	}
	_buildAttrs(unit, useBase = false) {
		const a = unit.attributes;
		const getVal = (t) => useBase ? a.getBaseValue(t) : a.getValue(t);
		return {
			attributeModelVersion: 2,
			vitality: getVal(AttributeType.VITALITY),
			strength: getVal(AttributeType.STRENGTH),
			spirit: getVal(AttributeType.SPIRIT),
			endurance: getVal(AttributeType.ENDURANCE),
			speed: getVal(AttributeType.SPEED),
			willpower: getVal(AttributeType.WILLPOWER),
			atk: getVal(AttributeType.ATK),
			def: getVal(AttributeType.DEF),
			magicAtk: getVal(AttributeType.MAGIC_ATK),
			magicDef: getVal(AttributeType.MAGIC_DEF),
			actionSpeed: getVal(AttributeType.ACTION_SPEED),
			critRate: getVal(AttributeType.CRIT_RATE),
			critDamageMult: getVal(AttributeType.CRIT_DAMAGE_MULT),
			evasionRate: getVal(AttributeType.EVASION_RATE),
			controlHit: getVal(AttributeType.CONTROL_HIT),
			controlResistance: getVal(AttributeType.CONTROL_RESISTANCE),
			armorPenetration: getVal(AttributeType.ARMOR_PENETRATION),
			magicPenetration: getVal(AttributeType.MAGIC_PENETRATION),
			critResist: getVal(AttributeType.CRIT_RESIST),
			critDamageReduction: getVal(AttributeType.CRIT_DAMAGE_REDUCTION),
			accuracy: getVal(AttributeType.ACCURACY),
			healAmplify: getVal(AttributeType.HEAL_AMPLIFY),
			maxHp: getVal(AttributeType.MAX_HP),
			maxMp: getVal(AttributeType.MAX_MP)
		};
	}
	_buildBuffs(unit) {
		return unit.buffs.getAllBuffs().map((buff) => ({
			id: buff.id,
			name: buff.name,
			description: this._describeBuff(buff),
			type: buff.type,
			logVisibility: buff.logVisibility,
			statusVisibility: buff.statusVisibility,
			sourceName: buff.getSource()?.name,
			layers: buff.getLayer(),
			remaining: buff.isPermanent() ? -1 : buff.getDuration(),
			durationUnit: buff.durationUnit,
			isPermanent: buff.isPermanent()
		}));
	}
	_describeBuff(buff) {
		if (buff instanceof DataDrivenBuff) return describeBuffRuntimeSummaryText(buff.getConfig(), describeEffectCore);
		return buff.description;
	}
	_buildCooldowns(unit) {
		const abilities = unit.abilities.getAllAbilities();
		const defaultAttack = unit.abilities.getDefaultAttackForSnapshot();
		if (defaultAttack && !abilities.includes(defaultAttack)) abilities.unshift(defaultAttack);
		return abilities.filter((a) => a instanceof ActiveSkill).map((skill) => ({
			skillId: skill.id,
			skillName: skill.name,
			isDefaultAttack: skill === defaultAttack,
			runtimePlanId: skill.runtimePlanId,
			description: skill.description,
			current: skill.currentCooldown,
			max: skill.maxCooldown,
			mpCost: skill.manaCost,
			costs: skill.costConfigs.map((cost, index) => ({
				...cost,
				resolvedAmount: skill.resourceCosts[index]?.amount ?? 0
			}))
		}));
	}
	_computeDelta(prev, curr) {
		const delta = {
			id: curr.id,
			name: curr.name
		};
		if (prev.hp.current !== curr.hp.current) delta.hp = {
			from: prev.hp.current,
			to: curr.hp.current,
			change: curr.hp.current - prev.hp.current
		};
		if (prev.mp.current !== curr.mp.current) delta.mp = {
			from: prev.mp.current,
			to: curr.mp.current,
			change: curr.mp.current - prev.mp.current
		};
		if (prev.shield !== curr.shield) delta.shield = {
			from: prev.shield,
			to: curr.shield,
			change: curr.shield - prev.shield
		};
		const changedAttrs = {};
		for (const key of Object.keys(prev.attrs)) {
			if (key === "attributeModelVersion") continue;
			if (prev.attrs[key] !== curr.attrs[key]) changedAttrs[key] = {
				from: prev.attrs[key],
				to: curr.attrs[key]
			};
		}
		if (Object.keys(changedAttrs).length > 0) delta.attrs = changedAttrs;
		const changedBaseAttrs = {};
		for (const key of Object.keys(prev.baseAttrs)) {
			if (key === "attributeModelVersion") continue;
			if (prev.baseAttrs[key] !== curr.baseAttrs[key]) changedBaseAttrs[key] = {
				from: prev.baseAttrs[key],
				to: curr.baseAttrs[key]
			};
		}
		if (Object.keys(changedBaseAttrs).length > 0) delta.baseAttrs = changedBaseAttrs;
		const prevBuffMap = new Map(prev.buffs.map((b) => [b.id, b]));
		const currBuffMap = new Map(curr.buffs.map((b) => [b.id, b]));
		const buffsAdded = curr.buffs.filter((b) => !prevBuffMap.has(b.id));
		const buffsRemoved = prev.buffs.filter((b) => !currBuffMap.has(b.id)).map((b) => ({
			id: b.id,
			name: b.name
		}));
		const buffsUpdated = curr.buffs.filter((b) => {
			const p = prevBuffMap.get(b.id);
			return p && (p.layers !== b.layers || p.remaining !== b.remaining);
		}).map((b) => {
			const p = prevBuffMap.get(b.id);
			return {
				id: b.id,
				name: b.name,
				layerChange: p.layers !== b.layers ? b.layers - p.layers : void 0,
				remainingChange: p.remaining !== b.remaining ? b.remaining - p.remaining : void 0
			};
		});
		if (buffsAdded.length > 0) delta.buffsAdded = buffsAdded;
		if (buffsRemoved.length > 0) delta.buffsRemoved = buffsRemoved;
		if (buffsUpdated.length > 0) delta.buffsUpdated = buffsUpdated;
		const previousResourceMap = new Map(prev.combatResources.map((resource) => [resource.id, resource]));
		const combatResourcesChanged = curr.combatResources.filter((resource) => previousResourceMap.get(resource.id)?.current !== resource.current).map((resource) => ({
			id: resource.id,
			name: resource.name,
			from: previousResourceMap.get(resource.id)?.current ?? 0,
			to: resource.current
		}));
		if (combatResourcesChanged.length > 0) delta.combatResourcesChanged = combatResourcesChanged;
		const prevCDMap = new Map(prev.cooldowns.map((c) => [c.skillId, c]));
		const cooldownsChanged = curr.cooldowns.filter((c) => {
			const p = prevCDMap.get(c.skillId);
			return p !== void 0 && p.current !== c.current;
		}).map((c) => ({
			skillId: c.skillId,
			skillName: c.skillName,
			from: prevCDMap.get(c.skillId).current,
			to: c.current
		}));
		if (cooldownsChanged.length > 0) delta.cooldownsChanged = cooldownsChanged;
		if (JSON.stringify(prev.actionStates ?? []) !== JSON.stringify(curr.actionStates ?? [])) delta.actionStatesChanged = {
			from: prev.actionStates ?? [],
			to: curr.actionStates ?? []
		};
		if (prev.canAct !== curr.canAct) delta.canActChanged = {
			from: prev.canAct,
			to: curr.canAct
		};
		if (prev.alive !== curr.alive) delta.aliveChanged = {
			from: prev.alive,
			to: curr.alive
		};
		return delta;
	}
	/** 判断 delta 是否包含任何实际变化 */
	_hasDelta(delta) {
		return !!(delta.hp || delta.mp || delta.shield || delta.attrs || delta.buffsAdded?.length || delta.buffsRemoved?.length || delta.buffsUpdated?.length || delta.combatResourcesChanged?.length || delta.cooldownsChanged?.length || delta.actionStatesChanged || delta.canActChanged || delta.aliveChanged);
	}
};
//#endregion
//#region src/shared/engine/battle-v5/systems/TargetSelectionSystem.ts
/**
* TargetSelectionSystem - 目标选择系统
*
* EDA 架构设计：
* - 根据 TargetPolicy 选择目标
* - 支持队伍筛选、过滤器、范围选择
* - 未来可订阅 SkillSelectedEvent 进行自动目标选择
*/
var TargetSelectionSystem = class {
	_handlers = /* @__PURE__ */ new Map();
	constructor() {
		this._subscribeToEvents();
	}
	_subscribeToEvents() {}
	/**
	* 选择目标
	* @param caster 施法者
	* @param policy 目标策略
	* @param allUnits 所有战斗单位
	* @returns 选中的目标列表
	*/
	selectTargets(caster, policy, allUnits) {
		const candidates = this.getTargetCandidates(caster, policy, allUnits);
		return this._selectByScope(candidates, policy.scope, policy.maxTargets, () => caster.runtime.random.next());
	}
	getTargetCandidates(caster, policy, allUnits) {
		return this._applyFilters(this._filterByTeam(caster, policy.team, allUnits).filter((unit) => unit.isAlive()), policy.filters);
	}
	_filterByTeam(caster, team, allUnits) {
		switch (team) {
			case "self": return [caster];
			case "enemy": return allUnits.filter((unit) => unit.teamId !== caster.teamId);
			case "ally": return allUnits.filter((unit) => unit.teamId === caster.teamId && unit !== caster);
			case "any": return allUnits;
			default: return allUnits;
		}
	}
	_applyFilters(units, filters) {
		if (filters.length === 0) return units;
		let result = [...units];
		for (const filter of filters) result = this._applyFilter(result, filter);
		return result;
	}
	_applyFilter(units, filter) {
		if (units.length === 0) return units;
		switch (filter) {
			case "lowest_hp": return [units.reduce((min, u) => u.getCurrentHp() < min.getCurrentHp() ? u : min)];
			case "highest_hp": return [units.reduce((max, u) => u.getCurrentHp() > max.getCurrentHp() ? u : max)];
			case "lowest_mp": return [units.reduce((min, u) => u.getCurrentMp() < min.getCurrentMp() ? u : min)];
			case "fastest": return [units.reduce((max, u) => u.attributes.getValue(AttributeType.ACTION_SPEED) > max.attributes.getValue(AttributeType.ACTION_SPEED) ? u : max)];
			case "slowest": return [units.reduce((min, u) => u.attributes.getValue(AttributeType.ACTION_SPEED) < min.attributes.getValue(AttributeType.ACTION_SPEED) ? u : min)];
			default: return units;
		}
	}
	_selectByScope(units, scope, maxTargets, random) {
		switch (scope) {
			case "single": return units.slice(0, 1);
			case "random": {
				const shuffled = [...units];
				for (let index = shuffled.length - 1; index > 0; index--) {
					const swapIndex = Math.floor(random() * (index + 1));
					[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
				}
				return shuffled.slice(0, 1);
			}
			case "aoe": return units.slice(0, maxTargets);
			default: return units.slice(0, 1);
		}
	}
	/**
	* 销毁系统
	*/
	destroy() {
		this._handlers.clear();
	}
};
//#endregion
//#region src/shared/engine/battle-v5/systems/TeamVictorySystem.ts
var TeamVictorySystem = class {
	static MAX_ROUNDS = 30;
	static check(roster, random, currentRound) {
		const teams = [...roster.teams.values()];
		if (teams.length !== 2) throw new Error("Battle victory resolution requires exactly two teams");
		const alive = teams.filter((team) => !roster.isTeamEliminated(team.id));
		if (alive.length === 1) {
			const loser = teams.find((team) => team.id !== alive[0].id);
			if (!loser) throw new Error("Battle loser team is missing");
			return {
				battleEnded: true,
				winnerTeamId: alive[0].id,
				loserTeamId: loser.id
			};
		}
		if (alive.length > 1 && (currentRound === void 0 || currentRound < this.MAX_ROUNDS)) return { battleEnded: false };
		const ranked = [...teams.map((team) => {
			const members = team.unitIds.map((unitId) => roster.getUnit(unitId));
			const currentHp = members.reduce((sum, member) => sum + member.getCurrentHp(), 0);
			const maxHp = members.reduce((sum, member) => sum + member.getMaxHp(), 0);
			const currentMp = members.reduce((sum, member) => sum + member.getCurrentMp(), 0);
			const maxMp = members.reduce((sum, member) => sum + member.getMaxMp(), 0);
			return {
				teamId: team.id,
				livingUnits: members.filter((member) => member.isAlive()).length,
				hpRatio: maxHp > 0 ? currentHp / maxHp : 0,
				shield: members.reduce((sum, member) => sum + member.getCurrentShield(), 0),
				mpRatio: maxMp > 0 ? currentMp / maxMp : 0
			};
		})].sort(compareTeamScores);
		const leaders = ranked.filter((candidate) => compareTeamScores(candidate, ranked[0]) === 0);
		const first = leaders.length === 1 ? leaders[0] : leaders[Math.floor(random.next() * leaders.length)];
		const second = ranked.find((candidate) => candidate.teamId !== first.teamId);
		if (!second) throw new Error("Battle requires at least two teams");
		return {
			battleEnded: true,
			winnerTeamId: first.teamId,
			loserTeamId: second.teamId,
			...currentRound !== void 0 && currentRound >= this.MAX_ROUNDS ? { reachedMaxRounds: true } : {}
		};
	}
};
function compareTeamScores(left, right) {
	return compareNumber(right.hpRatio, left.hpRatio) || right.livingUnits - left.livingUnits || right.shield - left.shield || compareNumber(right.mpRatio, left.mpRatio);
}
function compareNumber(left, right) {
	return Math.abs(left - right) < Number.EPSILON ? 0 : left - right;
}
//#endregion
//#region src/shared/engine/battle-v5/v3/BattleRecordV3.ts
function toBattleStateTimelineV3(timeline) {
	return {
		unitIds: [...timeline.unitIds],
		unitNames: { ...timeline.unitNames },
		frames: timeline.frames.map((frame) => {
			if (!frame.sourceSequenceId) throw new Error(`Battle state frame ${frame.frameId} has no sourceSequenceId`);
			return {
				...frame,
				sourceSequenceId: frame.sourceSequenceId
			};
		})
	};
}
//#endregion
//#region src/shared/engine/battle-v5/round/BasicAttackResolver.ts
/** Resolves the configured attack, falling back to the engine basic attack. */
function resolveLegalBasicAttack(actor, allUnits, preferredTargetId) {
	if (actor.tags.hasTag(GameplayTags.STATUS.CONTROL.NO_BASIC)) return null;
	const targetSystem = new TargetSelectionSystem();
	const configuredSelection = select(actor.abilities.getDefaultAttack(), actor, allUnits, preferredTargetId, targetSystem);
	if (configuredSelection) return configuredSelection;
	return select(actor.abilities.getFallbackBasicAttack(), actor, allUnits, preferredTargetId, targetSystem);
}
function select(ability, actor, allUnits, preferredTargetId, targetSystem) {
	if (!(ability instanceof ActiveSkill)) return null;
	const legalTargets = targetSystem.getTargetCandidates(actor, ability.targetPolicy, allUnits).filter((target) => ability.canTrigger({
		caster: actor,
		target
	}));
	const target = legalTargets.find((candidate) => candidate.id === preferredTargetId) ?? legalTargets[0];
	return target ? {
		ability,
		target,
		legalTargets
	} : null;
}
//#endregion
//#region src/shared/engine/battle-v5/v3/CombatFactProjectorV3.ts
var CombatFactProjectorV3 = class {
	project(event) {
		if (!event.trace) throw new Error("Committed combat result has no trace");
		if (!event.origin) throw new Error("Committed combat result has no origin");
		return Object.freeze({
			...event.result,
			id: event.trace.eventId,
			trace: event.trace,
			origin: event.origin,
			target: Object.freeze({
				id: event.target.id,
				name: event.target.name
			}),
			...event.narrative ? { narrative: event.narrative } : {}
		});
	}
};
//#endregion
//#region src/shared/engine/battle-v5/v3/CombatFactSinkV3.ts
/**
* Authoritative collector for immutable combat facts produced by one resolver.
* A fact can only be accepted while its sequence is registered in this sink.
*/
var CombatFactSinkV3 = class CombatFactSinkV3 {
	eventBus;
	static MAX_FRAMES = 256;
	static MAX_FACTS = 4096;
	sequences = /* @__PURE__ */ new Map();
	sequenceOrder = [];
	projector = new CombatFactProjectorV3();
	attached = true;
	factCount = 0;
	constructor(eventBus) {
		this.eventBus = eventBus;
		eventBus.attachCombatFactSink(this);
	}
	record(event) {
		if (this.factCount >= CombatFactSinkV3.MAX_FACTS) throw new BattleResolutionError("BATTLE_RESOLUTION_LIMIT_EXCEEDED", `Battle fact count exceeded ${CombatFactSinkV3.MAX_FACTS}`);
		const sequenceId = event.trace?.sequenceId;
		const sequence = sequenceId ? this.sequences.get(sequenceId) : void 0;
		if (!sequence) throw new Error(`Committed combat result references unknown sequence: ${sequenceId}`);
		sequence.facts.push(this.projector.project(event));
		this.factCount += 1;
	}
	runInFrame(scope, callback) {
		return this.eventBus.runInSequence(scope, (resolved) => {
			if (this.sequenceOrder.length >= CombatFactSinkV3.MAX_FRAMES) throw new BattleResolutionError("BATTLE_RESOLUTION_LIMIT_EXCEEDED", `Battle frame count exceeded ${CombatFactSinkV3.MAX_FRAMES}`);
			if (this.sequences.has(resolved.id)) throw new Error(`Duplicate CombatSequenceV3 id: ${resolved.id}`);
			this.sequences.set(resolved.id, {
				...resolved,
				facts: []
			});
			this.sequenceOrder.push(resolved.id);
			try {
				return callback(resolved);
			} finally {
				const sequence = this.sequences.get(resolved.id);
				sequence.actor = resolved.actor;
				sequence.ability = resolved.ability;
			}
		});
	}
	getSequences() {
		return this.sequenceOrder.map((id) => {
			const sequence = this.sequences.get(id);
			return {
				...sequence,
				facts: [...sequence.facts].sort((left, right) => left.trace.ordinal - right.trace.ordinal)
			};
		});
	}
	destroy() {
		if (!this.attached) return;
		this.attached = false;
		this.eventBus.detachCombatFactSink(this);
	}
};
//#endregion
//#region src/shared/engine/battle-v5/round/BattleResolutionContext.ts
/** Owns the fact and frame lifetime of exactly one deterministic round. */
var BattleResolutionContext = class {
	runtime;
	factSink;
	constructor(runtime) {
		this.runtime = runtime;
		this.factSink = new CombatFactSinkV3(runtime.events);
	}
	runFrame(scope, callback) {
		return this.factSink.runInFrame(scope, callback);
	}
	getSequences() {
		return this.factSink.getSequences();
	}
	destroy() {
		this.factSink.destroy();
	}
};
//#endregion
//#region src/shared/engine/battle-v5/round/BattleLifecycleResolver.ts
/** Emits the terminal lifecycle event inside the active round fact scope. */
function recordBattleEnd(input) {
	if (!input.outcome.battleEnded) throw new Error("Cannot finalize a battle that has not ended");
	const actor = resolveWinnerActor(input.roster, input.outcome);
	input.context.runFrame({
		phase: "battle_end",
		turn: input.round,
		actor: {
			id: actor.id,
			name: actor.name
		}
	}, (sequence) => {
		input.runtime.events.publish({
			type: "BattleEndEvent",
			timestamp: input.runtime.clock.now(),
			winner: actor.id,
			winnerTeamId: input.outcome.winnerTeamId,
			turns: input.round
		});
		input.recorder.record("battle_end", input.round, input.roster.getAllUnits(), actor.id, sequence.id);
	});
}
function resolveWinnerActor(roster, outcome) {
	const team = roster.getTeam(outcome.winnerTeamId);
	return roster.getLivingUnits(outcome.winnerTeamId)[0] ?? roster.getUnit(team.unitIds[0]);
}
//#endregion
//#region src/shared/engine/battle-v5/round/QueuedActionResolver.ts
/**
* Resolves a queued action against the immutable planning checkpoint.
* Queued actions are mandatory and already paid for, so only target legality
* is evaluated here; ordinary cooldown, resource and cast conditions do not
* get a second chance to cancel the release.
*/
function resolveLegalQueuedAction(actor, allUnits, preferredTargetId) {
	const queued = peekQueuedAction(actor);
	if (!queued) return null;
	const ability = AbilityFactory.create(queued.ability);
	if (!(ability instanceof ActiveSkill)) return null;
	const legalTargets = new TargetSelectionSystem().getTargetCandidates(actor, ability.targetPolicy, allUnits);
	const target = legalTargets.find((candidate) => candidate.id === preferredTargetId) ?? legalTargets[0];
	return target ? {
		ability,
		target,
		legalTargets
	} : null;
}
//#endregion
//#region src/shared/engine/battle-v5/round/BattleRoundResolver.ts
function resolveBattleRound(save, commandSet) {
	const restored = restoreBattleSave(save);
	try {
		return resolveRestoredBattleRound(save, commandSet, restored);
	} finally {
		restored.runtime.dispose();
	}
}
function resolveRestoredBattleRound(save, commandSet, restored) {
	const { runtime, roster } = restored;
	const livingAtPlanning = roster.getLivingUnits();
	validateRoundCommandSet(save, livingAtPlanning, commandSet);
	validateAllIntents(roster.getAllUnits(), livingAtPlanning, commandSet);
	const eventBus = runtime.events;
	const resolutionContext = new BattleResolutionContext(runtime);
	const actionSystem = new ActionExecutionSystem(eventBus);
	const damageSystem = new DamageSystem(eventBus, runtime.random);
	try {
		const stateRecorder = new BattleStateRecorder();
		const targetSystem = new TargetSelectionSystem();
		const allUnits = roster.getAllUnits();
		const round = commandSet.round;
		const roundAnchor = allUnits[0];
		if (!roundAnchor) throw new Error("Cannot resolve a round without units");
		const roundResolution = createHitResolution({
			actionId: `round:${round}`,
			castId: `round:${round}`,
			caster: roundAnchor,
			target: roundAnchor
		});
		for (const unit of allUnits) setRuntimeRound(unit, round);
		let order = [];
		resolutionContext.runFrame({
			phase: "round_start",
			turn: round
		}, () => {
			eventBus.publish({
				type: "RoundStartEvent",
				resolution: roundResolution,
				timestamp: runtime.clock.now(),
				turn: round
			});
			eventBus.publish({
				type: "RoundPreEvent",
				resolution: roundResolution,
				timestamp: runtime.clock.now(),
				turn: round
			});
			order = InitiativeSystem.order(roster.getLivingUnits(), runtime.random);
			eventBus.publish({
				type: "TurnOrderEvent",
				timestamp: runtime.clock.now(),
				turn: round,
				units: order
			});
		});
		for (const actor of order) {
			if (!actor.isAlive()) {
				clearPendingActionStates(actor);
				continue;
			}
			beginRuntimeAction(actor);
			const actionResolution = createHitResolution({
				actionId: `round:${round}:action:${actor.id}`,
				castId: `round:${round}:action:${actor.id}`,
				caster: actor,
				target: actor
			});
			resolutionContext.runFrame({
				phase: "action_pre",
				turn: round,
				actor: {
					id: actor.id,
					name: actor.name
				}
			}, (sequence) => {
				eventBus.publish({
					type: "ActionPreEvent",
					resolution: actionResolution,
					timestamp: runtime.clock.now(),
					caster: actor
				});
				stateRecorder.record("action_pre", round, allUnits, actor.id, sequence.id);
			});
			if (!actor.isAlive()) {
				clearPendingActionStates(actor);
				continue;
			}
			let controlledSkip = false;
			resolutionContext.runFrame({
				phase: "action",
				turn: round,
				actor: {
					id: actor.id,
					name: actor.name
				}
			}, () => {
				if (!actor.isAlive()) return;
				actor.combatResources.beginAction();
				const hasUninterruptibleQueue = peekQueuedAction(actor)?.interruptPolicy === "uninterruptible";
				const controlTag = getSkipControlTag(actor);
				if (!hasUninterruptibleQueue) {
					const skipState = consumeSkippedAction(actor);
					if (skipState) emitSkippedAction(actor, skipState);
					if (controlTag) {
						const cancelledQueue = consumeQueuedAction(actor);
						if (cancelledQueue) cancelQueuedAction(actor, cancelledQueue, controlTag);
						emitControlledSkip(actor, controlTag);
						controlledSkip = true;
						return;
					}
					if (skipState) return;
				}
				executePlannedAction(actor, commandSet.intents[actor.id], allUnits, targetSystem);
			});
			resolutionContext.runFrame({
				phase: "action_after",
				turn: round,
				actor: {
					id: actor.id,
					name: actor.name
				}
			}, (sequence) => {
				if (actor.isAlive()) {
					eventBus.publish({
						type: "ActionPostEvent",
						resolution: actionResolution,
						timestamp: runtime.clock.now(),
						caster: actor
					});
					actor.combatResources.finishAction(controlledSkip, actor.getCurrentShield() > 0);
					processBuffDurations(actor, "owner_action", actionResolution);
					actor.abilities.tickAbilitiesCooldown();
				}
				stateRecorder.record("action_post", round, allUnits, actor.id, sequence.id);
			});
		}
		let outcome;
		resolutionContext.runFrame({
			phase: "round_post",
			turn: round
		}, (sequence) => {
			eventBus.publish({
				type: "RoundPostEvent",
				resolution: roundResolution,
				timestamp: runtime.clock.now(),
				turn: round
			});
			for (const unit of allUnits) processBuffDurations(unit, "round", roundResolution);
			stateRecorder.record("round_post", round, allUnits, void 0, sequence.id);
			outcome = TeamVictorySystem.check(roster, runtime.random, round);
			eventBus.publish({
				type: "VictoryCheckEvent",
				timestamp: runtime.clock.now(),
				turn: round,
				battleEnded: outcome.battleEnded,
				winner: outcome.battleEnded ? outcome.winnerTeamId : null
			});
		});
		if (outcome.battleEnded) recordBattleEnd({
			context: resolutionContext,
			recorder: stateRecorder,
			roster,
			runtime,
			outcome,
			round
		});
		const sequences = resolutionContext.getSequences();
		const stateTimeline = toBattleStateTimelineV3(stateRecorder.getTimeline(allUnits));
		const checkpoint = captureBattleCheckpoint({
			blueprint: save.blueprint,
			roster,
			runtime,
			round,
			checkpointRevision: commandSet.checkpointRevision + 1
		});
		const nextSave = {
			version: "battle_save_v1",
			blueprint: save.blueprint,
			checkpoint,
			...save.lifecycle ? { lifecycle: {
				...save.lifecycle,
				ended: outcome.battleEnded
			} } : {}
		};
		return {
			version: "battle_round_resolution_v1",
			commandSetId: commandSet.commandSetId,
			round,
			outcome,
			sequences,
			stateTimeline,
			checkpoint,
			save: nextSave
		};
	} finally {
		actionSystem.destroy();
		damageSystem.destroy();
		resolutionContext.destroy();
	}
}
function executePlannedAction(actor, intent, allUnits, targetSystem) {
	if (intent.kind === "skip") return;
	const queued = consumeQueuedAction(actor);
	if (queued) {
		if (queued.interruptPolicy !== "uninterruptible" && actor.tags.hasTag(GameplayTags.STATUS.CONTROL.NO_SKILL)) {
			cancelQueuedAction(actor, queued, GameplayTags.STATUS.CONTROL.NO_SKILL);
			executeBasicAttack(actor, intent.targetUnitId, allUnits);
			return;
		}
		const ability = AbilityFactory.create(queued.ability);
		if (!(ability instanceof ActiveSkill)) throw new Error(`Queued action ${queued.ability.slug} is not an active skill`);
		const targets = resolveTargets(actor, ability.targetPolicy, intent.targetUnitId, allUnits, targetSystem, true);
		const primary = targets[0];
		if (!primary) return;
		castAbility(actor, ability, primary, targets, {
			interruptPolicy: queued.interruptPolicy,
			hitPolicy: queued.hitPolicy,
			queuedActionState: {
				name: "蓄势",
				sourceAbility: queued.sourceAbility
			}
		});
		return;
	}
	if (intent.kind === "basic_attack") {
		executeBasicAttack(actor, intent.targetUnitId, allUnits);
		return;
	}
	const ability = actor.abilities.getAbility(intent.abilityId);
	if (!(ability instanceof ActiveSkill)) throw new Error(`Unit ${actor.id} cannot use ability ${intent.abilityId}`);
	if (actor.tags.hasTag(GameplayTags.STATUS.CONTROL.NO_SKILL)) return;
	const targets = resolveTargets(actor, ability.targetPolicy, intent.targetUnitId, allUnits, targetSystem, true);
	const primary = targets[0];
	if (!primary || !ability.canTrigger({
		caster: actor,
		target: primary
	})) return;
	castAbility(actor, ability, primary, targets);
}
function executeBasicAttack(actor, targetUnitId, allUnits) {
	if (actor.tags.hasTag(GameplayTags.STATUS.CONTROL.NO_BASIC)) return;
	const resolved = resolveLegalBasicAttack(actor, allUnits, targetUnitId);
	if (!resolved) return;
	castAbility(actor, resolved.ability, resolved.target, resolved.legalTargets);
}
function emitSkippedAction(actor, skipped) {
	const context = actionFlowContext(actor);
	context.commit(actor, {
		type: "action_state",
		stateType: "rest",
		phase: "skipped",
		name: skipped.name,
		remainingActions: 0
	});
	context.emit({
		type: "ActionStateEvent",
		timestamp: actor.runtime.clock.now(),
		unit: actor,
		stateType: "rest",
		phase: "skipped",
		name: skipped.name,
		remainingActions: 0,
		sourceAbility: skipped.sourceAbility,
		reason: skipped.reason
	});
}
function emitControlledSkip(actor, controlTag) {
	const context = actionFlowContext(actor);
	context.commit(actor, {
		type: "mechanic",
		code: CombatMechanicCodeV3.CONTROL_SKIP,
		payload: {
			kind: "control_skip",
			controlName: getControlName(actor, controlTag)
		}
	});
	context.emit({
		type: "ControlledSkipEvent",
		timestamp: actor.runtime.clock.now(),
		unit: actor,
		controlTag
	});
}
function actionFlowContext(actor) {
	return EffectExecutionContextV3.system({
		owner: actor,
		caster: actor,
		target: actor,
		source: CombatSystemSourceV3.ACTION_FLOW,
		trace: actor.runtime.events.reserveTrace()
	});
}
function getControlName(actor, controlTag) {
	return actor.buffs.getAllBuffs().find((buff) => buff.tags.hasTag(controlTag))?.name ?? "控制效果";
}
function castAbility(actor, ability, primary, targets, options = {}) {
	ability.prepareCast({
		caster: actor,
		target: primary
	});
	actor.runtime.events.publish({
		type: "SkillPreCastEvent",
		timestamp: actor.runtime.clock.now(),
		caster: actor,
		target: primary,
		targets,
		ability,
		isInterrupted: false,
		isImmune: false,
		interruptPolicy: options.interruptPolicy,
		hitPolicy: options.hitPolicy ?? ability.hitPolicy,
		queuedActionState: options.queuedActionState
	});
}
function cancelQueuedAction(actor, queued, reason) {
	const context = EffectExecutionContextV3.system({
		owner: actor,
		caster: actor,
		target: actor,
		source: CombatSystemSourceV3.ACTION_FLOW,
		trace: actor.runtime.events.reserveTrace()
	});
	executeEffectConfigs(queued.cancelEffects, context);
	context.commit(actor, {
		type: "action_state",
		stateType: "queued_action",
		phase: "cancelled",
		name: "蓄势",
		remainingActions: 0,
		ability: {
			id: queued.ability.slug,
			name: queued.ability.name
		}
	});
	context.emit({
		type: "ActionStateEvent",
		timestamp: actor.runtime.clock.now(),
		unit: actor,
		stateType: "queued_action",
		phase: "cancelled",
		name: "蓄势",
		remainingActions: 0,
		sourceAbility: queued.sourceAbility,
		ability: {
			id: queued.ability.slug,
			name: queued.ability.name
		},
		reason
	});
}
function resolveTargets(actor, policy, targetUnitId, allUnits, targetSystem, retargetMissing = false) {
	const candidates = targetSystem.getTargetCandidates(actor, policy, allUnits);
	if (policy.scope === "single") {
		if (targetUnitId) {
			const target = candidates.find((candidate) => candidate.id === targetUnitId);
			if (!target) {
				if (retargetMissing) return candidates.slice(0, 1);
				throw new Error(`Illegal target ${targetUnitId} for unit ${actor.id}`);
			}
			return [target];
		}
		if (policy.team !== "self") throw new Error(`Ability target is required for unit ${actor.id}`);
	}
	return targetSystem.selectTargets(actor, policy, allUnits);
}
function validateAllIntents(allUnits, livingUnits, commandSet) {
	const targetSystem = new TargetSelectionSystem();
	for (const actor of livingUnits) {
		const intent = commandSet.intents[actor.id];
		validateUnitIntent(actor, allUnits, intent, targetSystem);
	}
}
function validateUnitIntent(actor, allUnits, intent, targetSystem) {
	if (intent.kind === "skip") return;
	if (peekQueuedAction(actor)) {
		const queuedAction = resolveLegalQueuedAction(actor, allUnits, intent.targetUnitId);
		if (!queuedAction || intent.kind !== "basic_attack") throw new Error(`Unit ${actor.id} must select a legal target for its queued action`);
		if (queuedAction.target.id !== intent.targetUnitId) throw new Error(`Queued action target is not legal for unit ${actor.id}`);
		return;
	}
	if (intent.kind === "basic_attack") {
		const resolved = resolveLegalBasicAttack(actor, allUnits, intent.targetUnitId);
		if (!resolved || resolved.target.id !== intent.targetUnitId) throw new Error(`Basic attack is not legal for unit ${actor.id}`);
		return;
	}
	const ability = actor.abilities.getAbility(intent.abilityId);
	if (!(ability instanceof ActiveSkill)) throw new Error(`Unit ${actor.id} cannot use ability ${intent.abilityId}`);
	const candidates = targetSystem.getTargetCandidates(actor, ability.targetPolicy, allUnits);
	const target = intent.targetUnitId ? candidates.find((candidate) => candidate.id === intent.targetUnitId) : candidates[0];
	if (ability.targetPolicy.scope === "single" && ability.targetPolicy.team !== "self" && !intent.targetUnitId) throw new Error(`Ability target is required for unit ${actor.id}`);
	if (!target || intent.targetUnitId && !candidates.includes(target) || !ability.canTrigger({
		caster: actor,
		target
	})) throw new Error(`Ability ${ability.id} is not legal for unit ${actor.id}`);
}
function validateRoundCommandSet(save, livingUnits, commandSet) {
	if (!commandSet || commandSet.version !== "round_command_set_v1" || !commandSet.commandSetId || commandSet.round !== save.checkpoint.round + 1 || commandSet.checkpointRevision !== save.checkpoint.checkpointRevision) throw new Error("Round command set does not match the checkpoint");
	const expected = new Set(livingUnits.map((unit) => unit.id));
	const actual = Object.keys(commandSet.intents);
	if (actual.length !== expected.size || actual.some((unitId) => !expected.has(unitId))) throw new Error("Round command set must contain every living unit exactly once");
	for (const intent of Object.values(commandSet.intents)) if (!intent || intent.kind !== "ability" && intent.kind !== "basic_attack" && intent.kind !== "skip" || intent.submittedBy !== "player" && intent.submittedBy !== "timeout") throw new Error("Round command set contains an invalid intent");
}
function processBuffDurations(unit, durationUnit, resolution) {
	for (const buff of unit.buffs.getAllBuffs()) {
		if (!unit.isAlive()) break;
		if (buff.durationUnit !== durationUnit) continue;
		if (!shouldTickBuffDuration(unit, buff)) continue;
		buff.tickDuration();
		if (buff.isExpired()) unit.buffs.removeBuffExpired(buff.id, {
			trace: unit.runtime.events.reserveTrace(),
			resolution
		});
	}
}
function getSkipControlTag(unit) {
	if (unit.tags.hasTag(GameplayTags.STATUS.CONTROL.STUNNED)) return GameplayTags.STATUS.CONTROL.STUNNED;
	if (unit.tags.hasTag(GameplayTags.STATUS.CONTROL.NO_ACTION)) return GameplayTags.STATUS.CONTROL.NO_ACTION;
	return null;
}
//#endregion
//#region src/server/workers/onlineBattleResolver.worker.ts
self.onmessage = (event) => {
	const request = event.data;
	try {
		self.postMessage({
			id: request.id,
			ok: true,
			resolution: resolveBattleRound(request.battle, request.commandSet)
		});
	} catch (error) {
		self.postMessage({
			id: request.id,
			ok: false,
			error: error instanceof Error ? error.message : String(error),
			code: error && typeof error === "object" && "code" in error ? String(error.code) : void 0
		});
	}
};
//#endregion
export {};
