const Mongoose = require('mongoose')

// User schema, can be modified easily

const userSchema = new Mongoose.Schema({
    name: {
        type: String
    },
    registerDate: {
        type: Date,
        required: true,
        default: () => {return Date.now()}
    },
    lastLoginDate: {
        type: Date
    },
    joinedRooms: {
        type: []
    },
    interests: {
        type: []
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        required: true,
        default: "./images/userdefault.jpg"
    },
    username: {
        type: String,
        required: true
    }
})

const model = Mongoose.model('User', userSchema)
model.expose = function(user) {
    return {
        name: user.name,
        username: user.username
    }
}

module.exports = model

