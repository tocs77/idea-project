import { PluginOption, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigpaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import circleDependency from 'vite-plugin-circular-dependency'
import { resolve } from 'path';

export default defineConfig(({  mode }) => {

  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tsconfigpaths(),
      circleDependency(),
      visualizer({
        template: 'treemap', // treemap or sunburst
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'analyse.html', // will be saved in project's root
      }) as PluginOption,
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    base: '/',
    build: {
      outDir: './build',
      assetsDir: './static',
    },
    assetsInclude: ['/sb-preview/runtime.js'],
  
    server: {
      port: Number(env.VITE_PORT) || 3000,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '/trpc': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '/nano': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '/UIService': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  }
})