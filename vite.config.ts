import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig((config) => {
    if(config.mode === "pages") {
        return {
            plugins: [
                build({
                    outputDir: 'dist/pages'
                }),
                devServer({
                    adapter,
                    entry: 'src/index.tsx'
                })
            ]
        }
    }

    if(config.mode === "bun") {
        return {
            build: {
                ssr: true,
                minify: false,
                target: "esnext",
                rollupOptions: {
                    input: {
                        main: "src/index.tsx"
                    },
                    output: {
                        entryFileNames: 'server.js',
                        format: 'esm'
                    }
                },
                outDir: "dist/bun"
            },
            plugins: [
                devServer({
                    entry: 'src/index.tsx'
                })
            ]
        }
    }

    return {}
})
