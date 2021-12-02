'use strict'

// External Modules
const Express = require('express')

// Create router
const router = Express.Router()

// User Schema
const Book = require('../models/book.model')
const Room = require('../models/room.model')

// Return all Books, that has a room assignet to it
router.get("/", async (req , res) => {
    try {
        const allBook = await Book.find()
        console.log(allBook[8]._id)
        
        res.status(200).json(allBook)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

router.post("/create", async (req, res) => {
    const { title, author, cover} = req.body;

    const book = new Book({
        title: title,
        author: author,
        cover: cover
    })

    try {
        const newBook = await book.save()
        // Succesfully created object
        res.status(201).send({ok: 1, message: "Book has been created"})
    } catch (error) {
        res.status(400).send({ok: 0, message: error.message})
    }
})

module.exports = router