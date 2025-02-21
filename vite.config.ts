import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
    plugins: [react()],
    base: '',
    build: {
        manifest: true,
        cssCodeSplit: true,
        outDir: './assets/dist', 
        assetsDir: '', 
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, './assets/src/index.tsx'),
                'do-global': path.resolve(__dirname, './assets/src/styles/do-global.scss'),
                'do-admin': path.resolve(__dirname, './assets/src/styles/do-admin.scss'),
                'do-login': path.resolve(__dirname, './assets/src/styles/do-login.scss'),
            },
            output: {
                assetFileNames: (assetInfo) => {
                    if (/\.(css)$/.test(assetInfo.name || '')) {
                        return '[name][extname]';
                    }
                    return '[name]-[hash][extname]'; 
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                      return 'vendor';
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./assets/src', import.meta.url)),
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
        modules: {
            generateScopedName: '[name]__[local]__[hash:base64:5]',
            localsConvention: 'camelCase',
        }
    },
});