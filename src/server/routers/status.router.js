'use strict'

// External Modules
const Express = require('express')


// Create router
const router = Express.Router()


// Register local
router.get("/" , async (req , res) =>
{
    res.send({ online: true })
})


// Export module
module.exports = router