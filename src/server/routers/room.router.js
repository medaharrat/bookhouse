'use strict'

// External Modules
const Express = require('express')

// Create router
const router = Express.Router()

const Room = require("../models/room.model")

// Get all rooms
router.get("/" , async (req , res) => {
    let rooms = []
    try {
        // Find rooms
        rooms = await Room.find({}) 

        if (rooms == null) {
            return res.status(404).send({ error: 'Error retreiving rooms' })
        }
        res.status(201).send({ rooms: rooms })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
})

// Get one room
router.get("/:id" , async (req , res) => {
    let room = []
    try {
        // Find room
        room = await Room.findOne({ _id: req.params.id }) 

        if (room == null) {
            return res.status(404).send({ error: 'Room not found' })
        }
        res.status(201).send({ id: req.params.id, room: room })
    } catch (error) {
        return res.status(500).send({ error: 'Room not found', details: error })
    }
})

// New Room
router.post("/create" , async (req , res) =>
{
    const { title, book, attendees } = req.body

    /* Data Verification */

    const room = new Room({
        title: title,
        book: book,
        attendees: attendees
    })

    try {
        await room.save()
        .then(room => {
            res.status(201).send({ room: room })
        })
        .catch(error => {
            res.status(400).send({error: error})
        })
    } catch (error) {
        res.status(400).send({ok: 0, error: error})
    }
})

// Delete a room
router.delete("/delete/:id" , getRoom, async (req , res) => {
    try {
        Room.deleteOne({
            "_id": req.params.id
        }, function (err, room) {
            if (err)
                return res.status(500).send({ error: err.message })
            return res.status(200).send({ room: room })
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

// Middleware for getting room (for clean-code)
async function getRoom(req, res, next) {
    let room
    try {
        // Find the user that passed in the URL
        room = await Room.find({_id: req.params.id}) 

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