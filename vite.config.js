import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
        // Specify the port (default: 3000)
        port: 3000,
    },
    build: {
        // Specify the output directory for the built files
        base: '/',
        outDir: './dist' // You can change this if needed
    }
});