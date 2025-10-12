import React from 'react';
import DraggableGrid from '@/components/drag-drop/DraggableGrid';

export default function DraggableFeed({ items, onReorder, onItemAction }) {
  return (
    <DraggableGrid
      items={items}
      onReorder={onReorder}
      onItemAction={onItemAction}
      section="feed"
    />
  );
}



