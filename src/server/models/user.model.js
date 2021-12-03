const Mongoose = require('mongoose')

// User schema, can be modified easily

const userSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
        type: [],
        default: () => {return []}
    },
    interests: {
        type: [],
        default: () => {return []}
    },
    profileImageURL: {
        type: String,
        required: true,
        default: "./images/userdefault.jpg"
    },
    
})

const model = Mongoose.model('User', userSchema)
model.expose = function(user) {
    return {
        name: user.name,
        username: user.username
    }
}

module.exports = model

