// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  base: '', // Use an empty string for the base URL
  define: {
    global: 'window'
  },
  resolve: {
    // Uncomment and update alias if needed
    // alias: [
    //   {
    //     find: /^~(.+)/,
    //     replacement: path.join(process.cwd(), 'node_modules/$1')
    //   },
    //   {
    //     find: /^src(.+)/,
    //     replacement: path.join(process.cwd(), 'src/$1')
    //   }
    // ]
  },
  server: {
    open: true, // Automatically open the app in the browser
    port: 3000  // Use port 3000 for the dev server
  },
  preview: {
    open: true, // Automatically open the app in the browser for preview
    port: 3000  // Use port 3000 for the preview server
  }
});
