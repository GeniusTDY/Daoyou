import { DungeonState } from '@shared/lib/dungeon/types';
import { useEffect, useState } from 'react';

/**
 * Hook
 *
 */
export function useDungeonState(hasCultivator: boolean) {
  const [state, setState] = useState<DungeonState | null>(null);
  const [loading, setLoading] = useState(hasCultivator);
  const [error, setError] = useState<string | null>(null);

  const fetchState = async () => {
    if (!hasCultivator) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/dungeon/state');
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setState(data.state);
    } catch (e) {
      setError(e instanceof Error ? e.message : '获取副本状态失败');
      setState(null);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!hasCultivator) {
      return;
    }

    let cancelled = false;

    const loadState = async () => {
      try {
        const res = await fetch('/api/dungeon/state');
        const data = await res.json();

        if (cancelled) return;

        if (data.error) {
          throw new Error(data.error);
        }

        setState(data.state);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : '获取副本状态失败');
        setState(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadState();

    return () => {
      cancelled = true;
    };
  }, [hasCultivator]);

  const refresh = () => {
    fetchState();
  };

  return {
    state,
    setState,
    loading,
    error,
    refresh,
  };
}
