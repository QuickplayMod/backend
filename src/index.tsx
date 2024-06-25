import {Hono} from 'hono'
import tailwindCss from "./tailwind.scss?inline"
import indexCss from "./index.scss?inline"

const app = new Hono()

if(import.meta.env.MODE === "bun") {
    const { serveStatic } = await import("hono/bun");
    const path = await import("path");
    // Hono seemingly always prepends "./" to our root path for serveStatic. We can't just use __dirname
    // as the root path, we need to compute it relative to our current working directory.
    // https://github.com/honojs/hono/issues/2200
    const relativePathToScript = path.relative(process.cwd(), import.meta.dirname);
    app.use('/static/*', serveStatic({ root: relativePathToScript }))
}

app.use(async (c, next) => {
    c.setRenderer((content) => {
        return c.html(
            <html>
            <head>
                <title>Quickplay</title>
                <link rel="manifest" href="/static/manifest.json"/>
                <link rel="icon" type="image/x-icon" href="/static/favicon.ico"/>
                <style>{tailwindCss}</style>
                <style>{indexCss}</style>
            </head>
            <body>
                {content}
            </body>
            </html>
        );
    })
    await next();
})

app.get('/', (c) => {
    return c.render(
        <p class="text-3xl font-bold underline">Hello, world!!!!</p>
    )
})

const host = import.meta.env.VITE_HOST || "localhost"
const port = import.meta.env.VITE_PORT || 3000
if(import.meta.env.MODE === "bun") {
    console.log(`> Listening on port http://${host}:${port}`)
}

export default {
    ...app,
    port
}
