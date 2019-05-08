const env = process.env.NODE_ENV || 'development'
console.log('ENV: ', process.env.NODE_ENV, env)
const config_file = require(`./${env}.json`)
console.log('Config file: ', config_file)

let config = {}

try {
    config.ROOT_URL = process.env.ROOT_URL || config_file.ROOT_URL 
    config.API_URL = process.env.API_URL || config_file.API_URL 
    config.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || config_file.GOOGLE_API_KEY 
} catch (err) {
    console.log('Failed to load configuration file', err.message)
}   

module.exports = config