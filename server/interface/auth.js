const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const { JWT_SECRET } = require('../config/config')
const { emailLoginAuthJson } = require('../lib/json_wrappers')

module.exports = { 
    login: async (email, password) => {
        const user = await User.findOne({ email })

        if (!user) 
            throw new Error(`${email} is not registered`)

        if (user.deleted_on) 
            throw new Error('User deleted')
        
        const match = await bcrypt.compare(password, user.password)
        
        if (match) {
            const signed_jwt = await jwt.sign({ _id: user._id, email: email }, JWT_SECRET, { expiresIn: '1d' })
            return emailLoginAuthJson(signed_jwt, user)
        } else {
            throw new Error(`Error authenticating ${email}`)
        }
    }
}