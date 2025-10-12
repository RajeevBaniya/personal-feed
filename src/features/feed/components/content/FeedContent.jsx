'use client';

import { } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useInfiniteScroll } from '@/features/feed/hooks/useInfiniteScroll';
import { useModalState } from '@/shared/hooks/useModalState';
import { useFeedPaging } from '@/features/feed/hooks/useFeedPaging';
import { useInitialContentLoad } from '@/features/feed/hooks/useInitialContentLoad';
import { useTrendingOnView } from '@/features/feed/hooks/useTrendingOnView';
import { fetchTrendingContent, reorderItems } from '@/store/slices/feedSlice';

import FavoritesSection from '@/features/feed/components/content/FavoritesSection';
import TrendingSection from '@/features/feed/components/content/TrendingSection';
import InfiniteLoader from '@/features/feed/components/content/InfiniteLoader';
import UnifiedFeedGrid from '@/features/feed/components/content/UnifiedFeedGrid';
import ContentModal from '@/features/feed/components/content/ContentModal';
import SearchHeader from '@/features/feed/components/content/SearchHeader';
import SearchSections from '@/features/feed/components/content/SearchSections';
import SearchEmpty from '@/features/feed/components/content/SearchEmpty';
import DraggableFeed from '@/features/feed/components/content/DraggableFeed';
import FeedHeader from '@/features/feed/components/content/FeedHeader';
import { ContentSectionSkeleton } from '@/shared/components/ui/LoadingSkeleton';
import { DragDropProvider } from '@/components/drag-drop/DragDropContext';

export default function FeedContent({ activeSection }) {
  const dispatch = useAppDispatch();
  const { modalItem, openModal, closeModal } = useModalState();

  const { items, temporaryOrder, loading, error, hasInitialData, hasCustomOrder, pagination, trending } = useAppSelector((state) => state.feed);

  const trendingState = trending || { items: [], loading: false, error: null, lastUpdated: null };
  const categories = useAppSelector((state) => state.preferences.categories);
  const { query, results, isSearching } = useAppSelector((state) => state.search);
  const viewMode = useAppSelector((state) => state.preferences.viewMode);
  const favorites = useAppSelector((state) => state.favorites.items);

  useInitialContentLoad({ categories, hasInitialData, hasCustomOrder });

  useTrendingOnView({
    activeSection,
    isLoading: Boolean(trendingState.loading),
    currentCount: trendingState.items.length,
  });

  const handleItemAction = (url) => {
    window.open(url, '_blank');
  };

  const handleCardClick = (item) => {
    if (viewMode === 'normal') {
      openModal(item);
    }
  };

  const handleReorder = (dragIndex, hoverIndex) => {
    dispatch(reorderItems({ dragIndex, hoverIndex, dragSection: 'feed', targetSection: 'feed' }));
  };

  const currentItems = (viewMode === 'draggable' && temporaryOrder && temporaryOrder.length > 0) ? temporaryOrder : items;
  const displayItems = query ? results : currentItems;
  const isSearchMode = query && query.trim() !== '';

  const { loadMoreContent } = useFeedPaging({ loading, pagination, categories });

  const { loadingRef } = useInfiniteScroll({ hasMore: displayItems.length > 0, isLoading: loading, onLoadMore: loadMoreContent, threshold: 200 });

  if (loading && items.length === 0) {
    return (
      <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <ContentSectionSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-6 sm:py-8">
            <p className="text-red-600 dark:text-red-400 mb-4 text-sm sm:text-base">Error: {error}</p>
            <button onClick={() => window.location.reload()} className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">Retry</button>
          </div>
        </div>
      </main>
    );
  }

  const renderFavoritesSection = () => (
    <FavoritesSection favorites={favorites} onItemAction={handleItemAction} />
  );

  const renderTrendingSection = () => (
    <TrendingSection
      items={trendingState.items}
      loading={Boolean(trendingState.loading)}
      error={trendingState.error}
      onOpen={handleCardClick}
      onRetry={() => dispatch(fetchTrendingContent())}
    />
  );

  if (isSearchMode) {
    return (
      <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8">
        <div className="max-w-6xl mx-auto">
          {isSearchMode && <SearchHeader query={query} isSearching={isSearching} />}
          {isSearchMode && results.length === 0 && !isSearching && (<SearchEmpty />)}
          {isSearchMode && results.length > 0 && (<SearchSections results={results} onItemAction={handleItemAction} />)}
        </div>
      </main>
    );
  }

  return (
    <DragDropProvider>
      <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 overflow-visible">
        <div className="max-w-6xl mx-auto overflow-visible">
        {activeSection === 'feed' && (
          <div className="space-y-4 sm:space-y-6">
            <FeedHeader showSave={viewMode === 'draggable'} />
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-500 p-3 sm:p-4 lg:p-6 overflow-visible">
              {displayItems.length > 0 ? (
                viewMode === 'draggable' ? (
                  <DraggableFeed items={displayItems} onReorder={handleReorder} onItemAction={handleItemAction} />
                ) : (
                  <UnifiedFeedGrid items={displayItems} onOpen={openModal} />
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Loading your personalized content...</p>
                </div>
              )}
              {displayItems.length > 0 && (
                <InfiniteLoader loadingRef={loadingRef} isLoading={loading} />
              )}
            </div>
            {viewMode !== 'draggable' && (
              <ContentModal item={modalItem} onClose={closeModal} />
            )}
          </div>
        )}
        {activeSection === 'favorites' && renderFavoritesSection()}
        {activeSection === 'trending' && renderTrendingSection()}
        </div>
      </main>
    </DragDropProvider>
  );
}


