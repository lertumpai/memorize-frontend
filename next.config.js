const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_URL,
    SERVER_URL_PATH: process.env.SERVER_URL_PATH,
    LOCAL_STORAGE_KEY: process.env.LOCAL_STORAGE_KEY,
    SERVER_UPLOAD_IMAGE_URL: process.env.SERVER_UPLOAD_IMAGE_URL,
    SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH: process.env.SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH,
    SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH: process.env.SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH,
  },
}
console.log('nextConfig', nextConfig)
module.exports = withCss(
  withSass({
    ...nextConfig,
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]",
    },
  }),
)
