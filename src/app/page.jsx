'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';

// Feature imports
import LandingPage from '@/features/landing/LandingPage';
import AuthModal from '@/features/auth/components/AuthModal';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  // Redirect to feed if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.replace('/feed');
    }
  }, [loading, user, router]);

  // Auto-open auth modal if URL requests it
  useEffect(() => {
    const authParam = params.get('auth');
    if (authParam === 'signin' || authParam === 'signup') {
      setAuthMode(authParam);
      setModalOpen(true);
    }
  }, [params]);

  // Ensure dark mode for landing page
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains('dark');
    root.classList.add('dark');
    return () => { if (!wasDark) root.classList.remove('dark'); };
  }, []);

  // Handler for opening the auth modal
  const openModal = (mode) => {
    setAuthMode(mode);
    setModalOpen(true);
  };

  if (loading) return <main className="p-6">Loading…</main>;

  return (
    <>
      <LandingPage openAuthModal={openModal} />

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
}