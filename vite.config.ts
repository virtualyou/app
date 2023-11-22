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
                '/userauth': process.env.PROXY_AUTH,
                '/personal': process.env.PROXY_PERSONAL,
                '/medical': process.env.PROXY_MEDICAL,
                '/financial': process.env.PROXY_FINANCIAL,
                '/administration': process.env.PROXY_ADMINISTRATION
            }
        }
})