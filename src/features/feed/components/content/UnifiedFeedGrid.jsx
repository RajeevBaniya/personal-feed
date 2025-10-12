import React from 'react';
import ContentCard from './ContentCard';

export default function UnifiedFeedGrid({ items, onOpen }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.filter(i => i && i.id).map((item, index) => (
        <ContentCard key={`${item.type}-${item.id}-${index}`} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}


