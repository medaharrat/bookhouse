const Mongoose = require('mongoose')

// Room schema
// Should we create an ID? (Mongoose creates a unique ID)

const roomSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    book: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    attendees: {
        type: []
    }
})

const model = Mongoose.model('Room', roomSchema)

module.exports = model