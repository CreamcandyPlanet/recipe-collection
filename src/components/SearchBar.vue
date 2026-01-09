<template>
  <el-input
    v-model="searchValue"
    placeholder="输入食材搜索食谱（如：番茄、鸡蛋）"
    :prefix="Search"
    class="search-input"
    @change="handleSearch"
  >
    <template #append>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </template>
  </el-input>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

// 搜索输入值
const searchValue = ref('')

// 向父组件传递搜索结果
const emit = defineEmits(['search'])

// 处理搜索逻辑
const handleSearch = () => {
  emit('search', searchValue.value.trim())
}
</script>

<style scoped lang="scss">
@import '@/assets/css/components/SearchBar.scss';
</style>