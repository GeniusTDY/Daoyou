/*
 * MaterialFactsBuilder:  MaterialFingerprint  MaterialFacts dominantTags
 * unlockScore  rules  Facts  rules
 */
import { buildMaterialEnergyProfile } from './MaterialBalanceProfile';
import { MaterialFacts } from '../rules/contracts';
import { CreationProductType, MaterialFingerprint } from '../types';

export class MaterialFactsBuilder {
  build(
    productType: CreationProductType,
    fingerprints: MaterialFingerprint[],
  ): MaterialFacts {
    const energyProfile = buildMaterialEnergyProfile(fingerprints);

    return {
      productType,
      fingerprints,
      normalizedTags: this.collectNormalizedTags(fingerprints),
      recipeTags: this.collectRecipeTags(fingerprints),
      dominantTags: MaterialFactsBuilder.pickDominantTags(fingerprints),
      energyProfile,
      unlockScore: energyProfile.unlockScore,
    };
  }

  /**
   * / 4
   *  DefaultIntentResolver
   */
  static pickDominantTags(
    fingerprints: MaterialFingerprint[],
  ): string[] {
    const scores = new Map<string, number>();

    fingerprints.forEach((fingerprint) => {
      [...fingerprint.semanticTags, ...fingerprint.recipeTags].forEach((tag) => {
        scores.set(tag, (scores.get(tag) ?? 0) + 1);
      });
    });

    return Array.from(scores.entries())
      .sort((left, right) => right[1] - left[1])
      .slice(0, 4)
      .map(([tag]) => tag);
  }

  private collectNormalizedTags(
    fingerprints: MaterialFingerprint[],
  ): string[] {
    return Array.from(
      new Set(
        fingerprints.flatMap((fingerprint) => [
          ...fingerprint.explicitTags,
          ...fingerprint.semanticTags,
          ...fingerprint.recipeTags,
        ]),
      ),
    );
  }

  private collectRecipeTags(fingerprints: MaterialFingerprint[]): string[] {
    return Array.from(
      new Set(fingerprints.flatMap((fingerprint) => fingerprint.recipeTags)),
    );
  }
}
