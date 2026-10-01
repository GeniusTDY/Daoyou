import { getRealmStageUnallocatedAttributeBudget } from '@shared/config/realmProgression';
import { generateAiObject } from '@server/utils/aiClient';
import type { Cultivator } from '@shared/types/cultivator';
import {
  getCharacterGenerationPrompt,
  getCharacterGenerationUserPrompt,
} from './prompts';
import { CultivatorAIRawSchema, normalizeCultivatorAIData } from './types';
import { generateAttributes, generateSpiritualRoots } from './utils';

export class CharacterGenerator {
  /**
   *
   * @param userInput /
   */
  public static async generate(
    userInput: string,
  ): Promise<{ cultivator: Cultivator; balanceNotes: string }> {
    // 1.  AI 
    const prompt = getCharacterGenerationPrompt();
    const userPrompt = getCharacterGenerationUserPrompt(userInput);

    const aiResponse = await generateAiObject({
      system: prompt,
      prompt: userPrompt,
      schema: CultivatorAIRawSchema,
      name: '修仙真形骨架',
      sceneId: 'character-generation',
    });

    const data = normalizeCultivatorAIData(aiResponse.output);

    // 2. 
    const attributes = generateAttributes();
    const spiritual_roots = generateSpiritualRoots(
      data.aptitude_score,
      data.element_preferences,
    );

    // 4. 
    const age = 14 + Math.floor(Math.random() * 6); // 14-20
    // 100
    const lifespan =
      80 + Math.floor(Math.random() * 20) + (data.aptitude_score > 80 ? 20 : 0);

    //  Cultivator 
    const cultivator: Cultivator = {
      id: '', // Placeholder
      name: data.name,
      gender: data.gender,
      origin: data.origin,
      personality: data.personality,
      background: data.background,
      playerRace: 'human',
      raceNarrative: data.race_narrative,

      realm: '炼气',
      realm_stage: '初期',
      age,
      lifespan,

      attributes,
      unallocated_attribute_points: getRealmStageUnallocatedAttributeBudget(
        '炼气', '初期',
      ),
      spiritual_roots,
      status: 'active',
      spirit_stones: 0,
      pre_heaven_fates: [], 
      inventory: {
        artifacts: [],
        consumables: [],
        materials: [],
      },
      equipped: {
        weapon: null,
        armor: null,
        accessory: null,
      },
      prompt: userInput,
      balance_notes: data.balance_notes,
    };

    return {
      cultivator,
      balanceNotes: data.balance_notes,
    };
  }
}
