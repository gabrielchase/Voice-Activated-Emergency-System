const mongoose = require('mongoose')
const { hashPassword } = require('../lib/auth')

let UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String },
    username: { type: String },
    phone_number: { type: String },
    
    password: { type: String },

    created_on: { type: Date, default: Date.now },
    modified_on: { type: Date }
})

UserSchema.statics.create = async function ({ email, name, username, phone_number, password }) {
    const hashed_password = await hashPassword(password)
    const user = new this({ 
        email, name, username, phone_number,
        password: hashed_password 
    })
    await user.save()
    console.log('new user: ', user)
    return {
        _id: user._id,
        email, name, username, phone_number,
        created_on: user.created_on
    }
}

module.exports = mongoose.model('User', UserSchema)
