/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/

export default defineConfig({
        plugins: [
            react(),
//            replace({
//                'process.env': JSON.stringify(process.env),
//            }),
        ],
        server: {
            port: 3000, // parseInt(process.env.SERVER_PORT),
            proxy: {
                '/userauth': 'https://userauth.virtualyou.info', //process.env.PROXY_AUTH,
                '/personal': 'https://personal.virtualyou.info', //process.env.PROXY_PERSONAL,
                '/medical': 'https://medical.virtualyou.info', //process.env.PROXY_MEDICAL,
                '/financial': 'https://financial.virtualyou.info', //process.env.PROXY_FINANCIAL,
                '/administration': 'https://administration.virtualyou.info' //process.env.PROXY_ADMINISTRATION
            }
        }
})