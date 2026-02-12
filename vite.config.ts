import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Fast Refresh optimizations
      fastRefresh: true,
      // Babel plugins for optimization
      babel: {
        plugins: [
          // Remove prop-types in production
          ['babel-plugin-transform-remove-imports', {
            test: 'prop-types'
          }]
        ]
      }
    }),
    // Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli compression for better compression ratio
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Bundle analyzer (only in analyze mode)
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ],
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Asset directory
    assetsDir: 'assets',
    
    // Generate sourcemaps for production debugging
    sourcemap: false,
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true, // Remove debuggers
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true, // Safari 10 compatibility
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    
    // Rollup options for code splitting
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          
          // Router
          'router': ['react-router-dom'],
          
          // State management
          'state': ['zustand'],
          
          // UI Icons
          'ui-icons': ['lucide-react'],
          
          // Charts (lazy load these)
          'charts': ['chart.js', 'react-chartjs-2'],
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Generate manifest
    manifest: true,
    
    // Inline small assets as base64
    assetsInlineLimit: 4096, // 4kb
    
    // Report compressed size
    reportCompressedSize: true,
  },
  
  // Server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: false,
    cors: true,
    
    // HMR configuration
    hmr: {
      overlay: true,
    },
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: false,
  },
  
  // Optimization options
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'lucide-react',
    ],
    exclude: [
      // Exclude heavy dependencies from pre-bundling
      'chart.js',
      'react-chartjs-2',
    ],
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './ui'),
      '@pages': resolve(__dirname, './pages'),
      '@features': resolve(__dirname, './features'),
      '@layouts': resolve(__dirname, './layouts'),
      '@store': resolve(__dirname, './store'),
    },
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // Add CSS preprocessor options if needed
    },
  },
  
  // Esbuild options for faster builds
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    treeShaking: true,
  },
});
