/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
        plugins: [
            react(),
        ],
        server: {
            port: 3000,
            proxy: {
                '/userauth': 'http://localhost:3001',
                '/personal': 'http://localhost:3002',
                '/medical': 'http://localhost:3003',
                '/financial': 'http://localhost:3004',
                '/administration': 'http://localhost:3005',
                '/legal': 'http://localhost:3006'
            }
        },
        build: {
            chunkSizeWarningLimit: 2000,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    },
                },
            }
        }
})
