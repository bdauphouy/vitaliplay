const withPWA = require('next-pwa')

module.exports = withPWA({
  images: {
    domains: ['api.vitaliplay.fr'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/site',
      },
      {
        source: '/notre-solution',
        destination: '/site/notre-solution',
      },
      {
        source: '/abonnements',
        destination: '/site/abonnements',
      },
      {
        source: '/contact',
        destination: '/site/contact',
      },
    ]
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
})
