const bcrypt = require('bcryptjs')
const { SALT_ROUNDS } = require('../config/config')

module.exports = {
    hashPassword: async (password) => {
        return await bcrypt.hash(password, SALT_ROUNDS)
    }
}
