import { createContext, useContext, useState, useCallback } from 'react';

// Provides global state for drag-and-drop across sections
const DragDropStateContext = createContext(undefined);

export function DragDropProvider({ children }) {
  const [draggedItem, setDraggedItemState] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedSection, setDraggedSection] = useState(null);

  const setDraggedItem = useCallback((item, index, section) => {
    setDraggedItemState(item);
    setDraggedIndex(index);
    setDraggedSection(section);
  }, []);

  const handleDrop = useCallback((
    targetIndex,
    targetSection,
    onReorder
  ) => {
    if (draggedIndex !== null && draggedSection !== null) {
      onReorder(draggedIndex, targetIndex, draggedSection, targetSection);
    }
    setDraggedItem(null, null, null);
  }, [draggedIndex, draggedSection]);

  return (
    <DragDropStateContext.Provider value={{
      draggedItem,
      draggedIndex,
      draggedSection,
      setDraggedItem,
      handleDrop,
    }}>
      {children}
    </DragDropStateContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(DragDropStateContext);
  if (context === undefined) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}
