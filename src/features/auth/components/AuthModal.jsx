'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import useAuthForm from '../hooks/useAuthForm';

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }) {
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/feed';
  
  const {
    formData,
    error,
    showPassword,
    suggestSignup,
    handleSubmit,
    handleInputChange,
    togglePasswordVisibility
  } = useAuthForm(mode, onSwitchMode, callbackUrl);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center">
              <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4" role="alert">
              {error} {suggestSignup && (<><button onClick={() => onSwitchMode('signup')} className="underline">Create an account</button></>)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <label className="block">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Name</span>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </label>
            )}
            
            <label className="block">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</span>
              <input
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </label>
            
            <label className="block">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Password</span>
              <div className="mt-1 relative">
                <input
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 my-auto text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white rounded-lg px-4 py-2.5 font-medium shadow-sm transition-all"
              disabled={mode === 'signup' ? (!formData.name || !formData.email || !formData.password) : (!formData.email || !formData.password)}
            >
              {mode === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {mode === 'signin' ? (
                <>No account? <button type="button" onClick={() => onSwitchMode('signup')} className="text-blue-600 hover:underline">Create one</button></>
              ) : (
                <>Already have an account? <button type="button" onClick={() => onSwitchMode('signin')} className="text-blue-600 hover:underline">Sign in</button></>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}