<template>
  <div class="detail-page" v-if="recipe">
    <el-page-header content="食谱详情" @back="goBack" />
    <div class="detail-container">
      <div class="detail-header">
        <img :src="recipe.cover" alt="食谱封面" class="detail-cover" />
        <div class="header-info">
          <h1 class="detail-title">{{ recipe.title }}</h1>
          <div class="detail-meta">
            <el-tag>{{ recipe.difficulty }}</el-tag>
            <el-tag type="success">{{ recipe.cookTime }}分钟</el-tag>
          </div>
          <el-button 
            :icon="isCollected ? 'StarFilled' : 'Star'"
            :type="isCollected ? 'warning' : 'default'"
            class="collect-btn"
            @click="toggleCollection"
          >
            {{ isCollected ? '已收藏' : '收藏食谱' }}
          </el-button>
        </div>
      </div>
      <div class="detail-content">
        <div class="ingredients-section">
          <h2 class="section-title">食材准备</h2>
          <div class="ingredients-list">
            <el-tag v-for="(ing, idx) in recipe.ingredients" :key="idx" class="ingredient-tag">
              {{ ing }}
            </el-tag>
          </div>
        </div>
        <div class="steps-section">
          <h2 class="section-title">烹饪步骤</h2>
          <ol class="steps-list">
            <li v-for="(step, idx) in recipe.steps" :key="idx" class="step-item">
              <span class="step-number">{{ idx + 1 }}</span>
              <span class="step-content">{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <el-loading v-else fullscreen text="加载中..." />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCollectionStore } from '../stores/collectionStore'
import { getRecipeById } from '../api/recipeApi'
import { Star, StarFilled } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const collectionStore = useCollectionStore()

// 食谱详情数据
const recipe = ref(null)
// 收藏状态
const isCollected = ref(false)

// 加载食谱详情
onMounted(async () => {
  const id = route.params.id
  try {
    const data = await getRecipeById(id)
    recipe.value = data
    isCollected.value = collectionStore.isCollected(id)
  } catch (err) {
    console.error('加载食谱详情失败：', err)
    router.push('/') // 加载失败跳回首页
  }
})

// 切换收藏状态
const toggleCollection = () => {
  const id = recipe.value.id
  if (isCollected.value) {
    collectionStore.removeCollection(id)
  } else {
    collectionStore.addCollection(id)
  }
  isCollected.value = !isCollected.value
}

// 返回上一页
// 修复返回逻辑：若没有上一页，跳回首页
const goBack = () => {
  // 获取路由历史记录
  const history = window.history
  if (history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/components/RecipeDetail.scss';
</style>