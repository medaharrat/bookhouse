'use strict'

// External Modules
const Express = require('express')


// Create router
const router = Express.Router()

// User Schema
const User = require('../models/user.model')


// For tests, get all the users
router.get("/login" , async (req , res) =>
{
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

module.exports = router