import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collectedIds: []
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'recipe-collection',
        storage: localStorage
      }
    ]
  },
  getters: {
    isCollected: (state) => (id) => {
      // 强制转为数字，避免 ID 类型不匹配
      return state.collectedIds.includes(Number(id))
    },
    collectionCount: (state) => state.collectedIds.length
  },
  actions: {
    addCollection(id) {
      const numId = Number(id)
      if (!this.collectedIds.includes(numId)) {
        this.collectedIds.push(numId)
      }
    },
    removeCollection(id) {
      const numId = Number(id)
      this.collectedIds = this.collectedIds.filter(item => item !== numId)
    },
    clearCollection() {
      this.collectedIds = []
    }
  }
})