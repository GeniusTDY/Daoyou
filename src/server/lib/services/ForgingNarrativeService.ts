import { renderPrompt } from '@server/lib/prompts';
import { generateAiObject } from '@server/utils/aiClient';
import { truncateText } from '@server/utils/llmPayload';
import { equipmentRealm } from '@shared/engine/combat-v6/equipment/realm';
import type { DaoEquipmentSlot } from '@shared/engine/combat-v6/equipment/types';
import { DAO_WEAPONS, type DaoWeaponType } from '@shared/engine/combat-v6/equipment/weapons';
import { ForgedEquipmentCopySchema } from '@shared/forging/narrative';
import { EQUIPMENT_SLOT_NAMES } from '@shared/items/definitions/equipment-blueprints';
import type { MaterialFacts } from '@shared/items/definitions/materials';
import { z } from 'zod';

//  JSON SchemaUnicode 
const generatedCopySchema = z
  .object({
    name: z.string().min(2).max(16).describe('2至8个汉字的器名'),
    desc: z.string().min(1).max(120).describe('60字以内（含标点）的器物描述'),
  })
  .strict();

export async function generateForgingNarrative(input: {
  level: number;
  slot: DaoEquipmentSlot;
  weaponType?: DaoWeaponType;
  materials: { facts: MaterialFacts; quantity: number }[];
  intent?: string;
}) {
  if (
    process.env.DISABLE_LLM_NAMING === 'true' ||
    process.env.ENABLE_LLM_NAMING === 'false'
  )
    return null;
  try {
    const { system, user } = renderPrompt('equipment-forge-naming', {
      factsJson: JSON.stringify({
        realm: equipmentRealm(input.level).realm,
        slot: EQUIPMENT_SLOT_NAMES[input.slot],
        weaponType: input.weaponType ? DAO_WEAPONS[input.weaponType].name : undefined,
        materials: input.materials.map(({ facts, quantity }) => ({
          name: facts.name,
          description: truncateText(facts.description, 240),
          quantity,
        })),
        intent: input.intent ?? '',
      }),
    });
    const result = await generateAiObject({
      system,
      prompt: user,
      schema: generatedCopySchema,
      resultSchema: ForgedEquipmentCopySchema,
      sceneId: 'equipment-forge-naming',
      name: 'ForgedEquipmentCopy',
      timeoutMs: 8000,
      maxOutputTokens: 256,
    });
    const copy = ForgedEquipmentCopySchema.parse(result.output);
    
    if (input.weaponType && !copy.name.endsWith(DAO_WEAPONS[input.weaponType].name))
      return null;
    return copy;
  } catch {
    
    console.warn(
      '[forging] narrative unavailable, using default equipment name',
    );
    return null;
  }
}
