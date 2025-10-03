import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { filterNewItems, removeDuplicates } from '@/utils/deduplication';
import { fetchNewsArticles } from '@/utils/newsApi';
import { fetchSocialPosts } from '@/utils/socialApi';
import { fetchFeaturedPlaylists } from '@/utils/spotifyApi';
import { fetchPopularMovies } from '@/utils/tmdbApi';
import { fetchAllTrendingContent } from '@/utils/trendingApi';

const initialState = {
  items: [],
  temporaryOrder: [],
  loading: false,
  error: null,
  lastUpdated: null,
  hasInitialData: false,
  hasCustomOrder: false,
  hasUnsavedChanges: false,
  pagination: {
    news: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
    movie: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
    music: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
    social: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
  },
  trending: {
    items: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
};

const ensurePaginationState = (state) => {
  if (!state.pagination) {
    state.pagination = {
      news: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
      movie: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
      music: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
      social: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
    };
  }
};

const ensureTrendingState = (state) => {
  if (!state.trending) {
    state.trending = {
      items: [],
      loading: false,
      error: null,
      lastUpdated: null,
    };
  }
};

export const fetchNewsContent = createAsyncThunk(
  'feed/fetchNews',
  async ({ category = 'technology', page = 1 } = {}) => {
    const newsArticles = await fetchNewsArticles(category, page);
    return newsArticles.map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      imageUrl: article.urlToImage,
      source: article.source.name,
      category: article.category,
      publishedAt: article.publishedAt,
      readTime: Math.ceil((article.description || '').length / 200),
      url: article.url,
      type: 'news',
    }));
  }
);

export const fetchMovieContent = createAsyncThunk(
  'feed/fetchMovies',
  async (page = 1) => {
    const movies = await fetchPopularMovies(page);
    return movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      imageUrl: movie.imageUrl,
      source: 'TMDB',
      category: 'movies',
      publishedAt: movie.releaseDate,
      url: movie.url,
      type: 'movie',
      rating: movie.rating,
      genre: movie.genre,
    }));
  }
);

export const fetchMusicContent = createAsyncThunk(
  'feed/fetchMusic',
  async () => {
    const tracks = await fetchFeaturedPlaylists();
    return tracks.map(track => ({
      id: track.id,
      title: track.title,
      description: track.description,
      imageUrl: track.imageUrl,
      source: 'Spotify',
      category: 'music',
      publishedAt: new Date().toISOString(),
      url: track.url,
      type: 'music',
      artist: track.artist,
      album: track.album,
      duration: track.duration,
    }));
  }
);

