import { Suspense } from 'react';
import PoolLeagueApp from './components/PoolLeagueApp';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PoolLeagueApp />
      <Toaster />
    </Suspense>
  );
}

export default App;