import { useRef, useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  fetchNewsContent,
  fetchMovieContent,
  fetchMusicContent,
  fetchSocialContent,
  incrementPaginationPage,
} from '@/store/slices/feedSlice';

/**
 * Custom hook for managing feed pagination and content loading
 * @param {Object} options - Hook options
 * @param {boolean} options.loading - Whether content is currently loading
 * @param {Object} options.pagination - Pagination state for different content types
 * @param {Array<string>} options.categories - User's selected content categories
 * @returns {Object} Object containing the loadMoreContent function
 */
export function useFeedPaging(options) {
  const { loading, pagination, categories } = options;
  const dispatch = useAppDispatch();

  const lastLoadTsRef = useRef(0);
  const loadCounterRef = useRef(0);

  /**
   * Load more content with throttling to prevent excessive API calls
   */
  const loadMoreContent = useCallback(async () => {
    const now = Date.now();
    const COOLDOWN_DURATION = 2500; // 2.5s

    // Throttle requests
    if (loading || (now - lastLoadTsRef.current < COOLDOWN_DURATION)) return;

    lastLoadTsRef.current = now;
    loadCounterRef.current += 1;

    try {
      const tasks = [];
      const newsApiCooldown = typeof window !== 'undefined' ? localStorage.getItem('newsApiCooldown') : null;
      const isNewsApiCoolingDown = newsApiCooldown && parseInt(newsApiCooldown) > now;

      // Load news content if not in cooldown and has more pages
      if (!isNewsApiCoolingDown && pagination.news && pagination.news.hasMore) {
        const nextNewsPage = (pagination.news.currentPage ?? 1) + 1;
        tasks.push(dispatch(fetchNewsContent({ category: categories[0] || 'technology', page: nextNewsPage })));
        dispatch(incrementPaginationPage('news'));
      }

      // Load movie content if has more pages
      if (pagination.movie && pagination.movie.hasMore) {
        const nextMoviePage = (pagination.movie.currentPage ?? 1) + 1;
        tasks.push(dispatch(fetchMovieContent(nextMoviePage)));
        dispatch(incrementPaginationPage('movie'));
      }

      // Load music and social content every third load
      if (loadCounterRef.current % 3 === 0) {
        tasks.push(dispatch(fetchMusicContent()));
        tasks.push(dispatch(fetchSocialContent()));
      }

      await Promise.all(tasks);
    } catch (err) {
      console.error('Error loading more content:', err);
    }
  }, [loading, pagination, categories, dispatch]);

  return { loadMoreContent };
}
