/**
 * Utility functions for content deduplication (JavaScript version)
 */

/**
 * Check if two content items are duplicates based on multiple criteria
 * @param {object} item1
 * @param {object} item2
 * @returns {boolean}
 */
export const areItemsDuplicates = (item1, item2) => {
  if (item1.id === item2.id) {
    return true;
  }

  if (item1.url && item2.url && item1.url === item2.url && item1.url !== '#') {
    return true;
  }

  if (item1.title === item2.title && item1.type === item2.type) {
    switch (item1.type) {
      case 'news':
        if (item1.source === item2.source) {
          const time1 = new Date(item1.publishedAt).getTime();
          const time2 = new Date(item2.publishedAt).getTime();
          const timeDiff = Math.abs(time1 - time2);
          if (timeDiff < 3600000) {
            return true;
          }
        }
        break;
      case 'movie':
        if (item1.rating === item2.rating && item1.publishedAt === item2.publishedAt) {
          return true;
        }
        break;
      case 'music':
        if (item1.artist === item2.artist && item1.album === item2.album) {
          return true;
        }
        break;
      case 'social':
        if (item1.author === item2.author && item1.platform === item2.platform) {
          return true;
        }
        break;
    }
  }

  return false;
};

/**
 * Remove duplicates from an array of content items
 * @param {Array<object>} items
 * @returns {Array<object>}
 */
export const removeDuplicates = (items) => {
  const seen = new Set();
  const uniqueItems = [];

  for (const item of items) {
    if (seen.has(item.id)) {
      continue;
    }

    const isDuplicate = uniqueItems.some(existingItem =>
      areItemsDuplicates(item, existingItem)
    );

    if (!isDuplicate) {
      seen.add(item.id);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
};

/**
 * Merge two arrays of content items, removing duplicates
 * @param {Array<object>} existingItems
 * @param {Array<object>} newItems
 * @returns {Array<object>}
 */
export const mergeWithoutDuplicates = (existingItems, newItems) => {
  const allItems = [...existingItems, ...newItems];
  return removeDuplicates(allItems);
};

/**
 * Check if a new item already exists in the existing items array
 * @param {Array<object>} existingItems
 * @param {object} newItem
 * @returns {boolean}
 */
export const itemExists = (existingItems, newItem) => {
  return existingItems.some(existingItem => areItemsDuplicates(existingItem, newItem));
};

/**
 * Filter out items that already exist in the existing array
 * @param {Array<object>} existingItems
 * @param {Array<object>} newItems
 * @returns {Array<object>}
 */
export const filterNewItems = (existingItems, newItems) => {
  return newItems.filter(newItem => !itemExists(existingItems, newItem));
};


