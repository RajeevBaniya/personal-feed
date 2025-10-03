'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { AuthProvider } from '@/features/auth/context/AuthContext';

/**
 * Application providers wrapper
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}