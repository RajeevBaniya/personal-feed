'use client';
import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { fetchTrendingContent } from '@/store/slices/feedSlice';

/**
 * useTrendingOnView
 * Fetch trending data when the Trending section becomes active.
 * 
 * @param {Object} params - Hook parameters
 * @param {string} params.activeSection - The currently active section
 * @param {boolean} params.isLoading - Whether content is currently loading
 * @param {number} params.currentCount - The current number of trending items
 * @returns {void}
 */
export function useTrendingOnView(params) {
  const { activeSection, isLoading, currentCount } = params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeSection === 'trending' && !isLoading && currentCount === 0) {
      dispatch(fetchTrendingContent());
    }
  }, [activeSection, isLoading, currentCount, dispatch]);
}

export default useTrendingOnView;
