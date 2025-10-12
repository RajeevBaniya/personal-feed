'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { saveChanges } from '@/store/slices/feedSlice';
import Icon from '@/shared/components/ui/Icon';

/**
 * Button component for saving changes to feed layout
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
export default function SaveButton({ className = '' }) {
  const dispatch = useAppDispatch();
  const { hasUnsavedChanges } = useAppSelector((state) => state.feed);

  const handleSave = () => {
    dispatch(saveChanges());
  };

  return (
    <motion.button
      onClick={handleSave}
      disabled={!hasUnsavedChanges}
      className={`
        px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium duration-200
        ${hasUnsavedChanges
          ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-fuchsia-500 text-white cursor-pointer'
          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }
        ${className}
      `}
      whileHover={{}}
      whileTap={{}}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Icon name="save" size="sm" />
        <span className="hidden xs:inline">{hasUnsavedChanges ? 'Save Changes' : 'No Changes'}</span>
        <span className="xs:hidden">{hasUnsavedChanges ? 'Save' : 'Saved'}</span>
      </div>
    </motion.button>
  );
}
