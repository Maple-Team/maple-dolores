/* eslint-disable @typescript-eslint/restrict-template-expressions */
import path from 'path'
import fs from 'fs'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import Inspect from 'vite-plugin-inspect'
import { getPort } from '../../build/util'
import { name } from './package.json'

const port = getPort(name)

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
          replacement: `${path.resolve(__dirname, 'src')}/`,
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
        '/api': { target: `${process.env.VITE_API_URL}:${process.env.VITE_API_PORT}/` }, // dev: 3000, prod:3001
        // '/api': { target: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/` }, // dev: 3000, prod:3001
        '/ws': {
          ws: true,
          target: 'ws://localhost:9010/',
          changeOrigin: true,
        },
        // '/socketIO': {
        //   ws: true,
        //   target: 'http://localhost:3000/socket.io/',
        //   changeOrigin: true,
        // },
      },
      https: isProd || {
        cert: fs.readFileSync('./localhost+3.pem'),
        key: fs.readFileSync('./localhost+3-key.pem'),
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
