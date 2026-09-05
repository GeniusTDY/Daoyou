import { GameSceneLoading } from '@app/components/game-shell';
import { Suspense } from 'react';
import { SkillsView } from './components/SkillsView';


export default function SkillsPage() {
  return (
    <Suspense fallback={<GameSceneLoading message="神通卷轴徐徐展开……" />}>
      <SkillsView />
    </Suspense>
  );
}
