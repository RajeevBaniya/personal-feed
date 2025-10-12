'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import Header from '@/shared/components/layout/Header';
import FeedContent from '@/features/feed/components/content/FeedContent';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const routeSection = (pathname || '/feed').split('/')[1] || 'feed';
  const activeSection = routeSection === '' ? 'feed' : routeSection;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (_section) => { /* route-driven; no-op */ };

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/?auth=signin');
    }
  }, [loading, user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-visible">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <div className="lg:ml-56 xl:ml-64 flex flex-col min-h-screen overflow-visible">
        <Header onMenuToggle={toggleSidebar} />
        <FeedContent activeSection={activeSection} />
      </div>
    </div>
  );
}