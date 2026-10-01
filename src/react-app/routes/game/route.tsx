import { GameSceneLoading } from '@app/components/game-shell';
import { Suspense } from 'react';
import { HomeView } from './components/HomeView';


export default function HomePage() {
  return (
    <Suspense fallback={<GameSceneLoading message="正在进入洞府……" />}>
      <HomeView />
    </Suspense>
  );
}
