import { useEffect, useRef } from 'react';

export function useMouseDistance() {
  const mouseDistance = useRef(0);
  const lastMousePosition = useRef({ x: null, y: null });

  useEffect(() => {
    function callback(event) {
      if (lastMousePosition.current.x !== null) {
        mouseDistance.current += Math.sqrt(
          Math.pow(lastMousePosition.current.x - event.clientX, 2) +
          Math.pow(lastMousePosition.current.y - event.clientY, 2)
        );
      }
      lastMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', callback);
    return () => window.removeEventListener('mousemove', callback);
  }, []);

  return mouseDistance;
}
