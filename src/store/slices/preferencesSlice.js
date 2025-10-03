import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['technology', 'sports', 'business'],
  darkMode: false,
  language: 'en',
  notifications: true,
  viewMode: 'normal',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat !== action.payload);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  updateCategories,
  addCategory,
  removeCategory,
  setLanguage,
  toggleNotifications,
  setViewMode,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;


