module.exports = {
  images: {
    domains: ['54.36.101.23'],
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
}
