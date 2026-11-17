import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
    plugins: [react()],
    base: '',
    publicDir: false,
    build: {
        manifest: true,
        cssCodeSplit: true,
        outDir: './public/dist', 
        assetsDir: '', 
        emptyOutDir: true,
        // No source maps in production builds: public/dist is committed and
        // shipped, and .map files would be published with it. `npm run dev`
        // passes --sourcemap so watch builds stay debuggable (those maps are
        // gitignored and left out of the release zip).
        sourcemap: false,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, './app/index.tsx'),
                'devo-global': path.resolve(__dirname, './app/styles/devo-global.scss'),
                'extensions-global': path.resolve(__dirname, './extensions/app/styles/extensions-global.scss'),
                'admin': path.resolve(__dirname, './app/styles/admin.scss'),
                'login': path.resolve(__dirname, './app/styles/login.scss'),
            },
            output: {
                assetFileNames: (assetInfo) => {
                    if (/\.(css)$/.test(assetInfo.name || '')) {
                        return ( assetInfo.name || '' ).toLowerCase();
                    }
                    return '[name]-[hash][extname]';
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./app', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '^/': 'http://localhost:8080',
        },
        open: false,
        watch: {
            usePolling: true,
            interval: 500, // Adjust polling interval if necessary
        },
    },
    css: {
        devSourcemap: true,
    },
});
