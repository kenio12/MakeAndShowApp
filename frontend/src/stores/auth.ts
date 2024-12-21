import { defineStore } from 'pinia'

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
    }
  }
}) 