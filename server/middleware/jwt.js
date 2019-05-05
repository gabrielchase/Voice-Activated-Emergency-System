const jwt = require('jsonwebtoken')
const { fail } = require('../lib/json_wrappers')

const checkJWTExpiration = async (exp) => {
    let exp_str = exp.toString()
    const now_str = Date.now().toString()
    const padLength = now_str.length
    
    exp_str = exp_str.padEnd(padLength, 0)
    exp = parseInt(exp_str)

    if (Date.now() > exp) 
        throw new Error('JWT has expired')

    return true
}

module.exports = {
    checkJWTUser: async (req, res, next) => {
        try {            
            const token = req.headers.authorization.split(' ')[1]
            const user = await jwt.decode(token)

            await checkJWTExpiration(user.exp)

            if (user) {
                req.user = user
                return next() 
            } else {
                throw new Error('Invalid JWT')
            }   
        } catch (err) {
            fail(res, err)
        }
    }
}