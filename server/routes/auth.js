const User = require('../models/User')


const { success, fail } = require('../lib/json_wrappers')

module.exports = (app) => {
    app.post('/api/auth/signup', async (req, res) => {
        try {
            const new_user = await User.create(req.body)
            success(res, new_user)
        } catch (err) {
            fail(res, err)
        }
    })
}
