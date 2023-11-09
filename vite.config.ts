/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const authTarget = JSON.stringify(import.meta.env.VITE_USERAUTH_TARGET)// "http://localhost:3004"
const testTarget = JSON.stringify(import.meta.env.VITE_TEST_TARGET) // "http://localhost:3005"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '^/api/v1/names': {
                target: testTarget,
                changeOrigin: true,
            },
            '^/api/v1/auth': {
                target: authTarget,
                changeOrigin: true,
            }

        },
    },
})