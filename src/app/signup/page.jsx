'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignupPage() {
  const { user, loading, signup } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains('dark');
    root.classList.add('dark');
    return () => { if (!wasDark) root.classList.remove('dark'); };
  }, []);

  useEffect(() => {
    if (!loading && user) router.replace('/feed');
    if (!loading && !user) {
      const next = params.get('callbackUrl');
      router.replace('/?auth=signup' + (next ? `&callbackUrl=${encodeURIComponent(next)}` : ''));
    }
  }, [loading, user, router, params]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email.trim(), password, name.trim());
      router.replace('/feed');
    } catch (err) {
      const message = err?.message || 'Failed to sign up';
      setError(message);
    }
  };

  if (loading) return <main className="p-6">Loading…</main>;
  return null;
}