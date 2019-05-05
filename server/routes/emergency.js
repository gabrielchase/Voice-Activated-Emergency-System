const Emergency = require('../models/Emergency')

const { success, fail } = require('../lib/json_wrappers')

module.exports = (app) => {
    app.post('/api/emergency', async (req, res) => {
        try {
            const new_emergency = await Emergency.create(req.body)
            success(res, new_emergency)
        } catch (err) {
            fail(res, err)
        }
    })
}
