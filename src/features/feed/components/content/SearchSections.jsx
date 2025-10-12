import React from 'react';
import ContentCard from './ContentCard';

export default function SearchSections({ results, onItemAction }) {
  const groups = [
    { key: 'news', title: 'News', icon: '📰' },
    { key: 'movie', title: 'Movies', icon: '🎬' },
    { key: 'music', title: 'Music', icon: '🎵' },
    { key: 'social', title: 'Social Posts', icon: '💬' },
  ];

  return (
    <div className="space-y-8">
      {groups.map((g) => {
        const typeItems = results.filter((item) => item.type === g.key);
        if (typeItems.length === 0) return null;
        return (
          <section key={`search-${g.key}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl" aria-hidden>
                {g.icon}
              </span>
              <h3 className="text-lg font-semibold">{`${g.title} Results`}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {typeItems.map((item, index) => (
                <ContentCard
                  key={`${item.type}-${item.id}-${index}`}
                  item={item}
                  onAction={onItemAction}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}


