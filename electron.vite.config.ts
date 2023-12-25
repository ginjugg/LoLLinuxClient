import { resolve } from 'path'
import * as path from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  server: {
    open: true,
    origin: 'http://127.0.0.1:5173'
  },
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@/': `${path.resolve(__dirname, 'src/renderer/src')}/`,
      }
    },
    plugins: [vue()]
  }
})
