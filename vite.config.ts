/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
        plugins: [
            react(),
        ],
        server: {
            port: 3000, // parseInt(process.env.SERVER_PORT),
            proxy: {
                '/userauth': 'http://localhost:3001', //process.env.PROXY_AUTH,
                '/personal': 'http://localhost:3002', //process.env.PROXY_PERSONAL,
                '/medical': 'http://localhost:3003', //process.env.PROXY_MEDICAL,
                '/financial': 'http://localhost:3004', //process.env.PROXY_FINANCIAL,
                '/administration': 'http://localhost:3005' //process.env.PROXY_ADMINISTRATION
            }
        }
})
