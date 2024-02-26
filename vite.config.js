import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import config from './config.js'

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
  ...config
})
