import { createRouter, createWebHistory } from 'vue-router'
// 替换@别名 → 用../指向src根目录
import MainLayout from '../layouts/MainLayout.vue'
import Home from '../pages/Home.vue'
import RecipeDetail from '../pages/RecipeDetail.vue'
import Collection from '../pages/Collection.vue'

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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router