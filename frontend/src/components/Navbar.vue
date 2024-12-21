<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="brand">
        <span class="brand-text">🗡️ 俺のアプリ 🏴‍☠️</span>
      </router-link>

      <div class="nav-buttons">
        <!-- 認証済みの場合 -->
        <template v-if="authStore.isAuthenticated">
          <router-link to="/post-app">
            <button class="btn btn-green">アプリを紹介する</button>
          </router-link>
          <button @click="handleLogout" class="btn btn-red">
            ログアウト
          </button>
        </template>
        
        <!-- 未認証の場合 -->
        <template v-else>
          <router-link to="/login">
            <button class="btn btn-blue">ログイン</button>
          </router-link>
          <router-link to="/signup">
            <button class="btn btn-green">新規登録</button>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background-color: #EBF8FF;
  padding: 0 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #BEE3F8;
}

.container {
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
}

.brand-text {
  font-weight: bold;
  font-size: 1.25rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn-green {
  background-color: #48BB78;
  color: white;
}

.btn-blue {
  background-color: #4299E1;
  color: white;
}

.btn-red {
  background-color: #F56565;
  color: white;
}

.btn-green:hover {
  background-color: #38A169;
}

.btn-blue:hover {
  background-color: #3182CE;
}

.btn-red:hover {
  background-color: #E53E3E;
}
</style> 