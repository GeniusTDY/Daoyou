import { useEffect, useState } from 'react';


export interface DungeonLimitInfo {
  allowed: boolean;
  remaining: number;
  used: number;
  dailyLimit: number;
}

/**
 *  Hook
 *
 *
 * 1.
 * 2.
 * 3.
 */
export function useDungeonLimit(hasCultivator: boolean) {
  const [limitInfo, setLimitInfo] = useState<DungeonLimitInfo | null>(null);
  const [isLoading, setIsLoading] = useState(hasCultivator);
  const [error, setError] = useState<string | null>(null);

  const fetchLimit = async () => {
    if (!hasCultivator) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/dungeon/limit');
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success && data.data) {
        setLimitInfo(data.data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '获取次数限制失败');
      setLimitInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    if (!hasCultivator) {
      return;
    }

    let cancelled = false;

    const loadLimit = async () => {
      try {
        const res = await fetch('/api/dungeon/limit');
        const data = await res.json();

        if (cancelled) return;

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.success && data.data) {
          setLimitInfo(data.data);
          setError(null);
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : '获取次数限制失败');
        setLimitInfo(null);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadLimit();

    return () => {
      cancelled = true;
    };
  }, [hasCultivator]);

  const refresh = () => {
    fetchLimit();
  };

  return {
    limitInfo,
    isLoading,
    error,
    refresh,
  };
}
