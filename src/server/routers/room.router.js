'use strict'

// External Modules
const Express = require('express')
const Mongoose = require('mongoose')


// Create router
const router = Express.Router()

const Room = require("../models/room.model")
const Book = require("../models/book.model")

// New Room
// TODO Create a BOOK object or reference after the room has been created!
router.post("/create" , async (req , res) =>
{
    const { title, attendees } = req.body

    if (!(title)) {
        return res.status(400).json({ok: 0, message: "Empty inputs!"})
    }
    // return res.send({message: count})
    const book = new Book({
        title: 'Default title',
        author: 'Default author'
    })
    await book.save()

    const room = new Room({
        book: book._id,
        title: title,
        attendees: attendees || []
    })
    try {
        await room.save()

        room.save(function(err) {
            if (err){
                return res.status(400).send({message: error.message})
            }
            else {
                Room.find({}).populate('book').exec(function(error, posts) {
                    if (error) {
                        return res.status(400).send({message: error.message})
                    }
                })
            }
        })
        // Succesfully created object
        return res.status(201).send({ok: 1, message: "Room created with book reference"})
    } catch (error) {
        return res.status(400).send({ok: 0, message: error.message})
    }

    

})

router.delete("/delete/:id" , getRoom, async (req , res) =>
{
    try {
        Room.remove({
            "id": req.params.id
        }, function (err, user) {
            if (err) {
                return res.status(500).send({message: err.message})
            }
            // return res.send({msg: req.params})
            return res.status(200).send({message: "Deleted room"})
        })
    } catch (error) {
        res.status(500).send({message: error.message})
    }

})

// Middleware for getting room (for clean-code)
async function getRoom(req, res, next) {
    let room
    try {
        // Find the user that passed in the URL
        room = await Room.find({id: req.params.id}) 

        // Cannot find user
        if (room == null) {
            return res.status(404).json({message: 'Cannot find room by id: ' + req.params.id})
        }
    } catch (error) {
        // Sth wrong with the server
        return res.status(500).json({message: error.message})
    }
    res.room = room
    next()
}


// Export module
module.exports = router