import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        // Modern React plugin configuration
        babel: {
          plugins: isProduction
            ? [
                [
                  'babel-plugin-transform-remove-imports',
                  { test: 'prop-types' }
                ]
              ]
            : []
        }
      }),

      // Gzip compression
      isProduction &&
        viteCompression({
          algorithm: 'gzip',
          threshold: 10240,
          ext: '.gz'
        }),

      // Brotli compression
      isProduction &&
        viteCompression({
          algorithm: 'brotliCompress',
          threshold: 10240,
          ext: '.br'
        }),

      // Bundle analyzer (only when running: vite build --mode analyze)
      isAnalyze &&
        visualizer({
          open: true,
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true
        })
    ].filter(Boolean),

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      minify: 'terser',

      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false
        }
      },

      rollupOptions: {
        input: resolve(__dirname, 'index.html'),

        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              if (id.includes('react-router')) return 'router';
              if (id.includes('zustand')) return 'state';
              if (id.includes('lucide-react')) return 'ui-icons';
              if (id.includes('chart.js') || id.includes('react-chartjs'))
                return 'charts';
              return 'vendor';
            }
          },

          assetFileNames(assetInfo) {
            const ext = assetInfo.name?.split('.').pop() || '';

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return 'assets/img/[name]-[hash][extname]';
            }

            if (/woff2?|ttf|otf/i.test(ext)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }

            return 'assets/[name]-[hash][extname]';
          },

          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      },

      cssCodeSplit: true,
      manifest: true,
      assetsInlineLimit: 4096,
      reportCompressedSize: true
    },

    server: {
      port: 5173,
      host: true,
      cors: true,
      hmr: { overlay: true }
    },

    preview: {
      port: 4173,
      host: true
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'zustand',
        'lucide-react'
      ],
      exclude: ['chart.js', 'react-chartjs-2']
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/ui'),
        '@pages': resolve(__dirname, './src/pages'),
        '@features': resolve(__dirname, './src/features'),
        '@layouts': resolve(__dirname, './src/layouts'),
        '@store': resolve(__dirname, './src/store')
      }
    },

    css: {
      devSourcemap: true
    },

    esbuild: {
      legalComments: 'none',
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  };
});
