const Mongoose = require('mongoose')

// Room schema
// Should we create an ID? (Mongoose creates a unique ID)

const roomSchema = new Mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    attendees: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true,
        default: "./images/bookdefault.jfif"
    }
})

const model = Mongoose.model('Room', roomSchema)

module.exports = model