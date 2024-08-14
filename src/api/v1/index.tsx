import {Hono} from 'hono'
import games from './games.json'
import gamesSchema from './games.schema.json'

const app = new Hono()

app.get('/health', (c) => {
    return c.json({
        online: true
    })
})

app.get('/games', (c) => {
    return c.json(games)
})
app.get('/gamesSchema', (c) => {
    return c.json(gamesSchema)
})

app.get('*', (c) => {
    c.status(404);
    return c.json({
        error: "Not found"
    })
})

export default app
