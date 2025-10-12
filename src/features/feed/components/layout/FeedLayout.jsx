'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/shared/components/layout/Header';

export default function FeedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-visible">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
      />
      <div className="lg:ml-56 xl:ml-64 flex flex-col min-h-screen overflow-visible">
        <Header onMenuToggle={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}