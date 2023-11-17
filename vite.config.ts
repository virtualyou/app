/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/

export default defineConfig({
        plugins: [
            react(),
            replace({
                'process.env': JSON.stringify(process.env),
            }),
        ],
        server: {
            port: parseInt(process.env.SERVER_PORT),
            proxy: {
                '/api': process.env.PROXY_API, // https://userauth.virtualyou.info (localhost:3004)
                '/test': process.env.PROXY_TEST // https://test.virtualyou.info (localhost:3005)
            }
        },
})