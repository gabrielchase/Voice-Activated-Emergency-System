const Emergency = require('../models/Emergency')

const { success, fail } = require('../lib/json_wrappers')
const { checkJWTUser } = require('../middleware/jwt')

module.exports = (app) => {
    app.post('/api/emergency', async (req, res) => {
        try {
            const new_emergency = await Emergency.create(req.body)
            success(res, new_emergency)
        } catch (err) {
            fail(res, err)
        }
    })

    app.put('/api/emergency/:emergency_id/seen', checkJWTUser, async (req, res) => {
        const { emergency_id } = req.params
        try {
            const seen_emergency = await Emergency.seen(emergency_id, req.user)
            success(res, seen_emergency)
        } catch (err) {
            fail(res, err)            
        }
    })
}
