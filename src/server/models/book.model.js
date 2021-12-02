const Mongoose = require('mongoose')

// Book schema
const BookSchema = new Mongoose.Schema({
    title: {
        type: String,
        required:  [true, 'Title is required'] 
    },
    author: {
        type: String,
        required:  [true, 'Author is required'] 
    },
    cover: {
        type: String,
        required: true,
        default: "./img/bookdefault.jpg"
    }
}, {collection: 'books'})

const model = Mongoose.model('Book', BookSchema)

module.exports = model
