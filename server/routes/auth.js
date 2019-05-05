const User = require('../models/User')

const { success, fail } = require('../lib/json_wrappers')
const { login } = require('../interface/auth')

module.exports = (app) => {
    app.post('/api/auth/signup', async (req, res) => {
        try {
            const new_user = await User.create(req.body)
            success(res, new_user)
        } catch (err) {
            fail(res, err)
        }
    })

    app.post('/api/auth/login', async (req, res) => {
        const { email, password } = req.body
        try {
            const auth_res = await login(email, password)
            success(res, auth_res)
        } catch (err) {
            fail(res, err)
        }
    })
}
