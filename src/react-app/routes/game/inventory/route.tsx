import { GameSceneLoading } from '@app/components/game-shell';
import { Suspense } from 'react';
import { InventoryView } from './components/InventoryView';


export default function InventoryPage() {
  return (
    <Suspense fallback={<GameSceneLoading message="储物袋开启中……" />}>
      <InventoryView />
    </Suspense>
  );
}
