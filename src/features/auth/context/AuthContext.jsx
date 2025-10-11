'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuthService } from '../services/firebase-auth';

const AuthContext = createContext(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = firebaseAuthService.getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setLoading(false);
      try {
        fetch('/api/auth/session', { 
          method: 'POST', 
          body: JSON.stringify({ isAuth: Boolean(u) }) 
        });
      } catch (err) {
        console.error('Failed to update session:', err);
      }
    });
    return () => unsub();
  }, [auth]);

  const value = useMemo(() => ({
    user,
    loading,
    login: firebaseAuthService.login,
    signup: firebaseAuthService.signup,
    logout: firebaseAuthService.logout,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
