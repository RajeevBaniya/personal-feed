import { useRef, useCallback } from 'react';

export function useAutoScroll() {
  const autoScrollRef = useRef(null);

  const startAutoScroll = useCallback((clientY) => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    const scrollThreshold = 100;
    const scrollSpeed = 10;

    autoScrollRef.current = setInterval(() => {
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      if (clientY < scrollThreshold) {
        window.scrollBy(0, -scrollSpeed);
      } else if (clientY > windowHeight - scrollThreshold) {
        window.scrollBy(0, scrollSpeed);
      }
    }, 16);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  return { startAutoScroll, stopAutoScroll };
}
