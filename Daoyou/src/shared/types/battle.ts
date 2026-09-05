import type {
  BattleInitConfigV5,
  BattleUnitInitSpec,
  PersistentCombatStatusV5,
  ResourcePointState,
} from '@shared/engine/battle-v5/setup/types';
import type {
  UnitStateDelta,
  UnitStateSnapshot,
} from '@shared/engine/battle-v5/systems/state/types';
import type { BattleRecordV3 } from '@shared/engine/battle-v5/v3';
import type { Cultivator } from '@shared/types/cultivator';

export type {
  BattleInitConfigV5,
  BattleUnitInitSpec,
  PersistentCombatStatusV5,
  ResourcePointState,
};

export type { BattleRecordV3 };

export type BattleRecordType = 'challenge' | 'challenged' | 'normal';

export type BattleRecordUnitSummary = Pick<Cultivator, 'id' | 'name'>;

export interface BattleRecordV3Summary {
  id: string;
  createdAt: Date | null;
  battleType: BattleRecordType;
  opponentCultivatorId: string | null;
  winner: BattleRecordUnitSummary;
  loser: BattleRecordUnitSummary;
  turns: number;
}

export interface BattleRecordV3Detail {
  id: string;
  createdAt: Date | null;
  battleResult: BattleRecordV3;
}

export type PublicBattleUnitSnapshotV1 = Omit<
  UnitStateSnapshot,
  'attrs' | 'baseAttrs'
>;

export type PublicBattleUnitDeltaV1 = Omit<
  UnitStateDelta,
  'attrs' | 'baseAttrs'
>;

export interface PublicBattleStateFrameV1 extends Omit<
  BattleRecordV3['stateTimeline']['frames'][number],
  'units' | 'deltas'
> {
  units: Record<string, PublicBattleUnitSnapshotV1>;
  deltas?: Record<string, PublicBattleUnitDeltaV1>;
}


export interface BattlePlaybackRecordV3 {
  participants: BattleRecordV3['participants'];
  outcome: BattleRecordV3['outcome'];
  sequences: BattleRecordV3['sequences'];
  stateTimeline: Omit<BattleRecordV3['stateTimeline'], 'frames'> & {
    frames: PublicBattleStateFrameV1[];
  };
}


export interface PublicBattleReplayV1 extends BattlePlaybackRecordV3 {
  finalSnapshots: {
    winner: PublicBattleUnitSnapshotV1;
    loser: PublicBattleUnitSnapshotV1;
  };
}

export interface PublicBattleShareDetailV1 {
  shareCode: string;
  createdAt: string;
  winner: BattleRecordUnitSummary;
  loser: BattleRecordUnitSummary;
  turns: number;
  battleResult: PublicBattleReplayV1;
}
