const mongoose = require('mongoose')

let EmergencySchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    location_name: { type: String },
    seen: [mongoose.Mixed],

    created_on: { type: Date, default: Date.now }
})

EmergencySchema.statics.create = async function ({ latitude, longitude, location_name }) {
    const emergency = new this({ latitude, longitude, location_name })
    await emergency.save()
    return emergency
}

EmergencySchema.statics.seen = async function (emergency_id, user) {
    const emergency = await this.findById(emergency_id)
    const user_id = user._id

    for (const obj of emergency.seen) {
        if (obj.user_id === user_id) {
            return obj 
        }
    }

    let seen_data = {
        user_id, 
        date: new Date()
    }

    emergency.seen.push(seen_data)

    await emergency.save()

    return seen_data
}

module.exports = mongoose.model('Emergency', EmergencySchema)
