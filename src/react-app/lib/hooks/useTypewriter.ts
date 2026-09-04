import { useEffect, useRef, useState } from 'react';

export interface TypewriterOptions {
  text: string;
  speed?: number; //  (ms)
  onComplete?: () => void;
  startDelay?: number; //  (ms)
  enabled?: boolean; 
}

/**
 *  Hook (Optimized)
 *
 *  setTimeout  requestAnimationFrame
 */
export function useTypewriter({
  text,
  speed = 80,
  onComplete,
  startDelay = 0,
  enabled = true,
}: TypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const currentIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  
  const skip = () => {
    clearTimer();
    setDisplayedText(text);
    setIsComplete(true);
    setIsRunning(false);
    currentIndexRef.current = text.length;
    // 不触发 onComplete，因为通常 skip 是用户手动行为
  };

  
  const reset = () => {
    clearTimer();
    setDisplayedText('');
    setIsComplete(false);
    setIsRunning(false);
    currentIndexRef.current = 0;
  };

  useEffect(() => {
    
    clearTimer();

    if (!enabled) {
      const t = setTimeout(() => {
        setDisplayedText(text);
        setIsComplete(true);
        setIsRunning(false);
        currentIndexRef.current = text.length;
      }, 0);
      return () => clearTimeout(t);
    }

    //  ( warning)
    const t = setTimeout(() => {
      setDisplayedText('');
      setIsComplete(false);
      setIsRunning(true);
      currentIndexRef.current = 0;

      
      timerRef.current = setTimeout(typeBot, startDelay);
    }, 0);

    const typeBot = () => {
      
      if (currentIndexRef.current >= text.length) {
        setIsComplete(true);
        setIsRunning(false);
        onCompleteRef.current?.();
        return;
      }

      
      currentIndexRef.current += 1;
      setDisplayedText(text.slice(0, currentIndexRef.current));

      
      timerRef.current = setTimeout(typeBot, speed);
    };

    return () => {
      clearTimer();
      clearTimeout(t);
    };
  }, [text, speed, startDelay, enabled]);

  return {
    displayedText,
    isComplete,
    isRunning,
    skip,
    reset,
  };
}
