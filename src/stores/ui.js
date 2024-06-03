import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    blockLoading: [],
    notice: {},
    error: {},
    opennames: [],
    activename:''
  }),
  actions: {
    loadingStart (id, loadingType) {
      if (loadingType === 'blocking') {
        this.blockLoading.push(id)
      }
    },
    loadingStop (id) {
      const index = this.blockLoading.findIndex((bl) => bl === id)
      if (index !== -1) {
        this.blockLoading.splice(index, 1)
      }
    },
    showNotice (notice) {
      this.notice = notice
    },
    showError (error) {
      this.error = error
    }
  }
})
