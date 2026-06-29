import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Allow .js files to contain JSX
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  
  // Server configuration
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Build configuration
  build: {
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'ui5-core': [
            '@ui5/webcomponents',
            '@ui5/webcomponents-react',
            '@ui5/webcomponents-fiori'
          ],
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'socket': ['socket.io-client']
        }
      }
    }
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/Data/ContextHandler'),
      '@api': path.resolve(__dirname, './src/api'),
      '@ui5/webcomponents': path.resolve(__dirname, 'node_modules/@ui5/webcomponents'),
    }
  },
  
  // Define environment variables
  define: {
    'process.env': {}
  },
  
  // Optimize dependencies - merged with esbuild options
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@ui5/webcomponents-react'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
});

// Made with Bob
