'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';
import FeedLayout from './layout/FeedLayout';
import FeedContent from './content/FeedContent';

/**
 * Handles routing between different feed sections (main feed, favorites, trending)
 */
export default function FeedPage() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Extract the active section from the URL path
  const routeSection = (pathname || '/feed').split('/')[1] || 'feed';
  const activeSection = routeSection === '' ? 'feed' : routeSection;

  if (!user) {
    return null;
  }

  return (
    <FeedLayout>
      <FeedContent activeSection={activeSection} />
    </FeedLayout>
  );
}