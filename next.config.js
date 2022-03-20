module.exports = {
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
}
