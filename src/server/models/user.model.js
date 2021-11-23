const Mongoose = require('mongoose')

// User schema, can be modified easily

const userSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastLoginDate: {
        type: Date
    },
    joinedRooms: {
        type: []
    },
    interests: {
        type: []
    }
})

module.exports = Mongoose.model('User', userSchema)