import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

// 获取所有食谱
export const getRecipes = () => {
  return service.get('/recipes.json')
}

// 根据ID获取食谱详情
export const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    getRecipes().then(res => {
      const recipe = res.data.find(item => item.id === Number(id))
      recipe ? resolve(recipe) : reject(new Error('食谱不存在'))
    }).catch(err => reject(err))
  })
}

// 根据食材筛选食谱
export const filterRecipesByIngredient = (ingredient) => {
  return new Promise((resolve, reject) => {
    getRecipes().then(res => {
      const filtered = res.data.filter(item => 
        item.ingredients.some(ing => ing.includes(ingredient))
      )
      resolve(filtered)
    }).catch(err => reject(err))
  })
}