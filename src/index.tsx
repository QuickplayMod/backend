import {Hono} from 'hono'
import api from "./api/v1/index.js";
import ui from "./ui/index.js";

const app = new Hono()

const staticFilesServedByCloudflare = import.meta.env.MODE === "pages";
if(!staticFilesServedByCloudflare) {
    const { serveStatic } = await import("hono/bun");
    const path = await import("path");
    // Hono seemingly always prepends "./" to our root path for serveStatic. We can't just use __dirname
    // as the root path, we need to compute it relative to our current working directory.
    // https://github.com/honojs/hono/issues/2200
    const relativePathToScript = path.relative(process.cwd(), import.meta.dirname);
    app.use('/static/*', serveStatic({ root: relativePathToScript }))
}

app.route('/', ui)
app.route('/api/v1', api)

const host = import.meta.env.VITE_HOST || "localhost"
const port = import.meta.env.VITE_PORT || 3000
if(import.meta.env.MODE === "bun") {
    console.log(`> Listening on port http://${host}:${port}`)
}

export default {
    ...app,
    port
}
