import { useLayoutEffect, useState, useRef } from 'react';

interface UseNowProps {
  updateInterval: number;
  enabled: boolean;
  callback?: (currentTime: number) => void;
}

function useNow({ updateInterval, enabled, callback }: UseNowProps): number {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const [now, setNow] = useState(Date.now());

  useLayoutEffect(() => {
    if (!enabled) return;

    setNow(Date.now());
    callbackRef.current?.(Date.now());

    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      callbackRef.current?.(currentTime);
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [updateInterval, enabled]);

  return now;
}

export default useNow;
