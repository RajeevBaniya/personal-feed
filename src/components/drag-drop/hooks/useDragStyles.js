import { useEffect } from 'react';

export function useDragStyles(isDragging) {
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      document.documentElement.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      document.documentElement.style.cursor = 'default';
    }

    return () => {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      document.documentElement.style.cursor = 'default';
    };
  }, [isDragging]);
}
