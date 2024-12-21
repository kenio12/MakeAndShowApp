<template>
  <div class="verification-container">
    <div class="verification-box">
      <h1 class="title">メール認証</h1>
      <div v-if="isLoading" class="message">
        認証中...
      </div>
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-else class="success-message">
        {{ message }}
      </div>
      <router-link to="/login" class="btn btn-primary">
        ログインページへ
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(true)
const error = ref('')
const message = ref('')

onMounted(async () => {
  try {
    const token = route.query.token as string
    if (!token) {
      throw new Error('認証トークンが見つかりません')
    }

    const response = await fetch(`http://localhost:8000/api/auth/verify-email/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.detail || 'メール認証に失敗しました')
    }

    message.value = 'メール認証が完了しました！'
  } catch (e) {
    error.value = e instanceof Error ? e.message : '予期せぬエラーが発生しました'
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.verification-container {
  min-height: 100vh;
  padding: 2.5rem 1rem;
  background-color: var(--color-background);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.verification-box {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 32rem;
  text-align: center;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.message {
  margin-bottom: 1rem;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}

.success-message {
  color: green;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
}
</style> 