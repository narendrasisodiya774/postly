const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: true,
  i18n, // 👈 include this
  images: {
    domains: ['source.unsplash.com', 'picsum.photos'],
  },
};
module.exports = nextConfig;
