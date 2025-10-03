/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'techcrunch.com', port: '', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'cdn.arstechnica.net', port: '', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'platform.theverge.com', port: '', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'image.tmdb.org', port: '', pathname: '/t/p/**' },
      { protocol: 'https', hostname: 'i.scdn.co', port: '', pathname: '/image/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: '**', port: '', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;


