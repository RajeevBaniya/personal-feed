import { useCallback } from 'react';

export function useDragDetection() {
  const findDropTarget = useCallback((point, currentIndex) => {
    const allCards = document.querySelectorAll('[data-drag-index]');
    let dropCard = null;
    let minDistance = Infinity;

    allCards.forEach(card => {
      const cardIndex = parseInt(card.getAttribute('data-drag-index') || '0');
      if (cardIndex !== currentIndex) {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(point.x - cardCenterX, 2) + 
          Math.pow(point.y - cardCenterY, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          dropCard = card;
        }
      }
    });

    if (dropCard) {
      const targetIndex = parseInt(dropCard.getAttribute('data-drag-index') || '0');
      return targetIndex !== currentIndex ? targetIndex : null;
    }
    return null;
  }, []);

  return { findDropTarget };
}
