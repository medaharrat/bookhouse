'use strict'

// External Modules
const express = require('express')
const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"
const bcrypt = require('bcryptjs');
// const passport = require('passport')

// Create router
const router = express.Router()

// User Schema
const User = require('../models/user.model')

// Register local
router.post("/signup" , async (req , res) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) res.status(500).send({ error: error })
        else {
            const UserBySchema = new User({
                avatar: "https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg",
                username: `${req.body.firstname.substr(1, 3)}-${req.body.lastname.substr(1, 3)}`,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                registerDate: Date.now(),
                lastLoginDate: null,
                joinedRooms: [],
                interests: req.body.interests
            })
            // Save the new user
            UserBySchema.save()
            .then(user => {
                res.status(200).send({ user: user, token: generateToken(user) })
            })
            .catch(error => {
                res.status(500).send({error: error})
            })
        }
    })
})

router.post("/login", (req, res) => {
    User.findOne({email: req.body.email })
    .then(user => {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
            if (error) res.status(500).send(error)
            else if (match) res.status(200).send({ user: user, token: generateToken(user) })
            else res.status(403).send({ error: 'Email or password is wrong.'}) 
        })
    })
    .catch(error => {
        res.status(500).json(error)
    })
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
// Generate a token 

const generateToken = (user) => {
    return jwt.sign({ data: user }, tokenSecret, {expiresIn: '24h'})
}

// Export module
module.exports = router