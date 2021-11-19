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
        registerDate: Date.now(),
        lastLoginDate: null,
        joinedRooms: [],
        interests: req.body.interests
    })
    try {
        const newUser = await UserBySchema.save()
        // Succesfully created object
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})


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

// Get one user
router.get("/login/:id", getUser, async (req , res) =>
{
    res.status(200).json(res.user)
})


// Delete one user by ID
router.delete("/login/:id" , getUser, async (req , res) =>
{
    try {
        /*User.findByIdAndDelete(req.params.id, function(err, usr) {
            if (err){
                console.log(err)
                res.status(500).send({message: err})
            }
            else{
                console.log("Deleted : ", usr);
                res.status(200).send({message:usr})
            }
        })*/
        await res.user.remove()
        res.status(200).send({message: 'Deleted user'})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})


router.patch("/login/:id" , getUser, async (req , res) =>
{
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.registerDate != null) {
        res.user.registerDate = req.body.registerDate
    }
    if (req.body.lastLoginDate != null) {
        res.user.lastLoginDate = req.body.lastLoginDate
    }
    if (req.body.joinedRooms != null) {
        res.user.joinedRooms = req.body.joinedRooms
    }
    if (req.body.interests != null) {
        res.user.interests = req.body.interests
    }
    try {
        const updatedUser = await res.user.save()
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})


// Middleware for getting user (for clean-code)
async function getUser(req, res, next) {
    let user
    try {
        // Find the user that passed in the URL
        user = await User.findById(req.params.id) 

        // Cannot find user
        if (user == null) {
            return res.status(404).json({message: 'Cannot find user by id: ' + req.params.id})
        }
    } catch (error) {
        // Sth wrong with the server
        return res.status(500).json({message: error.message})
    }
    res.user = user
    next()
}


// Export module
module.exports = router