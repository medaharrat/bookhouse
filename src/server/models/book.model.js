const Mongoose = require('mongoose')

// Book schema
// Should we create an ID? (Mongoose creates a unique ID)

const bookSchema = new Mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true,
        default: "./images/bookdefault.jfif"
    }
})

const model = Mongoose.model('Book', bookSchema)

module.exports = model