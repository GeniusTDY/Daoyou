import { AUTO_POLICY_VERSION } from '../../combat-v6/auto-policy';
import type { CombatV6VersionStamp } from './core/index.ts';

/** Phase 1 Host  */
export const COMBAT_V6_PHASE_1_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v1',
  contentVersion: 'empty_content_v1',
  projectionVersion: 'character_panel_v1',
});

/** Phase 2  */
export const COMBAT_V6_PHASE_2_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v1',
  contentVersion: 'empty_content_v1',
  projectionVersion: 'character_training_v1',
});

/** Phase 3  */
export const COMBAT_V6_PHASE_3_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v1',
  contentVersion: 'daoyou_sect_content_v1',
  projectionVersion: 'character_sect_v1',
});

/** Phase 4A  */
export const COMBAT_V6_PHASE_4A_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v1',
  contentVersion: 'daoyou_sect_equipment_content_v1',
  projectionVersion: 'character_equipment_v1',
});

/** Phase 4B  */
export const COMBAT_V6_PHASE_4B_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v1',
  contentVersion: 'daoyou_sect_equipment_special_content_v1',
  projectionVersion: 'character_equipment_special_v1',
});

/** Phase 5A  */
export const COMBAT_V6_PHASE_5A_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v1',
  contentVersion: 'daoyou_character_build_content_v1',
  projectionVersion: 'character_build_v1',
});

/** Phase 6A  */
export const COMBAT_V6_PHASE_6A_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v2',
  contentVersion: 'daoyou_character_build_content_v2',
  projectionVersion: 'character_build_v2',
});

/** Phase 6B  */
export const COMBAT_V6_PHASE_6B_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v3',
  contentVersion: 'daoyou_character_build_content_v3',
  projectionVersion: 'character_build_v3',
});

/** Phase 6C  */
export const COMBAT_V6_PHASE_6C_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v4',
  contentVersion: 'daoyou_character_build_content_v4',
  projectionVersion: 'character_build_v4',
});

/** Phase 6D  */
export const COMBAT_V6_PHASE_6D_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v5',
  contentVersion: 'daoyou_character_build_content_v5',
  projectionVersion: 'character_build_v5',
});

/** Phase 7A  Host  */
export const COMBAT_V6_PHASE_7A_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v5',
  contentVersion: 'daoyou_training_encounter_content_v1',
  projectionVersion: 'training_encounter_v1',
});

/** Phase 7B 7A */
export const COMBAT_V6_PHASE_7B_VERSIONS: CombatV6VersionStamp = Object.freeze({
  ...COMBAT_V6_PHASE_7A_VERSIONS,
});

/** Phase 7C 7ARedis */
export const COMBAT_V6_PHASE_7C_VERSIONS: CombatV6VersionStamp = Object.freeze({
  ...COMBAT_V6_PHASE_7A_VERSIONS,
});
/** Wild encounters keep rules v5 while versioning their own content/projection. */
export const COMBAT_V6_PHASE_7D_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v5',
  contentVersion: 'daoyou_wild_encounter_content_v1',
  projectionVersion: 'wild_encounter_v1',
});

export const COMBAT_V6_PHASE_8A_VERSIONS: CombatV6VersionStamp = Object.freeze({
  engineVersion: 'combat-v6',
  rulesetVersion: 'daoyou_rules_v6',
  contentVersion: 'daoyou_arena_content_v1',
  projectionVersion: 'arena_encounter_v1',
});

/** Phase 9A changes command ownership and summon lifecycle; frozen replays do not rerun it. */
export const COMBAT_V6_PHASE_9A_ARENA_VERSIONS: CombatV6VersionStamp =
  Object.freeze({
    engineVersion: 'combat-v6',
    rulesetVersion: 'daoyou_rules_v7',
    contentVersion: 'daoyou_arena_beast_content_v1',
    projectionVersion: 'arena_beast_v1',
  });
export const COMBAT_V6_PHASE_9A_TRAINING_VERSIONS: CombatV6VersionStamp =
  Object.freeze({
    ...COMBAT_V6_PHASE_9A_ARENA_VERSIONS,
    contentVersion: 'daoyou_training_beast_content_v1',
    projectionVersion: 'training_beast_v1',
  });
export const COMBAT_V6_PHASE_9A_WILD_VERSIONS: CombatV6VersionStamp =
  Object.freeze({
    ...COMBAT_V6_PHASE_9A_ARENA_VERSIONS,
    contentVersion: 'daoyou_wild_beast_content_v1',
    projectionVersion: 'wild_beast_v1',
  });

export const COMBAT_V6_PHASE_9B_ARENA_VERSIONS: CombatV6VersionStamp =
  Object.freeze({
    ...COMBAT_V6_PHASE_9A_ARENA_VERSIONS,
    autoPolicyVersion: AUTO_POLICY_VERSION,
    rulesetVersion: 'daoyou_rules_v10',
    projectionVersion: 'arena_beast_v2',
  });
export const COMBAT_V6_PHASE_9B_TRAINING_VERSIONS: CombatV6VersionStamp =
  Object.freeze({
    ...COMBAT_V6_PHASE_9A_TRAINING_VERSIONS,
    autoPolicyVersion: AUTO_POLICY_VERSION,
    rulesetVersion: 'daoyou_rules_v10',
    projectionVersion: 'training_beast_v2',
  });
export const COMBAT_V6_PHASE_9B_WILD_VERSIONS: CombatV6VersionStamp =
  Object.freeze({
    ...COMBAT_V6_PHASE_9A_WILD_VERSIONS,
    autoPolicyVersion: AUTO_POLICY_VERSION,
    rulesetVersion: 'daoyou_rules_v10',
    contentVersion: 'daoyou_wild_capture_content_v1',
    projectionVersion: 'wild_beast_v2',
  });

export const COMBAT_V6_PHASE_9C_WILD_VERSIONS: CombatV6VersionStamp =
  Object.freeze({
    ...COMBAT_V6_PHASE_9B_WILD_VERSIONS,
    contentVersion: 'daoyou_wild_inventory_content_v1',
  });

export const COMBAT_V6_WILD_SEEKING_VERSIONS: CombatV6VersionStamp = Object.freeze({
  ...COMBAT_V6_PHASE_9C_WILD_VERSIONS,
  contentVersion: 'daoyou_wild_seeking_content_v2',
  projectionVersion: 'wild_individual_v3',
});

export const COMBAT_V6_SEAL_CURVE_ARENA_VERSIONS: CombatV6VersionStamp = Object.freeze({
  ...COMBAT_V6_PHASE_9B_ARENA_VERSIONS,
  rulesetVersion: 'daoyou_rules_v11',
});
export const COMBAT_V6_SEAL_CURVE_TRAINING_VERSIONS: CombatV6VersionStamp = Object.freeze({
  ...COMBAT_V6_PHASE_9B_TRAINING_VERSIONS,
  rulesetVersion: 'daoyou_rules_v11',
});
export const COMBAT_V6_SEAL_CURVE_WILD_VERSIONS: CombatV6VersionStamp = Object.freeze({
  ...COMBAT_V6_WILD_SEEKING_VERSIONS,
  rulesetVersion: 'daoyou_rules_v11',
});
