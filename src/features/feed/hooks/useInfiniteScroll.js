import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for implementing infinite scroll functionality.
 * @param {Object} options - Hook options
 * @param {boolean} options.hasMore - Whether there is more content to load
 * @param {boolean} options.isLoading - Whether content is currently loading
 * @param {Function} options.onLoadMore - Function to call when more content should be loaded
 * @param {number} options.threshold - Distance from the bottom of the page to trigger loading (in pixels)
 * @returns {Object} Object containing the loading ref and observation state
 */
export const useInfiniteScroll = ({ hasMore, isLoading, onLoadMore, threshold = 100 }) => {
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    if (observerRef.current) {
      try { observerRef.current.disconnect(); } catch {}
      observerRef.current = null;
    }

    const el = loadingRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    });
    observerRef.current = observer;

    if (el) {
      try { observer.observe(el); } catch {}
    }

    return () => {
      const currentObserver = observerRef.current;
      const currentEl = el; // copy the element reference used for observe
      try {
        if (currentObserver && currentEl) {
          currentObserver.unobserve(currentEl);
        }
        if (currentObserver) {
          currentObserver.disconnect();
        }
      } catch {}
      observerRef.current = null;
    };
  }, [handleObserver, threshold]);

  return { loadingRef, isObserving: !!observerRef.current };
};
