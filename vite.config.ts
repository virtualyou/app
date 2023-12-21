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
                '/userauth': 'https://userauth.virtualyou.info',
                '/personal': 'https://personal.virtualyou.info',
                '/medical': 'https://medical.virtualyou.info',
                '/financial': 'https://financial.virtualyou.info',
                '/administration': 'https://administration.virtualyou.info',
                '/legal': 'https://legal.virtualyou.info',
                '/speech': 'https://speech.virtualyou.info'
            }
        },
        build: {
	    publicPath: 'https://app.virtualyou.com',
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
