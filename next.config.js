const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_URL,
  },
}

module.exports = withCss(
  withSass({
    ...nextConfig,
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]",
    },
    sassOptions: {
      includePaths: ['styles'],
    },
  }),
)
