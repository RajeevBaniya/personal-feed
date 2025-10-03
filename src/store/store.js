import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import favoritesReducer from './slices/favoritesSlice';
import feedReducer from './slices/feedSlice';
import preferencesReducer from './slices/preferencesSlice';
import searchReducer from './slices/searchSlice';

// Avoid SSR warning: use noop storage on server, real storage in browser
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

const createWebStorage = () => ({
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
});

const storage = typeof window !== 'undefined' ? createWebStorage() : createNoopStorage();


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['preferences', 'favorites', 'feed'],
  version: 6,
  migrate: (state) => {
    if (!state || typeof state !== 'object') {
      return Promise.resolve(state);
    }

    const root = state;
    if (!root.feed) {
      root.feed = {};
    }

    if (!root.feed.trending) {
      root.feed.trending = {
        items: [],
        loading: false,
        error: null,
        lastUpdated: null,
      };
    }

    return Promise.resolve(state);
  },
};

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  feed: feedReducer,
  favorites: favoritesReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);


