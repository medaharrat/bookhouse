'use strict'

// External Modules
const Express = require('express')
const bcrypt = require('bcrypt')

// Create router
const router = Express.Router()

// User Schema
const User = require('../models/user.model')


// Register local
router.post("/signup" , async (req , res) =>
{
    const { email, firstName, lastName, password, password2} = req.body
    // Duplicate emails are not okay
    let user = await User.findOne({email})

    if (user){
        return res.redirect("/signup")
    }
    

    if (!(firstName && lastName && email && password) || password != password2) {
        return res.status(400).send({ok: 0, message: "Wrong input"})
    }

    const hashedPw = await bcrypt.hash(password, 12)
    
    user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPw
    })
    try {
        const newUser = await user.save()
        // Succesfully created object
        res.status(201).send({ok: 1, redirect: "/login"})
    } catch (error) {
        res.status(400).send({ok: 0, message: error.message})
    }
})


// Login
router.post("/login" , async (req , res) => {
    const { email, password} = req.body;

    const user = await User.findOne({email})

    // Non existant
    if (!user) {
        return res.redirect(400, '/login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    // Wrong pass
    if (!isMatch) {
        return res.redirect('/login')
    }

    return res.redirect(200, '../user')
    // ??? res.redirect('/user/:id?')
})

const isAuthorized = (req, res, next) =>{
    if (req.session.isAuth) {
        next()
    }
    else {
        res.redirect('/login')
    }
}



// Export module
module.exports = router