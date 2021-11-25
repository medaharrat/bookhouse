'use strict'

// External Modules
const express = require('express')
const passport = require('passport')

// Create router
const router = express.Router()

// User Schema
const User = require('../models/user.model')

// Register local
router.post("/signup" , async (req , res) =>
{
    const UserBySchema = new User({
        username: `${req.body.firstname.substr(1, 3)}-${req.body.lastname.substr(1, 3)}`,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        registerDate: Date.now(),
        lastLoginDate: null,
        joinedRooms: [],
        interests: req.body.interests
    })
    try {
        // Succesfully created object
        await User.register(UserBySchema, req.body.password, function(err, user) {
            if (err) {
                res.send(err)
            }
            res.status(200).json(user)
            passport.authenticate('local')(req, res, function () {
                res.status(200)
            });
        });

    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.post("/login", async (req, res) => {
    try {
        passport.authenticate('local')(req, res, function () {
            res.status(200).json(res)
        });
        
    } catch (error) {
        res.status(500).send({message: error.message})
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