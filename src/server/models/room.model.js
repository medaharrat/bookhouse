const Mongoose = require('mongoose')

// Room schema
const RoomSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'] 
    },
    book: {
        type: Object,
        required: [true, 'Book is required'] 
    },
    attendees: {
        type: Array,
        required: true
    }
}, {collection: 'rooms'})

const model = Mongoose.model('Room', RoomSchema)

module.exports = model