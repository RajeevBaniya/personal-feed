'use client';
import { useState, useCallback } from 'react';

/**
 * useModalState
 * Encapsulates modal item state and open/close helpers for content modal.
 * @returns {Object} Modal state and handlers
 * @returns {any} modalItem - The current item displayed in the modal
 * @returns {Function} openModal - Function to open the modal with an item
 * @returns {Function} closeModal - Function to close the modal
 */
export function useModalState() {
  const [modalItem, setModalItem] = useState(null);

  const openModal = useCallback((item) => {
    setModalItem(item);
  }, []);

  const closeModal = useCallback(() => {
    setModalItem(null);
  }, []);

  return { modalItem, openModal, closeModal };
}

export default useModalState;
