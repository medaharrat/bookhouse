const Mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'] 
    },
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
})

UserSchema.plugin(passportLocalMongoose);

module.exports = Mongoose.model('User', UserSchema)