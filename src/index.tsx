import {Hono} from 'hono'
import { compress } from 'hono/compress'
import api from "./api/v1/index.js";
import ui from "./ui/index.js";

/**
 * Bun currently doesn't have CompressionStream implemented.
 * https://github.com/oven-sh/bun/issues/1723
 * MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource>
 */
async function polyfillCompressionStream() {
    const zlib = await import('node:zlib')

    const make = (ctx: any, handle: any) => Object.assign(ctx, {
        writable: new WritableStream({
            write: chunk => handle.write(chunk),
            close: () => handle.end()
        }),
        readable: new ReadableStream({
            type: 'bytes',
            start (ctrl) {
                handle.on('data', (chunk: any) => ctrl.enqueue(chunk))
                handle.once('end', () => ctrl.close())
            }
        })
    })

    // @ts-ignore
    globalThis.CompressionStream ??= class CompressionStream {
        constructor(format: string) {
            make(this, format === 'deflate' ? zlib.createDeflate() :
                format === 'gzip' ? zlib.createGzip() : zlib.createDeflateRaw())
        }
    }

    // @ts-ignore
    globalThis.DecompressionStream ??= class DecompressionStream {
        constructor(format: string) {
            make(this, format === 'deflate' ? zlib.createInflate() :
                format === 'gzip' ? zlib.createGunzip() :
                    zlib.createInflateRaw())
        }
    }
}

async function serveStaticFiles() {
    const { serveStatic } = await import("hono/bun");
    const path = await import("path");
    // Hono seemingly always prepends "./" to our root path for serveStatic. We can't just use __dirname
    // as the root path, we need to compute it relative to our current working directory.
    // https://github.com/honojs/hono/issues/2200
    const relativePathToScript = path.relative(process.cwd(), import.meta.dirname);
    app.use('/static/*', async (ctx, next) => {
        ctx.res.headers.set('Cache-Control', 'max-age=31536000')
        await next()
    })
    app.use('/static/*', serveStatic({ root: relativePathToScript }))
}

const app = new Hono()

const runningInCloudflarePages = import.meta.env.MODE === "pages";
if(!runningInCloudflarePages) {
    await serveStaticFiles()
    await polyfillCompressionStream()
}

app.use(compress())

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
