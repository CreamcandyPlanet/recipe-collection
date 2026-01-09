<template>
  <div class="home-page">
    <div class="search-container">
      <SearchBar @search="handleSearch" />
    </div>
    <div class="filter-result" v-if="searchValue">
      <p>搜索关键词：<span class="keyword">{{ searchValue }}</span>，找到 {{ filteredRecipes.length }} 个结果</p>
    </div>
    <div class="recipe-list">
      <RecipeCard 
        v-for="recipe in displayRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>
    <div class="empty-state" v-if="displayRecipes.length === 0">
      <el-empty description="暂无相关食谱" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import RecipeCard from '../components/RecipeCard.vue'
import { getRecipes, filterRecipesByIngredient } from '../api/recipeApi'

// 所有食谱数据
const allRecipes = ref([])
// 筛选后的食谱
const filteredRecipes = ref([])
// 搜索关键词
const searchValue = ref('')

// 显示的食谱（搜索时显示筛选结果，否则显示全部）
const displayRecipes = ref([])

// 初始化加载所有食谱
onMounted(async () => {
  try {
    const res = await getRecipes()
    allRecipes.value = res.data
    displayRecipes.value = allRecipes.value
  } catch (err) {
    console.error('加载食谱失败：', err)
  }
})

// 处理搜索
const handleSearch = async (value) => {
  searchValue.value = value
  if (!value) {
    displayRecipes.value = allRecipes.value
    return
  }
  try {
    const filtered = await filterRecipesByIngredient(value)
    filteredRecipes.value = filtered
    displayRecipes.value = filtered
  } catch (err) {
    console.error('搜索食谱失败：', err)
    displayRecipes.value = []
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/components/Home.scss';
</style>