export const fetchSocialContent = createAsyncThunk(
  'feed/fetchSocial',
  async () => {
    const posts = await fetchSocialPosts();
    return posts.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      source: post.platform,
      category: 'social',
      publishedAt: post.publishedAt,
      url: post.url,
      type: 'social',
      author: post.author,
      platform: post.platform,
      likes: post.likes,
      hashtags: post.hashtags,
    }));
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'feed/fetchTrending',
  async () => {
    const trendingData = await fetchAllTrendingContent();
    return trendingData.all;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFeedItems: (state, action) => {
      state.items = (action.payload || []).filter(item => item && item.id);
      state.lastUpdated = new Date().toISOString();
    },
    addFeedItems: (state, action) => {
      const validItems = (action.payload || []).filter(item => item && item.id);
      const newItems = filterNewItems(state.items, validItems);
      state.items = [...state.items, ...newItems];
      state.items = removeDuplicates(state.items);
      state.lastUpdated = new Date().toISOString();
    },
    removeFeedItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFeed: (state) => {
      state.items = [];
      state.temporaryOrder = [];
      state.lastUpdated = null;
      state.hasInitialData = false;
      state.hasCustomOrder = false;
      state.hasUnsavedChanges = false;
      state.pagination = {
        news: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
        movie: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
        music: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
        social: { currentPage: 1, hasMore: true, isLoading: false, totalLoaded: 0 },
      };
    },
    reorderItems: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const currentItems = ((state.temporaryOrder && state.temporaryOrder.length > 0) ? state.temporaryOrder : state.items)
        .filter(item => item && item.id && item.type);
      if (dragIndex >= 0 && hoverIndex >= 0 && dragIndex < currentItems.length && hoverIndex < currentItems.length) {
        const newItems = [...currentItems];
        const draggedItem = newItems[dragIndex];
        if (!draggedItem) return;
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        state.temporaryOrder = newItems;
        state.hasUnsavedChanges = true;
        state.lastUpdated = new Date().toISOString();
      }
    },
    setCustomOrder: (state, action) => {
      state.items = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    clearCache: (state) => {
      state.items = [];
      state.temporaryOrder = [];
      state.lastUpdated = null;
      state.loading = false;
      state.error = null;
      state.hasInitialData = false;
      state.hasCustomOrder = false;
      state.hasUnsavedChanges = false;
    },
    markAsUnsaved: (state) => {
      state.hasUnsavedChanges = true;
    },
    saveChanges: (state) => {
      if (state.temporaryOrder && state.temporaryOrder.length > 0) {
        state.items = [...state.temporaryOrder];
        state.temporaryOrder = [];
      }
      state.hasUnsavedChanges = false;
      state.hasCustomOrder = true;
      state.lastUpdated = new Date().toISOString();
    },
    setTrendingLoading: (state, action) => {
      ensureTrendingState(state);
      state.trending.loading = action.payload;
    },
    setTrendingError: (state, action) => {
      ensureTrendingState(state);
      state.trending.error = action.payload;
    },
    clearTrending: (state) => {
      ensureTrendingState(state);
      state.trending.items = [];
      state.trending.loading = false;
      state.trending.error = null;
      state.trending.lastUpdated = null;
    },
    discardChanges: (state) => {
      state.temporaryOrder = [];
      state.hasUnsavedChanges = false;
    },
    debugFeed: (state) => {
      if (process.env.NODE_ENV !== 'production') {
        // Debug summary (non-production only)
        /* eslint-disable no-console */
        console.log('🔍 Feed Debug Info:');
        console.log('Total items:', state.items.length);
        console.log('News items:', state.items.filter(item => item.type === 'news').length);
        console.log('Movie items:', state.items.filter(item => item.type === 'movie').length);
        console.log('Music items:', state.items.filter(item => item.type === 'music').length);
        console.log('Social items:', state.items.filter(item => item.type === 'social').length);
        const urls = state.items.map(item => item.url).filter(url => url !== '#');
        const uniqueUrls = new Set(urls);
        console.log('Unique URLs:', uniqueUrls.size, 'Total URLs:', urls.length);
        const titles = state.items.map(item => item.title);
        const uniqueTitles = new Set(titles);
        console.log('Unique titles:', uniqueTitles.size, 'Total titles:', titles.length);
        /* eslint-enable no-console */
      }
    },
    setPaginationLoading: (state, action) => {
      const { contentType, isLoading } = action.payload;
      ensurePaginationState(state);
      state.pagination[contentType].isLoading = isLoading;
    },
    setPaginationHasMore: (state, action) => {
      const { contentType, hasMore } = action.payload;
      ensurePaginationState(state);
      state.pagination[contentType].hasMore = hasMore;
    },
    incrementPaginationPage: (state, action) => {
      const contentType = action.payload;
      ensurePaginationState(state);
      state.pagination[contentType].currentPage += 1;
    },
    updatePaginationTotal: (state, action) => {
      const { contentType, totalLoaded } = action.payload;
      ensurePaginationState(state);
      state.pagination[contentType].totalLoaded = totalLoaded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsContent.fulfilled, (state, action) => {
        state.loading = false;
        const validItems = (action.payload || []).filter(item => item && item.id);
        const newItems = filterNewItems(state.items, validItems);
        state.items = [...state.items, ...newItems];
        state.items = removeDuplicates(state.items);
        state.hasInitialData = true;
        state.lastUpdated = new Date().toISOString();
        ensurePaginationState(state);
        state.pagination.news.totalLoaded += newItems.length;
      })
      .addCase(fetchNewsContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
      .addCase(fetchMovieContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieContent.fulfilled, (state, action) => {
        state.loading = false;
        const validItems = (action.payload || []).filter(item => item && item.id);
        const newItems = filterNewItems(state.items, validItems);
        state.items = [...state.items, ...newItems];
        state.items = removeDuplicates(state.items);
        state.hasInitialData = true;
        state.lastUpdated = new Date().toISOString();
        ensurePaginationState(state);
        state.pagination.movie.totalLoaded += newItems.length;
      })
      .addCase(fetchMovieContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(fetchMusicContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMusicContent.fulfilled, (state, action) => {
        state.loading = false;
        const validItems = (action.payload || []).filter(item => item && item.id);
        const newItems = filterNewItems(state.items, validItems);
        state.items = [...state.items, ...newItems];
        state.items = removeDuplicates(state.items);
        state.hasInitialData = true;
        state.lastUpdated = new Date().toISOString();
        ensurePaginationState(state);
        state.pagination.music.totalLoaded += newItems.length;
      })
      .addCase(fetchMusicContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch music';
      })
      .addCase(fetchSocialContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialContent.fulfilled, (state, action) => {
        state.loading = false;
        const validItems = (action.payload || []).filter(item => item && item.id);
        const newItems = filterNewItems(state.items, validItems);
        state.items = [...state.items, ...newItems];
        state.items = removeDuplicates(state.items);
        state.hasInitialData = true;
        state.lastUpdated = new Date().toISOString();
        ensurePaginationState(state);
        state.pagination.social.totalLoaded += newItems.length;
      })
      .addCase(fetchSocialContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch social posts';
      })
      .addCase(fetchTrendingContent.pending, (state) => {
        ensureTrendingState(state);
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        ensureTrendingState(state);
        state.trending.loading = false;
        state.trending.error = null;
        const validItems = (action.payload || []).filter(item => item && item.id);
        state.trending.items = removeDuplicates(validItems);
        state.trending.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        ensureTrendingState(state);
        state.trending.loading = false;
        state.trending.error = action.error.message || 'Failed to fetch trending content';
      });
  },
});

export const {
  setLoading,
  setError,
  setFeedItems,
  addFeedItems,
  removeFeedItem,
  clearFeed,
  reorderItems,
  setCustomOrder,
  clearCache,
  markAsUnsaved,
  saveChanges,
  discardChanges,
  debugFeed,
  setPaginationLoading,
  setPaginationHasMore,
  incrementPaginationPage,
  updatePaginationTotal,
  setTrendingLoading,
  setTrendingError,
  clearTrending,
} = feedSlice.actions;

export default feedSlice.reducer;


