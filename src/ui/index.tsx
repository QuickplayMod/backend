import {Hono} from 'hono'
import tailwindCss from "./tailwind.scss?inline"
import indexCss from "./index.scss?inline"
import {routeNames} from "./routeNames.js";
import {Hero} from "./Hero.js";
import {Features} from "./Features.js";
import {Download} from "./Download.js";
import {FAQ} from "./FAQ.js";
import {Footer} from "./Footer.js";
import {html} from 'hono/html'

const app = new Hono()

app.use(async (c, next) => {
    c.setRenderer((content) => {
        const routeName = routeNames.get(c.req.path);
        const title = routeName ? `${routeName} | Quickplay` : 'Quickplay';
        return c.html(
            <>
                {html`<!DOCTYPE html>`}
                <html lang="en">
                <head>
                    <title>{title}</title>
                    <link rel="manifest" href="/static/manifest.json"/>
                    <link rel="icon" type="image/x-icon" href="/static/favicon.ico"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <style>{tailwindCss}</style>
                    <style>{indexCss}</style>
                    <script src="/static/functions.js" />
                </head>
                <body>
                {content}
                </body>
                </html>
            </>
        );
    })
    await next();
})

routeNames.set('/', 'Home')
app.get('/', (c) => {
    return c.render(
        <div>
            <Hero />
            <div class="min-h-[30vh] bg-neutral-900 p-3 px-[5vw] sm:p-10">
                <div class="max-w-[90vw] sm:max-w-[min(60vw,2000px)] m-auto">
                    <Features />
                    <Download />
                    <hr class="m-10 border-neutral-700" />
                    <FAQ />
                </div>
            </div>
            <Footer />
        </div>
    )
})

export default app
