import { defineStore } from 'pinia'
import api from '@/utils/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),

  actions: {
    updateUser(user: any) {
      this.user = user
    },
    updateAuthenticated(status: boolean) {
      this.isAuthenticated = status
    },
    async logout() {
      try {
        await api.post('/api/auth/logout')
        
        // ローカルのステートをクリア
        this.user = null
        this.isAuthenticated = false
        
        // ローカルストレージもクリア（もし使ってたら）
        localStorage.removeItem('user')
        
      } catch (error) {
        console.error('Logout failed:', error)
        throw error
      }
    }
  }
}) 