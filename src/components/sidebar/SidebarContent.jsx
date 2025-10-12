import FavoritesSidebar from './FavoritesSidebar';

function SidebarSection({ title, icon, items }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{icon} {title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SidebarContent() {
  const trendingItems = [
    { id: 1, title: 'Trending Item 1', subtitle: '100 views' },
    { id: 2, title: 'Trending Item 2', subtitle: '200 views' },
    { id: 3, title: 'Trending Item 3', subtitle: '300 views' },
  ];

  return (
    <div className="space-y-6">
      <SidebarSection title="Trending" icon="🔥" items={trendingItems} />
      <FavoritesSidebar />
    </div>
  );
}
