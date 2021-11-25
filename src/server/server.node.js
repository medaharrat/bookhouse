'use strict'

// Modules
const Fs = require('fs')
const Https = require("https")
const Express = require("express")
const SocketIO = require("socket.io")
const InstallController = require("./socket.node")
const Mongoose = require('mongoose')
const cors = require('cors');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Mongoose settings
Mongoose.Promise = global.Promise;

// Connect to MongoDB Atlas
const connectionString = "mongodb+srv://root:admin123@bookhousecluster.tejiq.mongodb.net/bookhouse?retryWrites=true&w=majority"

Mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

Mongoose.connection.on('error', err => {
    logError(err);
});

// Load config
const config = require('./config.json')

// Create express server
const server = Express()
server.set('views', config.server.views)
server.set("view engine", "ejs")
server.use(config.server.publicUrl, Express.static(config.server.public))
server.use(cors());
server.use(Express.json())
server.use((req, res, next) => //Custom injection middleware
{
    req.config = config
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    next()
})
console.log('Express server initialized.')

// Configure Passport
const User = require('./models/user.model');
server.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
server.use(Passport.initialize());
server.use(Passport.session());
Passport.use(new LocalStrategy(User.authenticate()));
Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

// Install Express routers
console.log('Installing express routers...')
for (const router of config.server.routers)
{
    console.log(`   > (${router.module}) -> {${router.url}}`)
    server.use(router.url, require(router.module))
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