<template>
  <div class="home-container">
    <div class="container">
      <div class="header">
        <h1 class="title">🗡️ 俺のアプリ 🏴‍☠️</h1>
        <p class="subtitle">アプリ王になる！</p>
      </div>

      <div class="apps-grid">
        <div v-for="app in apps" :key="app._id" class="app-card">
          <h2 class="app-title">{{ app.name }}</h2>

          <div v-if="app.screenshots?.length" class="screenshot-container">
            <img
              :src="app.screenshots[0]"
              :alt="`${app.name}のスクリーンショット`"
              class="screenshot"
            />
          </div>

          <p class="app-description">{{ app.description }}</p>
          <p class="app-creator">作成者: {{ app.user?.display_name || app.user?.username || '不明なユーザー' }}</p>
        </div>
      </div>

      <div v-if="authStore.isAuthenticated" class="account-actions">
        <button @click="handleDeleteAccount" class="delete-account-btn">
          アカウントを完全に削除する
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

interface App {
  _id: string
  name: string
  description: string
  demo_url?: string
  source_url?: string
  screenshots: string[]
  created_at: string
  user?: {
    _id: string
    username: string
    display_name?: string
  }
}

const apps = ref<App[]>([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/apps/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (!response.ok) {
      throw new Error('アプリの取得に失敗しました')
    }
    
    apps.value = await response.json()
    console.log('取得したアプリ:', apps.value)  // デバッグ用
  } catch (error) {
    console.error('アプリの取得に失敗しました:', error)
  }
})

const handleDeleteAccount = async () => {
  if (confirm('本当にアカウントを削除しますか？\n\n⚠️ この操作は取り消せません。\n- すべての投稿が削除されます\n- アカウント情報が完全に削除されます')) {
    try {
      await authStore.deleteAccount()
      router.push('/')
    } catch (error) {
      console.error('Account deletion failed:', error)
    }
  }
}
</script>

<style scoped>
.home-container {
  background-color: #EBF8FF;
  min-height: 100vh;
  padding: 1.5rem 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2D3748;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.25rem;
  color: #4A5568;
}

.apps-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.app-card {
  padding: 1rem;
  border-radius: 0.75rem;
  background: white;
  transition: all 0.3s ease;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.app-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #3182CE;
  border-radius: 4px 0 0 4px;
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  border-color: #CBD5E0;
}

.app-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #2D3748;
  padding-left: 0.75rem;
}

.screenshot-container {
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  width: 100%;
  background: #F7FAFC;
  display: flex;
  justify-content: center;
  align-items: center;
}

.screenshot {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 100%;
  max-height: 400px;
  display: block;
  transition: transform 0.3s ease;
}

.screenshot:hover {
  transform: scale(1.02);
}

.app-description {
  color: #4A5568;
  margin: 0.75rem 0;
  line-height: 1.5;
  padding-left: 0.75rem;
}

.app-creator {
  font-size: 0.875rem;
  color: #718096;
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.app-creator::before {
  content: '👤';
  font-size: 1rem;
}

.account-actions {
  margin-top: 4rem;
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid #E2E8F0;
}

.delete-account-btn {
  background: none;
  border: none;
  color: #A0AEC0;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-account-btn:hover {
  color: #E53E3E;
  text-decoration: underline;
}

@media (max-width: 640px) {
  .account-actions {
    margin-top: 3rem;
    padding: 1.5rem 0;
  }
  
  .delete-account-btn {
    font-size: 0.75rem;
  }
}
</style> 