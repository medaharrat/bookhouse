'use strict'

// External Modules
const Express = require('express')

// Create router
const router = Express.Router()

// User Schema
const Book = require('../models/book.model')

router.get("/", async (req , res) => {
    res.json({message: 'A GET end point, returning all the books that have rooms.'})
})

module.exports = router