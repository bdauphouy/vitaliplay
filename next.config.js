module.exports = {
  images: {
    domains: ['54.36.101.23'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/account',
  //       has: [
  //         {
  //           type: 'cookie',
  //           key: 'jwt',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/:path*',
  //       destination: '/account/:path*',
  //       has: [
  //         {
  //           type: 'cookie',
  //           key: 'jwt',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/',
  //       destination: '/website',
  //     },
  //     {
  //       source: '/:path*',
  //       destination: '/website/:path*',
  //     },
  //   ]
  // },
}
