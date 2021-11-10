'use strict'

// External Modules
const Express = require('express')


// Create router
const router = Express.Router()


// Register local
router.get("/" , async (req , res) =>
{
    /*res.render("main",
    {
        page: './room',
        config: req.config.socket
    })*/
    //console.log("Server says Hi!")
})


// Export module
module.exports = router