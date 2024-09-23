import { useEffect, useRef } from 'react';

export function useWindowDimensions() {
  const windowDimensions = useRef({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    function callback() {
      windowDimensions.current = { w: window.innerWidth, h: window.innerHeight };
    }

    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, []);

  return windowDimensions;
}
