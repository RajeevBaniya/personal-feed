import React from 'react';

export default function InfiniteLoader({ loadingRef, isLoading }) {
  return (
    <div ref={loadingRef} className="mt-6 flex justify-center">
      {isLoading && (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
      )}
    </div>
  );
}


