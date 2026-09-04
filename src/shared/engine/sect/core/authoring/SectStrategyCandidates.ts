import type {
  AbilitySelectionCandidate,
  AbilitySelectionResult,
} from '@shared/engine/battle-v5/abilities/AbilitySelectionStrategy';
import { GameplayTags } from '@shared/engine/shared/tag-domain';
import type { SectAbilityId, SectCombatProjection, SectId } from '../domain';

/**  GameplayTag  slug  */
export class SectStrategyCandidates {
  constructor(
    private readonly sectId: SectId,
    private readonly candidates: readonly AbilitySelectionCandidate[],
  ) {}

  find(abilityId: SectAbilityId): AbilitySelectionCandidate | undefined {
    const tag = GameplayTags.ABILITY.SECT.ability(this.sectId, abilityId);
    return this.candidates.find((candidate) =>
      candidate.ability.tags.getTags().includes(tag),
    );
  }

  result(
    abilityId: SectAbilityId,
    score: number,
  ): AbilitySelectionResult | null {
    const candidate = this.find(abilityId);
    return candidate
      ? { ability: candidate.ability, target: candidate.target, score }
      : null;
  }

  resultForCandidate(
    candidate: AbilitySelectionCandidate | undefined,
    score: number,
  ): AbilitySelectionResult | null {
    return candidate
      ? { ability: candidate.ability, target: candidate.target, score }
      : null;
  }
}

export function createSectAbilitySelectionStrategy(
  projection: SectCombatProjection,
) {
  return projection.selectionStrategy ?? null;
}
