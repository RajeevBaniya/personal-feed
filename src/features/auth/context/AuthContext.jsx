'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuthService } from '../services/firebase-auth';

// Create context with undefined default value
const AuthContext = createContext(undefined);

/**
 * Hook to use the auth context
 * @returns {Object} Auth context value
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/**
 * Provider component for auth context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = firebaseAuthService.getAuth();

  // Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setLoading(false);
      try {
        // Update session cookie
        fetch('/api/auth/session', { 
          method: 'POST', 
          body: JSON.stringify({ isAuth: Boolean(u) }) 
        });
      } catch (err) {
        console.error('Failed to update session:', err);
      }
    });
    
    // Cleanup subscription
    return () => unsub();
  }, [auth]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    loading,
    login: firebaseAuthService.login,
    signup: firebaseAuthService.signup,
    logout: firebaseAuthService.logout,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
