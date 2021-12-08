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
        res.status(404).send({ error: 'User does not exist.'}) 
    })
})

// Generate a token 

const generateToken = (user) => {
    return jwt.sign({ data: user }, tokenSecret, {expiresIn: '24h'})
}


// Export module
module.exports = router