export const contentItems = [
  {
    id: 'news',
    title: 'Daily News',
    subtitle: 'Latest News',
    description: 'Stay updated with latest news from your favorite sources',
    gradientColors: 'from-blue-600 to-cyan-600',
    hasConnector: true,
    connectorGradient: 'rgba(59,130,246,0.5), rgba(168,85,247,0.5)',
    icon: (
      <svg className="h-14 w-14 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    )
  },
  {
    id: 'social',
    title: 'Social Updates',
    subtitle: 'Trending Discussions',
    description: 'Follow conversations and updates from your social networks',
    gradientColors: 'from-purple-600 to-pink-600',
    hasConnector: true,
    connectorGradient: 'rgba(168,85,247,0.5), rgba(236,72,153,0.5)',
    icon: (
      <svg className="h-14 w-14 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
      </svg>
    )
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    subtitle: 'Movies & Music',
    description: 'Discover new content and track your entertainment preferences',
    gradientColors: 'from-emerald-500 to-teal-500',
    hasConnector: false,
    icon: (
      <svg className="h-14 w-14 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  }
];
