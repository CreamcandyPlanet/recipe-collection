<template>
  <div class="collection-page">
    <el-page-header content="我的收藏" />
    <div class="collection-toolbar">
      <el-button type="danger" @click="clearCollection" icon="Delete">
        清空收藏夹
      </el-button>
      <span class="collection-count">共收藏 {{ collectionCount }} 个食谱</span>
    </div>
    <div class="recipe-list">
      <RecipeCard 
        v-for="recipe in collectedRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>
    <div class="empty-state" v-if="collectionCount === 0">
      <el-empty description="暂无收藏的食谱" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import { useCollectionStore } from '../stores/collectionStore'
import { getRecipes } from '../api/recipeApi'
import { ElMessage } from 'element-plus'

const collectionStore = useCollectionStore()

// 所有食谱数据
const allRecipes = ref([])
// 收藏的食谱
const collectedRecipes = ref([])
// 收藏数量
const collectionCount = ref(collectionStore.collectionCount)

// 加载所有食谱并筛选收藏项
const loadCollectedRecipes = () => {
  const collectedIds = collectionStore.collectedIds
  collectedRecipes.value = allRecipes.value.filter(recipe => 
    collectedIds.includes(recipe.id)
  )
  collectionCount.value = collectedRecipes.value.length
}

// 初始化加载
onMounted(async () => {
  try {
    const res = await getRecipes()
    allRecipes.value = res.data
    loadCollectedRecipes()
  } catch (err) {
    console.error('加载食谱失败：', err)
  }
})

// 监听收藏状态变化，实时更新列表
watch(
  () => collectionStore.collectedIds,
  () => {
    loadCollectedRecipes()
  },
  { deep: true }
)

// 清空收藏夹
const clearCollection = () => {
  collectionStore.clearCollection()
  ElMessage.success('收藏夹已清空')
}
</script>

<style scoped lang="scss">
@import '@/assets/css/components/Collection.scss';
</style>