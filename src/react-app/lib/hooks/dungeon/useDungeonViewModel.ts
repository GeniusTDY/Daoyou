import { useQiActionConfirm } from '@app/components/feature/cultivator/useQiActionConfirm';
import { BattleCallbackData } from '@app/routes/game/dungeon/components/DungeonBattle';
import { QI_ACTION_COSTS } from '@shared/config/qiSystem';
import type { DungeonMaterialSelection } from '@shared/contracts/combatV6Dungeon';
import type { ResourceOperation } from '@shared/engine/resource/types';
import type {
  DungeonOption,
  DungeonRecoverAction,
  DungeonRound,
  DungeonSettlement,
  DungeonState,
} from '@shared/lib/dungeon/types';
import { useMemo } from 'react';
import { useDungeonActions } from './useDungeonActions';
import { useDungeonState } from './useDungeonState';


export type DungeonViewState =
  | { type: 'loading' }
  | { type: 'not_authenticated' }
  | {
      type: 'map_selection';
      preSelectedNodeId: string | null;
    }
  | { type: 'exploring'; state: DungeonState; lastRound: DungeonRound }
  | { type: 'battle_preparation'; state: DungeonState }
  | {
      type: 'in_battle';
      battleId: string;
      state: DungeonState;
    }
  | { type: 'looting'; state: DungeonState }
  | { type: 'recoverable_error'; state: DungeonState }
  | {
      type: 'settlement';
      settlement?: DungeonSettlement;
      realGains?: ResourceOperation[];
    };

export type DungeonMutationResolution =
  | { type: 'none' }
  | { type: 'refresh' }
  | { type: 'state'; state: DungeonState }
  | {
      type: 'settlement';
      settlement?: DungeonSettlement;
      realGains?: ResourceOperation[];
    }
  | { type: 'clear' };

export function resolveDungeonMutationResult(
  data:
    | {
        conflict?: boolean;
        state?: DungeonState;
        isFinished?: boolean;
        settlement?: DungeonSettlement;
        realGains?: ResourceOperation[];
        success?: boolean;
      }
    | null
    | undefined,
): DungeonMutationResolution {
  if (!data) return { type: 'none' };
  if (data.conflict) return { type: 'refresh' };
  if (data.isFinished) {
    return {
      type: 'settlement',
      settlement: data.settlement,
      realGains: data.realGains,
    };
  }
  if (data.state) return { type: 'state', state: data.state };
  if (data.success) return { type: 'clear' };
  return { type: 'none' };
}

export function shouldRefreshCultivatorAfterDungeonMutation(
  resolution: DungeonMutationResolution,
) {
  void resolution;
  return false;
}

/**
 *  Hook
 */
