import React from 'react';
import { SearchSkeleton } from '@/shared/components/ui/LoadingSkeleton';
import FilterBar from '@/shared/components/ui/FilterBar';

export default function SearchHeader({ query, isSearching }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Search Results</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {isSearching ? 'Searching...' : `Results for "${query}"`}
      </p>
      {isSearching ? <SearchSkeleton /> : <FilterBar />}
    </div>
  );
}


