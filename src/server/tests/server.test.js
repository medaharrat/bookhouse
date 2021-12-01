const Express = require('express')
const Supertest = require('supertest')


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
for (const router of config.server.routers)
{
    server.use(router.url, require('.' + router.module))
}


const request = Supertest(server)

describe('Server status', () => {

    it('GET /status should return online', async () =>
    {
        const res = await request.get('/status')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('online')
        expect(res.body.online).toBe(true)
    })
  
    it('GET /statuserr should return 404', async () =>
    {
        const res = await request.get('/statuserr')
        expect(res.status).toEqual(404)
    })
})