<template>
  <el-card :body-style="{ padding: '16px' }" class="recipe-card">
    <div class="card-header">
      <img :src="recipe.cover" alt="食谱封面" class="cover-img" />
      <el-button 
        :icon="isCollected ? 'StarFilled' : 'Star'"
        :class="isCollected ? 'collected-btn' : 'collect-btn'"
        @click.stop="toggleCollection"
      />
    </div>
    <div class="card-body">
      <h3 class="recipe-title">{{ recipe.title }}</h3>
      <div class="recipe-meta">
        <span><el-icon><Clock /></el-icon> {{ recipe.cookTime }}分钟</span>
        <span><el-icon><User /></el-icon> {{ recipe.difficulty }}</span>
      </div>
      <div class="ingredients">
        <span class="label">食材：</span>
        <span class="ingredient-item" v-for="(ing, idx) in recipe.ingredients" :key="idx">
          {{ ing }}
          <span v-if="idx < recipe.ingredients.length - 1">、</span>
        </span>
      </div>
      <el-button type="primary" class="detail-btn" @click="goToDetail">查看详情</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCollectionStore } from '../stores/collectionStore'
import { Star, StarFilled, Clock, User } from '@element-plus/icons-vue'

const router = useRouter()
const collectionStore = useCollectionStore()

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const isCollected = ref(collectionStore.isCollected(props.recipe.id))

const toggleCollection = () => {
  const id = props.recipe.id
  if (isCollected.value) {
    collectionStore.removeCollection(id)
  } else {
    collectionStore.addCollection(id)
  }
  isCollected.value = !isCollected.value
}

// 跳转详情页：补充容错，确保 ID 存在
const goToDetail = () => {
  if (props.recipe.id) {
    router.push({ 
      name: 'RecipeDetail', 
      params: { id: props.recipe.id } 
    })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/components/RecipeCard.scss';
</style>