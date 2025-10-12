function hashToId(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function generateSocialId(id, title, author) {
  const key = `${id}|${title}|${author}`;
  return `social-${hashToId(key)}`;
}

/**
 * Fetch social posts from local JSON
 * @returns {Promise<Array<object>>}
 */
export const fetchSocialPosts = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch('/data/social-posts.json');
    if (!response.ok) {
      throw new Error('Failed to fetch social posts');
    }

    const posts = await response.json();

    const postsWithUniqueIds = posts.map(post => ({
      ...post,
      id: generateSocialId(post.id, post.title, post.author)
    }));

    return [...postsWithUniqueIds].sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error fetching social posts:', error);
    return [];
  }
};

/**
 * Search social posts by query
 * @param {string} query
 * @returns {Promise<Array<object>>}
 */
export const searchSocialPosts = async (query) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));

    const response = await fetch('/data/social-posts.json');
    if (!response.ok) {
      throw new Error('Failed to fetch social posts');
    }

    const posts = await response.json();
    const searchQuery = query.toLowerCase();

    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      post.author.toLowerCase().includes(searchQuery)
    );

    return filteredPosts.map(post => ({
      ...post,
      id: generateSocialId(post.id, post.title, post.author)
    }));
  } catch (error) {
    console.error('Error searching social posts:', error);
    return [];
  }
};


