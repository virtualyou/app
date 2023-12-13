"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="vite/client" />
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_react_1.default)(),
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
                manualChunks: function (id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        }
    }
});
