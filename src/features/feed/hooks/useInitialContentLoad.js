'use client';
import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { fetchNewsContent, fetchMovieContent, fetchMusicContent, fetchSocialContent } from '@/store/slices/feedSlice';

/**
 * useInitialContentLoad
 * Loads the first page of content for selected categories when the app boots.
 * Skips if initial data exists or user has a custom order.
 * 
 * @param {Object} params - Hook parameters
 * @param {string[]} params.categories - The categories to load content for
 * @param {boolean} params.hasInitialData - Whether initial data has already been loaded
 * @param {boolean} params.hasCustomOrder - Whether the user has a custom order
 * @returns {void}
 */
export function useInitialContentLoad(params) {
  const { categories, hasInitialData, hasCustomOrder } = params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      if (hasInitialData || hasCustomOrder) return;
      try {
        for (const category of categories) {
          await dispatch(fetchNewsContent({ category, page: 1 }));
        }
        await dispatch(fetchMovieContent(1));
        await dispatch(fetchMusicContent());
        await dispatch(fetchSocialContent());
      } catch {}
    };
    load();
  }, [dispatch, categories, hasInitialData, hasCustomOrder]);
}

export default useInitialContentLoad;
