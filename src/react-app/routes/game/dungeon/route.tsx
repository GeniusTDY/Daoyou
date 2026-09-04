import { useCultivatorDisplayProjection } from '@app/components/feature/cultivator/useCultivatorDisplayProjection';
import { GameSceneLoading } from '@app/components/game-shell';
import { useDungeonViewModel } from '@app/lib/hooks/dungeon/useDungeonViewModel';
import { useTaskList } from '@app/lib/hooks/useTaskList';
import { projectBattleUnitEntryState } from '@shared/engine/battle-v5/setup/BattleStateStrategy';
import { buildConditionBattleUnitInitFragment } from '@shared/lib/conditionBattle';
import { Suspense, useCallback, useMemo } from 'react';
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
  const projection = useCultivatorDisplayProjection();
  const cultivator = projection.data?.cultivator ?? null;
  const battleEntryResources = useMemo(() => {
    const data = projection.data;
    if (!data) return undefined;
    const entry = projectBattleUnitEntryState({
      cultivator: data.cultivator,
      state: {
        resources: {
          kind: 'absolute',
          hp: data.projectedCondition.resources.hp.current,
          mp: data.projectedCondition.resources.mp.current,
        },
        fragment: buildConditionBattleUnitInitFragment(
          data.projectedCondition,
          data.now,
        ),
      },
    });
    return {
      hp: entry.hp,
      mp: entry.mp,
    };
  }, [projection.data]);
  const isCultivatorLoading = projection.loading;
  const { tasks, loading: tasksLoading } = useTaskList(cultivator?.id);
  const [searchParams] = useSearchParams();
  const preSelectedNodeId = searchParams.get('nodeId');
  const navigate = useNavigate();

  //  ViewModel Hook
  const { viewState, processing, actions } = useDungeonViewModel(
    !!cultivator,
    cultivator?.id,
    preSelectedNodeId,
  );

  
  const handleSettlementConfirm = useCallback(() => {
    navigate('/game');
  }, [navigate]);

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
    <DungeonViewRenderer
      viewState={viewState}
      cultivator={cultivator}
      displayResources={battleEntryResources}
      tasks={tasks}
      processing={processing}
      actions={actions}
      onSettlementConfirm={handleSettlementConfirm}
    />
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
