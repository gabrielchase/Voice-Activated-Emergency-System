const Emergency = require('../models/Emergency')

const { success, fail } = require('../lib/json_wrappers')
const { checkJWTUser } = require('../middleware/jwt')
const { sendFCM } = require('../interface/fcm')

module.exports = (app, io) => {
    app.post('/api/emergency', async (req, res) => {
        try {
            console.log('creating new emergency: ', req.body)
            const new_emergency = await Emergency.create(req.body)
            await io.emit('emergency', new_emergency)
            await sendFCM(new_emergency)
            success(res, new_emergency)
        } catch (err) {
            fail(res, err)
        }
    })

    app.get('/api/emergencies', async (req, res) => {
        try {
            const emergencies = await Emergency.find({}).sort('-created_on')
            success(res, emergencies)
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
