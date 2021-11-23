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
    /*res.render("main",
    {
        page: './room',
        config: req.config.socket
    })*/
    //console.log("Server says Hi!")
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

// Get one User
router.get("/login/:id", getUser, async (req , res) =>
{
    res.status(200).json(res.user)
})

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


// Middleware for getting user (for clean-code)
async function getUser(req, res, next) {
    let user
    try {
        // Find the user that passed in the URL
        user = await User.findById(req.params.id) 

        // Cannot find subscriber
        if (user == null) {
            return res.status(404).json({message: 'Cannot find subscriber by id: ' + req.params.id})
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