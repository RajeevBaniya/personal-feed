import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: [],
  isSearching: false,
  searchHistory: [],
  activeFilters: {
    type: null,
    sortBy: 'relevance',
  },
};

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async (query, { getState }) => {
    const state = getState();
    const { items } = state.feed;
    const { activeFilters } = state.search;

    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    const filteredItems = items.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.source.toLowerCase().includes(searchTerm) ||
        (item.author && item.author.toLowerCase().includes(searchTerm)) ||
        (item.artist && item.artist.toLowerCase().includes(searchTerm));

      const matchesType = !activeFilters.type || item.type === activeFilters.type;

      return matchesQuery && matchesType;
    });

    switch (activeFilters.sortBy) {
      case 'date':
        filteredItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'title':
        filteredItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'relevance':
      default:
        filteredItems.sort((a, b) => {
          const aRelevance = a.title.toLowerCase().includes(searchTerm) ? 2 : 1;
          const bRelevance = b.title.toLowerCase().includes(searchTerm) ? 2 : 1;
          return bRelevance - aRelevance;
        });
        break;
    }

    return filteredItems;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    addToSearchHistory: (state, action) => {
      const q = String(action.payload || '').trim();
      if (q && !state.searchHistory.includes(q)) {
        state.searchHistory.unshift(q);
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    setActiveFilters: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.isSearching = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.isSearching = false;
        state.results = action.payload;
      })
      .addCase(performSearch.rejected, (state) => {
        state.isSearching = false;
        state.results = [];
      });
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setIsSearching,
  addToSearchHistory,
  clearSearchHistory,
  setActiveFilters,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;


