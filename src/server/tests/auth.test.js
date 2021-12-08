
// Modules
const Supertest = require('supertest')
const Express = require("express")
const Mongoose = require('mongoose')
const config = require('./config.json')

// Connect to MongoDB Atlas
const connectionString = `${config.server.database.protocol}://${config.server.database.user}:${config.server.database.password}@${config.server.database.host}/${config.server.database.database}` 

Mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('> MongoDB connected.');
}).catch(err => {
    console.log('[X] - Failed to connect to MongoDB', err);
});

Mongoose.connection.on('error', err => {
    console.log(`[X] - MongoDB Connection Error: ${err}`);
});


// Load config
const config = require('../config.json')

const server = Express()
server.set('views', config.server.views)
server.set("view engine", "ejs")
server.use(config.server.publicUrl, Express.static(config.server.public))
server.use((req, res, next) => //Custom injection middleware
{
    req.config = config
    next()
})


// Install Express routers
server.use(config.server.routers[0].url, require('.' + config.server.routers[0].module))


const request = Supertest(server)

describe('Authentication status', () => {

    it('POST /signup should return user and token', async () =>
    {
        /*const res = await request.get('/signup')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('online')
        expect(res.body.online).toBe(true)*/
        return request.post('/signup').send({
            firstname: 'TEST',
            lastname: 'USER',
            email: 'test@gmail.com',
            password: 'testpass'
        }).expect(200).then((res) =>{
            expect(res.body.user.firstname).toBe('TEST')
            expect(res.body.user).toHaveProperty('username')
        })
    })
  
    it('GET /statuserr should return 404', async () =>
    {
        const res = await request.get('/statuserr')
        expect(res.status).toEqual(404)
    })
})
