<template>
  <div class="container">
    <div class="box">
      <h1>メール認証</h1>
      <div v-if="isLoading">認証中...</div>
      <div v-else-if="error" style="color: red">{{ error }}</div>
      <div v-else style="color: green">
        {{ message }}
        <div style="color: #666; margin-top: 16px">ホームページに移動します...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(true)
const error = ref('')
const message = ref('')

// 認証処理を一度だけ実行するフラグ
let isVerifying = false

onMounted(async () => {
  if (isVerifying) return
  isVerifying = true

  try {
    const token = route.query.token as string
    if (!token) {
      throw new Error('認証トークンが見つかりません')
    }

    const response = await fetch(`http://localhost:8000/api/auth/verify-email/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.detail || 'メール認証に失敗しました')
    }

    authStore.updateUser(data.user)
    authStore.updateAuthenticated(true)
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))

    message.value = 'メール認証が完了しました！'
    setTimeout(() => router.push('/'), 1500)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '予期せぬエラーが発生しました'
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.container { min-height: 100vh; display: flex; justify-content: center; align-items: center; }
.box { background: white; padding: 32px; border-radius: 8px; text-align: center; }
</style> 