import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
var userauthTarget = import.meta.env.VITE_USERAUTH_TARGET; // "http://localhost:3004"
var testTarget = import.meta.env.VITE_TEST_TARGET; // http://localhost:3005"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
});
