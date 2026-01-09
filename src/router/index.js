import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Home from '../pages/Home.vue'
import RecipeDetail from '../pages/RecipeDetail.vue'
import Collection from '../pages/Collection.vue'

// 读取 Vite 配置的基础路径
const baseUrl = import.meta.env.BASE_URL

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home }, // 首页
      { path: 'collection', name: 'Collection', component: Collection }, // 收藏夹
      { path: 'recipe/:id', name: 'RecipeDetail', component: RecipeDetail } // 详情页
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(baseUrl), 
  routes
})

export default router