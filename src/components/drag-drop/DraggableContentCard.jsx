import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CONTENT_ICONS, ACTION_TEXTS } from '@/constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useDragDrop } from './DragDropContext';
import Icon from '@/shared/components/ui/Icon';
import { useAutoScroll } from './hooks/useAutoScroll';
import { useDragStyles } from './hooks/useDragStyles';
import { useDragDetection } from './hooks/useDragDetection';

export default function DraggableContentCard({ 
  item, 
  onAction, 
  index, 
  section,
  onReorder,
  onDragStart: externalOnDragStart,
  onDragEnd: externalOnDragEnd
}) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(fav => fav.id === item.id);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { setDraggedItem } = useDragDrop();
  const { startAutoScroll, stopAutoScroll } = useAutoScroll();
  const { findDropTarget } = useDragDetection();
  
  useDragStyles(isDragging);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(item));
  };

  const getIcon = () => {
    switch (item.type) {
      case 'news':
        return CONTENT_ICONS.NEWS;
      case 'movie':
        return CONTENT_ICONS.MOVIE;
      case 'music':
        return CONTENT_ICONS.MUSIC;
      case 'social':
        return CONTENT_ICONS.SOCIAL;
      default:
        return '📄';
    }
  };

  const getActionText = () => {
    switch (item.type) {
      case 'news':
        return ACTION_TEXTS.NEWS;
      case 'movie':
        return ACTION_TEXTS.MOVIE;
      case 'music':
        return ACTION_TEXTS.MUSIC;
      case 'social':
        return ACTION_TEXTS.SOCIAL;
      default:
        return 'View';
    }
  };

  const getMetadata = () => {
    switch (item.type) {
      case 'news':
        return `${item.source} • ${item.readTime ? `${item.readTime} min read` : 'Just now'}`;
      case 'movie':
        return `${item.source} • ${item.rating ? `⭐ ${item.rating}` : 'New Release'}`;
      case 'music':
        return `${item.artist} • ${item.album}`;
      case 'social':
        return `@${item.author} • ${item.platform} • ${item.likes} likes`;
      default:
        return item.source;
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      if (isDragging) {
        startAutoScroll(event.clientY);
      }
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }
    return () => {
      stopAutoScroll();
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, startAutoScroll]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      drag
      dragConstraints={false}
      dragElastic={false}
      dragMomentum={false}
      onDragStart={() => {
        setIsDragging(true);
        setDraggedItem(item, index, section);
        externalOnDragStart?.();
      }}
      onDrag={(event) => {
        if (event && 'clientY' in event && typeof event.clientY === 'number') {
          startAutoScroll(event.clientY);
        }
      }}
      onDragEnd={(event, info) => {
        stopAutoScroll();
        setIsDragging(false);
        setDraggedItem(null, null, null);
        const targetIndex = findDropTarget(info.point, index);
        if (targetIndex !== null) {
          externalOnDragEnd?.(index, targetIndex);
        }
      }}
      style={{}}
      className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden relative cursor-grab active:cursor-grabbing h-80 flex flex-col select-none shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 ${isDragging ? 'scale-105 z-50' : ''}`}
      data-drag-index={index}
      data-drag-section={section}
    >
      <motion.button
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 shadow-sm"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <motion.div animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
          <Icon name="heart" size="sm" className={`transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`} fill={isFavorite ? 'current' : 'none'} />
        </motion.div>
      </motion.button>

      <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-20">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>

      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
        {item.imageUrl && !imageError ? (
          <Image src={item.imageUrl} alt={item.title} width={400} height={192} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 pointer-events-none" onError={() => setImageError(true)} unoptimized={item.imageUrl.startsWith('http')} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">{getIcon()}</div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between pointer-events-none bg-white dark:bg-gray-900">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-3 mb-3">{item.title}</h4>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
          <span className="font-medium">{getMetadata()}</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">{getActionText()}</span>
        </div>
      </div>
    </motion.div>
  );
}