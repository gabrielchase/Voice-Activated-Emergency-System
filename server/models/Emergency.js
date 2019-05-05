const mongoose = require('mongoose')

let EmergencySchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    
    created_on: { type: Date, default: Date.now }
})

EmergencySchema.statics.create = async function ({ latitude, longitude }) {
    const emergency = new this({ latitude, longitude })
    await emergency.save()
    return emergency
}

module.exports = mongoose.model('Emergency', EmergencySchema)
