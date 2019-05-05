const env = process.env.NODE_ENV || 'development'
const config_file = require(`./${env}.json`)
console.log('Config file: ', config_file)

let config = {}

try {
    config.DB_URL = process.env.DB_URL || config_file.DB_URL || 3000
    config.PORT = process.env.PORT || config_file.PORT 
    config.SALT_ROUNDS = process.env.SALT_ROUNDS || config_file.SALT_ROUNDS
    config.JWT_SECRET = process.env.JWT_SECRET || config_file.JWT_SECRET
    config.JWT_EXPIRATION = process.env.JWT_EXPIRATION || config_file.JWT_EXPIRATION
} catch (err) {
    console.log('Failed to load configuration file', err.message)
}   

module.exports = config