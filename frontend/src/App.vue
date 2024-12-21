<template>
  <div class="app-container">
    <!-- ナビゲーションバーは常に表示 -->
    <Navbar />
    
    <!-- メインコンテンツ部分 -->
    <main class="main-content">
      <template v-if="!isLoading">
        <router-view></router-view>
      </template>
      <div v-else class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/api'
import Navbar from '@/components/Navbar.vue'

const authStore = useAuthStore()
const isLoading = ref(true)

// ページ読み込み時にセッションを復元
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await api.get('/api/auth/verify-session')
      if (response.data.user) {
        authStore.updateUser(response.data.user)
        authStore.updateAuthenticated(true)
      }
    }
  } catch (error) {
    console.error('Session restoration failed:', error)
    localStorage.removeItem('token')
    authStore.updateUser(null)
    authStore.updateAuthenticated(false)
  } finally {
    isLoading.value = false  // 処理完了後にローディングを終了
  }
})
</script>

<style>
/* グローバルスタイル */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #EBF8FF;  /* 背景色を設定 */
}

.main-content {
  padding-top: 60px;  /* marginからpaddingに変更 */
  flex: 1;
  width: 100%;
  position: relative;
  overflow-y: auto;  /* スクロール可能に */
}

.loading-overlay {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #EBF8FF;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #E2E8F0;
  border-top: 5px solid #3182CE;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
