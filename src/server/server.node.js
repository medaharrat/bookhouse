'use strict'


// Modules
const Fs = require('fs')
const Https = require("https")
const Express = require("express")
const SocketIO = require("socket.io")
const InstallController = require("./socket.node")
const cors = require('cors');
const Mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)


// Load config
const config = require('./config.json')
const connectionString = `${config.server.database.protocol}://${config.server.database.user}:${config.server.database.password}@${config.server.database.host}/${config.server.database.database}` 
console.log(connectionString)
// Mongoose connection init
Mongoose
    .connect(connectionString,
    {useNewUrlParser: true, useUnifiedTopology: true}).then((res) => {
        console.log('Connected to Database')
    })
const Db = Mongoose.connection
Db.on('error', (error) => console.error(error))
//db.once('open', () => console.log('Connected to Database'))


const store = new MongoDBSession({
    uri: connectionString,
    collection: 'Sessions'
})

// Create express server
const server = Express()
server.set('views', config.server.views)
server.set("view engine", "ejs")
server.use(config.server.publicUrl, Express.static(config.server.public))
server.use(Express.json())

// We don't want to create a new session for every request (resave: false)
// And if we didn't touch (or modify) the session, we don't want to save it
server.use(session({
    secret: "cookie-signer string",
    resave: false,
    saveUninitialized: false,
    store: store
}))
server.use((req, res, next) => //Custom injection middleware
{
    req.config = config
    next()
})
console.log('Express server initialized.')


// Install Express routers
console.log('Installing express routers...')
for (const router of config.server.routers)
{
    console.log(`   > (${router.module}) -> {${router.url}}`)
    server.use(router.url, require(router.module))
}
if (config.debug) {
    server.use('/debug', require('./routers/debug.router'))
}
console.log('Done.')


// Load certificates
const certificate =
{
    key:  Fs.readFileSync(config.server.ssl.key, 'utf8'),
    cert: Fs.readFileSync(config.server.ssl.cert, 'utf8'),
    //No certificate authority specified with self-signed
    ca: (config.server.ssl.ca == null) ? undefined : Fs.readFileSync(config.server.ssl.ca, 'utf8')
}
console.log('Certificate loaded.')


// Create express and Socket.IO services
const service = Https.Server(certificate, server)
const io = SocketIO(service, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })
InstallController(io, config.socket)
console.log('Services initialized.')


// Start server
service.listen(config.server.port, () =>
{
    console.log("Server running on port: " + config.server.port)
    console.log('━━━━━━━━━━━━━━━━━━━ ', 'Runtime logs', ' ━━━━━━━━━━━━━━━━━━━')
})