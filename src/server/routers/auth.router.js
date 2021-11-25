'use strict'

// External Modules
const Express = require('express')


// Create router
const router = Express.Router()

// User Schema
const User = require('../models/user.model')


// Register local
router.post("/signup" , async (req , res) =>
{
    const UserBySchema = new User({
        name: req.body.name,
        lastLoginDate: null,
        joinedRooms: [],
        interests: req.body.interests,
        password: req.body.password     //TODO encrypt
    })
    try {
        const newUser = await UserBySchema.save()
        // Succesfully created object
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})





// Export module
module.exports = router