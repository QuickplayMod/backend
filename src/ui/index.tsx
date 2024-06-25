import {Hono} from 'hono'
import tailwindCss from "./tailwind.scss?inline"
import indexCss from "./index.scss?inline"
import {routeNames} from "./routeNames.js";

const app = new Hono()

app.use(async (c, next) => {
    c.setRenderer((content) => {
        const routeName = routeNames.get(c.req.path);
        const title = routeName ? `${routeName} | Quickplay` : 'Quickplay';
        return c.html(
            <html>
            <head>
                <title>{title}</title>
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

routeNames.set('/', 'Home')
app.get('/', (c) => {
    return c.render(
        <div style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/static/hero.png')" class="h-full w-full bg-no-repeat bg-cover bg-center flex justify-center">
            <div class="container p-10">
                <img src="/static/logo-nomargin.png" alt="Quickplay" class="qp-header-image text-8xl text-white hidden sm:hidden md:block w-3/4 max-w-screen-md ml-auto mr-auto" />
                <img src="/static/logo-q-nomargin.png" alt="Quickplay" class="qp-header-image text-8xl text-white max-sm:hidden w-3/4 max-w-screen-md ml-auto mr-auto" />
            </div>
        </div>
    )
})

export default app
