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
server.use('/', require('../routers/room.router'))

const request = Supertest(server)

describe('Room status', () => {

    it('POST /create then GET /:id then DELETE /:id', async() => {

        const res = await request.post('/create').send({
            title: "TestTitle",
            book: {_id: '61aa367c31bcc49da5054db6',
                title: 'Game of Thrones',
                author: 'George R.R Martin',
                cover: './img/got_cover.jfif'},
            attendees: []
        }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(res.status).toEqual(201)
        
        resId = res.body.room._id
        route = '/' + resId
        const getById = await request.get(route)
        expect(getById.status).toEqual(201)

        route = '/delete/' + resId
        const deleteById = await request.delete(route)
        expect(deleteById.status).toEqual(200)
    })

    it('Wrong GET /:id gives 404 Room not found message', async() => {
        const getById = await request.get('/61aa2ef89e54187493180e42')
        expect(getById.status).toBe(404)
        expect(getById.body.error).toBe('Room not found')
    })

    it('Bad GET /:id gives 500 Room not found message', async() => {
        const getById = await request.get('/0123456789abcdefgh')
        expect(getById.status).toBe(500)
        expect(getById.body.error).toBe('Room not found')
    })

    it('Cannot create room without book', async() => {
        const wrongCreate = await request.post('/create').send({
            title: "TestTitle",
            attendees: []
        }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(wrongCreate.status).toEqual(400)
        expect(wrongCreate.body.ok).toBeUndefined()
    })

})
