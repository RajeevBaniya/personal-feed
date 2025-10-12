import React from 'react';
import ViewToggle from '@/shared/components/ui/ViewToggle';
import SaveButton from '@/shared/components/ui/SaveButton';

export default function FeedHeader({ title, showSave }) {
  const containerJustify = title ? 'justify-between' : 'justify-end';
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center ${containerJustify} mb-4 sm:mb-6 gap-3 sm:gap-4`}>
      {title ? (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      ) : null}
      <div className="flex flex-row items-center justify-end gap-2 sm:gap-4">
        <ViewToggle />
        {showSave && <SaveButton />}
      </div>
    </div>
  );
}


