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
          // {
          //   type: 'cookie',
          //   key: 'auth',
          //   value: 'false',
          // },
          {
            type: 'query',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/notre-solution',
        destination: '/website/notre-solution',
        has: [
          // {
          //   type: 'cookie',
          //   key: 'auth',
          //   value: 'false',
          // },
          {
            type: 'query',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/abonnement',
        destination: '/website/abonnement',
        has: [
          // {
          //   type: 'cookie',
          //   key: 'auth',
          //   value: 'false',
          // },
          {
            type: 'query',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/contact',
        destination: '/website/contact',
        has: [
          // {
          //   type: 'cookie',
          //   key: 'auth',
          //   value: 'false',
          // },
          {
            type: 'query',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/',
        destination: '/account',
        has: [
          // {
          //   type: 'cookie',
          //   key: 'auth',
          //   value: 'true',
          // },
          {
            type: 'query',
            key: 'auth',
            value: 'true',
          },
        ],
      },
    ]
  },
}
