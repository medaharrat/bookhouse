// Modules
// TextEncoder and Decoder is used with mongoose, without it it won't compile!
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const Supertest = require('supertest')
const Express = require("express")
const Mongoose = require('mongoose')
const config = require('../config.json')
//const router = require('../routers/auth.router')

// Connect to MongoDB Atlas
const connectionString = `${config.server.database.protocol}://${config.server.database.user}:${config.server.database.password}@${config.server.database.host}/${config.server.database.database}` 

beforeAll(async () => {
    await Mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})


const server = Express()
server.set('views', config.server.views)
server.set("view engine", "ejs")
server.use(config.server.publicUrl, Express.static(config.server.public))
server.use((req, res, next) => //Custom injection middleware
{
    req.config = config
    next()
})
server.use(Express.json())


// Install Express routers
server.use('/', require('../routers/user.router'))

const request = Supertest(server)

describe('User status', () => {

    it('Get an existing user, should return 200', async() => {
        const res = await request.get('/61aa2fbccaca60a0e8715e4c')
        expect(res.status).toEqual(200)
        expect(res.body.email).toBe('test-2@user.com')
    })


    it('Get a non-existing user, should return 404', async() => {
        const res = await request.get('/61aa2fbccaca60a0e8715eee')
        expect(res.status).toEqual(404)
    })

    it('Get a nonsense request, should return 500', async() => {
        const res = await request.get('/BADREQ')
        expect(res.status).toEqual(500)
    })

    it('Get a nonsense user, should return 500', async() => {
        const res = await request.get('/BADREQ')
        expect(res.status).toEqual(500)
    })

})
