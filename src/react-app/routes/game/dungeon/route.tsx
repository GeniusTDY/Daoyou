import { GameSceneLoading } from '@app/components/game-shell';
import { InkButton, InkNotice } from '@app/components/ui';
import { useDungeonViewModel } from '@app/lib/hooks/dungeon/useDungeonViewModel';
import { useTaskList } from '@app/lib/hooks/useTaskList';
import {
  useCultivatorCondition,
  useCultivatorIdentity,
} from '@app/lib/resources/player';
import { Suspense, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { DungeonViewRenderer } from './components/DungeonViewRenderer';
import { DungeonSceneScreen } from './dungeonScene';
import { resolveDungeonSceneDescriptor } from './dungeonSceneRegistry';

/**
 *
 *
 *
 * 1.
 * 2.  ViewModel Hook
 * 3.  DungeonViewRenderer
 */
function DungeonContent() {
  const identity = useCultivatorIdentity();
  const condition = useCultivatorCondition();
  const cultivator = identity.data?.cultivator
    ? { ...identity.data.cultivator, condition: condition.data }
    : null;
  const resource = (
    point: { current: number; max?: number } | undefined,
    authorityMax?: number,
  ) => {
    const max = authorityMax ?? point?.max ?? 0;
    const current = Math.min(max, Math.max(0, point?.current ?? 0));
    return { current, max, percent: max ? (current / max) * 100 : 0 };
  };
  const battleEntryResources = condition.data
    ? {
        hp: resource(
          condition.data.resources.hp,
          condition.data.combatV6?.maxHp,
        ),
        mp: resource(
          condition.data.resources.mp,
          condition.data.combatV6?.maxMp,
        ),
      }
    : undefined;
  const isCultivatorLoading = identity.loading || condition.loading;
  const { tasks, loading: tasksLoading } = useTaskList(cultivator?.id);
  const [searchParams] = useSearchParams();
  const preSelectedNodeId = searchParams.get('nodeId');
  const navigate = useNavigate();

  //  ViewModel Hook 
  const {
    viewState,
    processing,
    actions,
    readError,
    refreshing,
    refresh,
    dismissSettlement,
  } = useDungeonViewModel(!!cultivator, cultivator?.id, preSelectedNodeId);

  
  const handleSettlementConfirm = useCallback(() => {
    dismissSettlement();
    navigate('/game');
  }, [navigate, dismissSettlement]);

  // ViewModel 
  
  if ((isCultivatorLoading && !cultivator) || tasksLoading || !tasks) {
    const descriptor = resolveDungeonSceneDescriptor('loading');
    return (
      <DungeonSceneScreen descriptor={descriptor}>
        <GameSceneLoading message={descriptor.loadingMessage} />
      </DungeonSceneScreen>
    );
  }

  
  return (
    <>
      {readError ? (
        <div className="mx-auto w-full max-w-3xl p-4" role="alert">
          <InkNotice tone="warning">{readError}</InkNotice>
          <InkButton disabled={refreshing} onClick={() => void refresh()}>
            {refreshing ? '正在确认探索结果…' : '重新读取'}
          </InkButton>
        </div>
      ) : null}
      <fieldset
        className={
          viewState.type === 'in_battle' ? 'h-full min-w-0' : 'min-w-0'
        }
        disabled={!!readError || refreshing}
        inert={!!readError || refreshing}
      >
        {readError && viewState.type === 'map_selection' ? (
          <p className="p-4 text-center">探索状态暂不可用</p>
        ) : (
          <DungeonViewRenderer
            viewState={viewState}
            cultivator={cultivator}
            displayResources={battleEntryResources}
            tasks={tasks}
            processing={processing}
            actions={actions}
            onSettlementConfirm={handleSettlementConfirm}
          />
        )}
      </fieldset>
    </>
  );
}

export default function DungeonPage() {
  const descriptor = resolveDungeonSceneDescriptor('loading');

  return (
    <Suspense
      fallback={
        <DungeonSceneScreen descriptor={descriptor}>
          <GameSceneLoading message={descriptor.loadingMessage} />
        </DungeonSceneScreen>
      }
    >
      <DungeonContent />
    </Suspense>
  );
}
