/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        replace({
            'process.env': JSON.stringify(process.env),
        }),
    ],
    server: {
        port: 3000,
        proxy: {
            // proxy all requests starting with /api to localhost:3004
            '/api': 'http://localhost:3004',
            '/test': 'http://localhost:3005'
        }
    },
})