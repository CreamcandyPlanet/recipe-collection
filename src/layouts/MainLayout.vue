<template>
  <el-container style="height: 100vh;">
    <el-header class="main-header">
      <div class="header-container">
        <h1 class="logo">食谱收藏夹</h1>
        <el-menu 
          :default-active="activeMenu" 
          mode="horizontal" 
          class="nav-menu"
          router
        >
          <el-menu-item index="/">
            <el-icon><Home /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/collection">
            <el-icon><Star /></el-icon>
            <span>我的收藏</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main class="main-content">
      <router-view />
    </el-main>
    <el-footer class="main-footer">
      <p>© 2025 食谱收藏夹 | Vue3 + Pinia 前端项目</p>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = ref('/')

// 监听路由变化，更新菜单激活状态
watch(
  () => route.path,
  (path) => {
    activeMenu.value = path
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
@import '@/assets/css/components/MainLayout.scss';
</style>