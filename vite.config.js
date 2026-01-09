import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 引入path模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 关键：base = /Gitee仓库名/（例如仓库名是recipe-collection，则写/recipe-collection/）
  base: '/recipe-collection/', 
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src') 
    }
  }
})

