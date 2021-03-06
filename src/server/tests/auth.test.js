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
server.use('/', require('../routers/auth.router'))
server.use('/user', require('../routers/user.router'))

const request = Supertest(server)

describe('Authentication status', () => {

    it('POST /signup then POST /login then DELETE /user/:id', async () =>
    {
        const res = await request.post('/signup').send({
            firstname: "Test",
            lastname: "User",
            email: "testtest@email.com",
            password: "passwd"
        }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(res.status).toEqual(200)
        expect(res.body.user.username).toEqual('est-ser')

        const login = await request.post('/login').send({
            email: "testtest@email.com",
            password: "passwd"
        }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(login.status).toEqual(200)
        expect(login.body.user.username).toEqual('est-ser')

        route = '/user/' + res.body.user._id
        const afterRes = await request.delete(route)
        expect(afterRes.status).toEqual(200)
    })


    it('POST /signup should return 500 at bad user creation', async () =>
    {
        const res = await request.post('/signup').send({
            firstname: "Test",
            lastname: "User",
            email: "testtest@email.com"
        }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(res.status).toEqual(500)
        
    })

})
