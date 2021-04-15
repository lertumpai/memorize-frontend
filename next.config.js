const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_URL,
    SERVER_UPLOAD_URL: process.env.SERVER_UPLOAD_URL,
    SERVER_URL_PATH: process.env.SERVER_URL_PATH,
    LOCAL_STORAGE_KEY: process.env.LOCAL_STORAGE_KEY,
    SERVER_UPLOAD_IMAGE_PATH: process.env.SERVER_UPLOAD_IMAGE_PATH,
    SERVER_UPLOAD_IMAGE_PATH_PROFILE: process.env.SERVER_UPLOAD_IMAGE_PATH_PROFILE,
    SERVER_UPLOAD_IMAGE_PATH_ARTICLE: process.env.SERVER_UPLOAD_IMAGE_PATH_ARTICLE,
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
