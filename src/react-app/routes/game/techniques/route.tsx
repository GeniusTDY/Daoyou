import { GameSceneLoading } from '@app/components/game-shell';
import { Suspense } from 'react';
import { TechniquesView } from './components/TechniquesView';


export default function TechniquesPage() {
  return (
    <Suspense fallback={<GameSceneLoading message="功法卷轴徐徐展开……" />}>
      <TechniquesView />
    </Suspense>
  );
}
