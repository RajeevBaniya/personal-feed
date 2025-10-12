import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DraggableContentCard from './DraggableContentCard';

export default function DraggableContentSection({
  title,
  icon,
  items,
  type,
  maxItems = 5,
  onItemAction,
  onReorder,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const filteredItems = type === 'all' ? items : items.filter((item) => item.type === type);
  const displayItems = filteredItems.slice(0, maxItems);

  if (displayItems.length === 0) {
    return null;
  }

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleReorder = (dragIndex, hoverIndex) => {
    onReorder(dragIndex, hoverIndex);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {icon} {title} ({filteredItems.length})
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          Drag to reorder
        </div>
      </div>
      
      <motion.div 
        className="space-y-4"
        layout
      >
        <AnimatePresence>
          {displayItems.map((item, index) => (
            <motion.div
              key={`${title}-${item.id}-${index}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <DraggableContentCard
                item={item}
                onAction={onItemAction}
                index={index}
                section={typeof type === 'string' ? String(type) : 'all'}
                onReorder={(dragIndex, hoverIndex) => handleReorder(dragIndex, hoverIndex)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}


