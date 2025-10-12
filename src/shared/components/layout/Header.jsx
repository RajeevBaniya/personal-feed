'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleDarkMode } from '@/store/slices/preferencesSlice';
import { useAuth } from '@/features/auth/context/AuthContext';
import SearchBar from '@/components/search/SearchBar'; // Will be moved to shared later
import Icon from '@/shared/components/ui/Icon';

export default function Header({ onMenuToggle }) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handle = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <button 
            onClick={onMenuToggle} 
            className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
            aria-label="Toggle sidebar menu"
          >
            <Icon name="menu" size="md" className="text-gray-600 dark:text-white" />
          </button>

          <div className="flex-1 max-w-sm sm:max-w-md lg:max-w-lg mx-2 sm:mx-4">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
            <button 
              onClick={handleDarkModeToggle} 
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Icon name={darkMode ? 'sun' : 'moon'} size="sm" className="text-gray-600 dark:text-white sm:w-5 sm:h-5" />
            </button>

            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setOpen(v => !v)} 
                className="flex items-center space-x-1 sm:space-x-2" 
                aria-haspopup="menu" 
                aria-expanded={open}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    {(user?.displayName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                  </span>
                </div>
                {user?.displayName && (
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] lg:max-w-[140px] truncate">
                    {user.displayName}
                  </span>
                )}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-2 z-50">
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <button 
                    onClick={async () => { 
                      setOpen(false); 
                      await logout(); 
                      router.replace('/'); 
                    }} 
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}