'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [suggestSignup, setSuggestSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!loading && user) {
      const next = params.get('callbackUrl') || '/feed';
      router.replace(next);
    }
    if (!loading && !user) {
      const next = params.get('callbackUrl');
      router.replace('/?auth=signin' + (next ? `&callbackUrl=${encodeURIComponent(next)}` : ''));
    }
  }, [loading, user, router, params]);

  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains('dark');
    root.classList.add('dark');
    return () => { if (!wasDark) root.classList.remove('dark'); };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email.trim(), password);
    } catch (err) {
      const code = err?.code || err?.message || '';
      if (typeof code === 'string' && (code.includes('auth/invalid-credential') || code.includes('auth/user-not-found'))) {
        setError('We could not find an account with these credentials.');
        setSuggestSignup(true);
      } else {
        const message = err?.message || 'Failed to sign in';
        setError(message);
        setSuggestSignup(false);
      }
    }
  };

  if (loading) return <main className="p-6">Loading…</main>;
  return null;
}