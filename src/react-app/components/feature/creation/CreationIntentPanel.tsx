import { InkChoiceButton, InkInput } from '@app/components/ui';
import { getEquipmentSlotConceptLabel } from '@shared/lib/gameConceptDisplay';
import { EQUIPMENT_SLOT_VALUES, type EquipmentSlot } from '@shared/types/constants';

export interface CreationIntentPanelProps {
  productType: 'artifact' | 'skill' | 'gongfa';
  userPrompt: string;
  onUserPromptChange: (value: string) => void;
  
  requestedSlot?: EquipmentSlot | '';
  onRequestedSlotChange?: (value: EquipmentSlot | '') => void;
  disabled?: boolean;
}

/**
 *
 *
 * ""
 *   - userPrompt/ LLM
 *   - requestedSlot
 *
 *  /
 * LLM
 */
export function CreationIntentPanel({
  productType,
  userPrompt,
  onUserPromptChange,
  requestedSlot,
  onRequestedSlotChange,
  disabled,
}: CreationIntentPanelProps) {
  return (
    <div className="space-y-3">
      <InkInput
        label="玩家意念（可选）"
        placeholder="比如：以雷火共鸣的杀伐神通 / 走守御为主的护体功法"
        value={userPrompt}
        onChange={(val) => onUserPromptChange(val)}
        multiline
        rows={3}
        hint="会一并递交给 LLM 命名模型，影响产物名称与风格描述；不会改变核心数值。"
        disabled={disabled}
      />

      {productType === 'artifact' && onRequestedSlotChange && (
        <div className="flex flex-col gap-1.5">
          <span className="font-semibold tracking-wide">
            目标槽位
            <span className="text-crimson ml-1 text-xs font-normal">
              （必选）
            </span>
          </span>
          <div className="flex flex-wrap gap-2">
            {EQUIPMENT_SLOT_VALUES.map((slot) => (
              <InkChoiceButton
                key={slot}
                disabled={disabled}
                onClick={() => onRequestedSlotChange(slot)}
                selected={requestedSlot === slot}
              >
                {getEquipmentSlotConceptLabel(slot, 'intent')}
              </InkChoiceButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
