import {Hono} from 'hono'
import tailwindCss from "./tailwind.scss?inline"
import indexCss from "./index.scss?inline"
import {routeNames} from "./routeNames.js";
import {Hero} from "./Hero.js";

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
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
        <div>
            <Hero />
        </div>
    )
})

export default app
