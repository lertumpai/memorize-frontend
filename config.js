const config = {
  development: {
    base_url: 'http://localhost:5000',
  },
  production: {
    base_url: 'https://new-farm-social.herokuapp.com',
  },
}
const env = process.env.NODE_ENV || 'development'

export default config[env]