import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: "/my-notes/",
  envDir: "./env",
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    Sitemap({ hostname: 'https://halifatick.github.io/my-notes/' })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  }
})
