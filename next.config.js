module.exports = {
  images: {
    domains: ['54.36.101.23'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/website',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/:path*',
        destination: '/website/:path*',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/',
        destination: '/account',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'true',
          },
        ],
      },
      {
        source: '/:path*',
        destination: '/account/:path*',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'true',
          },
        ],
      },
    ]
  },
}
