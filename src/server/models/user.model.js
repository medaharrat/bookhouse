const Mongoose = require('mongoose')

// User schema, can be modified easily

const userSchema = new Mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
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
}, { collection: 'users'})

module.exports = Mongoose.model('User', userSchema)