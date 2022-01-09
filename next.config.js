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
        source: '/notre-solution',
        destination: '/website/notre-solution',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/abonnement',
        destination: '/website/abonnement',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'false',
          },
        ],
      },
      {
        source: '/contact',
        destination: '/website/contact',
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
        source: '/en-direct',
        destination: '/account/en-direct',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'true',
          },
        ],
      },
      {
        source: '/seances',
        destination: '/account/seances',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'true',
          },
        ],
      },
      {
        source: '/conferences-de-sante',
        destination: '/account/conferences-de-sante',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'true',
          },
        ],
      },
      {
        source: '/mon-espace-sante',
        destination: '/account/mon-espace-sante',
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
