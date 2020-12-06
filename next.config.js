const withSass = require('@zeit/next-sass')

const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
}

module.exports = withSass({
  ...nextConfig,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]",
  },
  sassOptions: {
    includePaths: ['styles'],
  },
})
