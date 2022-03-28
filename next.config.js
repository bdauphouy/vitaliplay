const withPWA = require("next-pwa");

module.exports = withPWA({
    images: {
      domains: ['test.vitaliplay.eltha.fr'],
    },
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/site',
        },
        {
          source: '/:path*',
          destination: '/site/:path*',
        },
      ]
    },
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
  });