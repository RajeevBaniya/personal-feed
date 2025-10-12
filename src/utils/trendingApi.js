function hashToId(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function generateNewsId(url, index, category) {
  const key = `${url}|${index}|${category}`;
  return `news-${hashToId(key)}`;
}

function generateMovieId(id) {
  return `movie-${String(id)}`;
}

const TRENDING_CONFIG = {
  NEWS: {
    timeWindow: 24 * 60 * 60 * 1000,
    categories: ['technology', 'business', 'entertainment', 'sports', 'health']
  },
  MOVIES: {
    timeWindow: 30 * 24 * 60 * 60 * 1000,
    minRating: 6.5,
    minVotes: 50
  },
  MUSIC: {
    timeWindow: 7 * 24 * 60 * 60 * 1000,
    minPopularity: 30
  },
  SOCIAL: {
    timeWindow: 24 * 60 * 60 * 1000,
    minLikes: 50,
    minEngagement: 0.02
  }
};

export const fetchTrendingNews = async () => {
  try {
    const trendingArticles = [];
    const now = Date.now();

    for (const category of TRENDING_CONFIG.NEWS.categories) {
      try {
        const response = await fetch(`/api/news?category=${category}&page=1`);
        if (!response.ok) continue;
        const data = await response.json();
        if (data.articles && Array.isArray(data.articles)) {
          const categoryArticles = data.articles
            .filter((article) => {
              if (!article.title || !article.url) return false;
              const publishedTime = new Date(article.publishedAt).getTime();
              const isRecent = (now - publishedTime) <= TRENDING_CONFIG.NEWS.timeWindow;
              return isRecent;
            })
            .slice(0, 3)
            .map((article, index) => ({
              id: generateNewsId(article.url, index, category),
              title: article.title,
              description: article.description || 'No description available',
              url: article.url,
              imageUrl: article.urlToImage,
              publishedAt: article.publishedAt,
              source: (article.source && article.source.name) || 'Unknown',
              category,
              type: 'news',
              readTime: article.description ? Math.ceil(article.description.length / 200) : undefined,
            }));
          trendingArticles.push(...categoryArticles);
        }
      } catch (error) {
        console.warn(`Failed to fetch trending news for category ${category}:`, error);
      }
    }

    return trendingArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 12);
  } catch (error) {
    console.error('Error fetching trending news:', error);
    return [];
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!TMDB_API_KEY) {
      console.warn('TMDB API key not found');
      return [];
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=1&language=en-US`
    );
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    const now = Date.now();
    const thirtyDaysAgo = now - TRENDING_CONFIG.MOVIES.timeWindow;
    return data.results
      .filter((movie) => {
        if (!movie.title || !movie.overview) return false;
        const hasGoodRating = Number(movie.vote_average) >= TRENDING_CONFIG.MOVIES.minRating;
        const hasEnoughVotes = Number(movie.vote_count) >= TRENDING_CONFIG.MOVIES.minVotes;
        const releaseTime = new Date(movie.release_date).getTime();
        const isRecent = releaseTime >= thirtyDaysAgo || releaseTime > now;
        return hasGoodRating && hasEnoughVotes && isRecent;
      })
      .slice(0, 8)
      .map((movie) => ({
        id: generateMovieId(Number(movie.id)),
        title: movie.title,
        description: movie.overview,
        imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
        publishedAt: String(movie.release_date),
        rating: Number(movie.vote_average),
        genre: 'Trending',
        source: 'TMDB',
        category: 'movies',
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        type: 'movie',
      }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchTrendingMusic = async () => {
  try {
    const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    if (!SPOTIFY_CLIENT_ID) {
      console.warn('Spotify Client ID not found');
      return [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending music:', error);
    return [];
  }
};

export const fetchTrendingSocial = async () => {
  try {
    return [];
  } catch (error) {
    console.error('Error fetching trending social posts:', error);
    return [];
  }
};

export const fetchAllTrendingContent = async () => {
  try {
    const [trendingNews, trendingMovies, trendingMusic, trendingSocial] = await Promise.all([
      fetchTrendingNews(),
      fetchTrendingMovies(),
      fetchTrendingMusic(),
      fetchTrendingSocial(),
    ]);

    return {
      news: trendingNews,
      movies: trendingMovies,
      music: trendingMusic,
      social: trendingSocial,
      all: [...trendingNews, ...trendingMovies, ...trendingMusic, ...trendingSocial],
    };
  } catch (error) {
    console.error('Error fetching all trending content:', error);
    return { news: [], movies: [], music: [], social: [], all: [] };
  }
};


