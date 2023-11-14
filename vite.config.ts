import { defineConfig } from 'vite';

const PORT = Number(process.env.PORT) || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: PORT,
  },
});
