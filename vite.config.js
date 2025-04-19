// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'es2020', // Oder 'modules' oder eine höhere Version
        // ... andere Build-Optionen
    },
});