'use strict'

// External Modules
const Express = require('express')

// Create router
const router = Express.Router()

// User Schema
const Book = require('../models/book.model')

// Get all books
router.get("/" , async (req , res) => {
    let books = []
    try {
        // Find all books
        books = await Book.find({}) 

        if (books == null) {
            return res.status(404).send({ error: 'Error retreiving books' })
        }
        res.status(201).send({ books: books })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
})
module.exports = router
