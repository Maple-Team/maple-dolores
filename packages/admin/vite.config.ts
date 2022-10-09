import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { getPort } from '../../util'

const appName = 'admin'
const port = getPort(appName)

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
