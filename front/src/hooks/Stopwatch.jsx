import { useRef } from 'react';

export function useStopwatch() {
  const startTime = useRef(null);

  function start() {
    startTime.current = Date.now();
  }

  function readAndRestart() {
    const now = Date.now();
    const elapsed = (now - startTime.current) / 1000;
    startTime.current = now;
    return elapsed;
  }

  return { start, readAndRestart };
}
