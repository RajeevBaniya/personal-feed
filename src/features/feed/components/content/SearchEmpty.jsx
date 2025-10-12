import React from 'react';

export default function SearchEmpty({ message = 'Try adjusting your search terms or filters' }) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}


