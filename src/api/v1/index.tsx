import {Hono} from 'hono'

const app = new Hono()

app.get('/health', (c) => {
    return c.json({
        online: true
    })
})

export default app