export function useDungeonViewModel(
  hasCultivator: boolean,
  cultivatorId: string | undefined,
  preSelectedNodeId: string | null,
) {
  
  const {
    state,
    setState,
    loading: stateLoading,
    refresh,
    error: readError,
    dismissSettlement,
  } = useDungeonState(cultivatorId);
  const {
    startDungeon,
    performAction,
    beginBattle,
    quitDungeon,
    continueLooting,
    escapeLooting,
    recoverDungeon,
    processing,
  } = useDungeonActions(refresh, state);

  const { openQiActionConfirm } = useQiActionConfirm();

  
  const lastRound = useMemo<DungeonRound | null>(() => {
    if (!state || state.isFinished || state.history.length === 0) {
      return null;
    }

    return {
      scene_description: state.history[state.history.length - 1].scene,
      interaction: {
        options: state.currentOptions || [],
      },
      acquired_items: state.currentRoundItems || [],
      status_update: {
        is_final_round: state.currentRound >= state.maxRounds,
        internal_danger_score: state.dangerScore,
      },
    };
  }, [state]);

  
  const viewState = useMemo<DungeonViewState>(() => {
    
    if (stateLoading && !state) {
      return { type: 'loading' };
    }

    
    if (!hasCultivator) {
      return { type: 'not_authenticated' };
    }

    if (
      !state?.isFinished &&
      state?.status === 'WAITING_BATTLE' &&
      state.encounter
    )
      return { type: 'battle_preparation', state };
    
    if (
      !state?.isFinished &&
      state?.status === 'IN_BATTLE' &&
      state.activeBattleId
    ) {
      return { type: 'in_battle', battleId: state.activeBattleId, state };
    }

    
    if (state?.isFinished) {
      return {
        type: 'settlement',
        settlement: state.settlement,
        realGains: state.realGains,
      };
    }

    
    if (state?.status === 'LOOTING') {
      return { type: 'looting', state };
    }

    if (state?.status === 'RECOVERABLE_ERROR') {
      return { type: 'recoverable_error', state };
    }

    
    if (state && lastRound) {
      return { type: 'exploring', state, lastRound };
    }

    
    return {
      type: 'map_selection',
      preSelectedNodeId,
    };
  }, [stateLoading, hasCultivator, state, lastRound, preSelectedNodeId]);

  
  const handleStartDungeon = async (nodeId: string) => {
    openQiActionConfirm({
      actionName: '秘境探索',
      qiCost: QI_ACTION_COSTS.dungeon_start,
      confirmLabel: '开始探索',
      onConfirm: async () => {
        const newState = await startDungeon(nodeId);
        if (newState) {
          setState(newState);
        }
      },
    });
  };

  
  const handlePerformAction = async (
    option: DungeonOption,
    selections: DungeonMaterialSelection[] = [],
  ) => {
    if (!state?.runId) return;
    const data = await performAction(
      option,
      state.runId,
      state.currentRound,
      selections,
    );
    await applyMutationResult(
      data as Parameters<typeof resolveDungeonMutationResult>[0],
    );
  };

  const handleContinueLooting = async () => {
    const data = await continueLooting();
    await applyMutationResult(
      data as Parameters<typeof resolveDungeonMutationResult>[0],
    );
  };

  const handleEscapeLooting = async () => {
    const data = await escapeLooting();
    await applyMutationResult(
      data as Parameters<typeof resolveDungeonMutationResult>[0],
    );
  };

  const handleRecoverDungeon = async (action: DungeonRecoverAction) => {
    const data = await recoverDungeon(action);
    await applyMutationResult(
      data as Parameters<typeof resolveDungeonMutationResult>[0],
    );
  };

  const applyMutationResult = async (
    data: Parameters<typeof resolveDungeonMutationResult>[0],
  ) => {
    const resolution = resolveDungeonMutationResult(data);
    if (resolution.type === 'refresh') {
      refresh();
      return;
    }
    if (resolution.type === 'state') {
      setState(resolution.state);
    } else if (resolution.type === 'settlement') {
      setState((prev) =>
        prev
          ? {
              ...prev,
              isFinished: true,
              settlement: resolution.settlement,
              realGains: resolution.realGains,
            }
          : null,
      );
    } else if (resolution.type === 'clear') {
      setState(null);
    }
  };

  
  const handleQuitDungeon = async (): Promise<boolean> => {
    const data = await quitDungeon();
    if (!data) return false;
    await applyMutationResult(
      data as Parameters<typeof resolveDungeonMutationResult>[0],
    );
    return true;
  };

  
  const handleBattleComplete = (data: BattleCallbackData | null) => {
    if (data?.isFinished) {
      setState((prev) =>
        prev
          ? {
              ...prev,
              isFinished: true,
              settlement: data.settlement,
              realGains: data.realGains,
            }
          : null,
      );
    } else if (data) {
      setState(data.dungeonState ?? null);
    } else {
      refresh();
    }
  };

  return {
    viewState,
    processing: processing || stateLoading || !!readError,
    readError,
    refreshing: stateLoading,
    refresh,
    dismissSettlement,
    actions: {
      beginBattle: async () => {
        if (!state?.encounter) return;
        await applyMutationResult(
          (await beginBattle(state.encounter.id)) as Parameters<
            typeof resolveDungeonMutationResult
          >[0],
        );
      },
      startDungeon: handleStartDungeon,
      performAction: handlePerformAction,
      quitDungeon: handleQuitDungeon,
      continueLooting: handleContinueLooting,
      escapeLooting: handleEscapeLooting,
      recoverDungeon: handleRecoverDungeon,
      completeBattle: handleBattleComplete,
    },
  };
}
