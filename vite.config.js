import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  base: process.env.NODE_ENV === 'production' ? '/recipe-collection/' : '/',
  build: {
    outDir: 'dist', // 打包输出目录
    assetsDir: 'assets' // 静态资源打包目录
  }
})