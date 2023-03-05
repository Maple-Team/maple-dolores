import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { getPort } from '../../build/util'
import { name } from './package.json'

const port = getPort(name)

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const isProd = process.env.NODE_ENV === 'production'

  return defineConfig({
    plugins: [
      Inspect(),
      vue({
        reactivityTransform: true, // ->  支持属性默认值选项
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    resolve: {
      alias: [
        {
          // find: /@\//,
          find: '@/',
          replacement: path.resolve(__dirname, 'src') + '/',
        },
      ],
    },
    // base: '/',
    base: !isProd ? `http://localhost:${port}` : '/', // https://iendeavor.github.io/import-meta-env/guide.html
    server: {
      port,
      cors: true,
      origin: !isProd ? '' : `http://localhost:${port}`,
      proxy: {
        '/api': { target: 'http://localhost:3001/' }, // dev: 3000, prod:3001
        '/ws': {
          ws: true,
          target: 'ws://localhost:9010/',
          changeOrigin: true,
        },
        '/socket.io/': {
          ws: true,
          target: 'ws://localhost:3001/',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      cssTarget: 'chrome80',
      outDir: 'dist',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  })
}
