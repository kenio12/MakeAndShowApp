<template>
  <div class="signup-container">
    <div class="form-box">
      <h1 class="title">サインアップ（新規登録）</h1>
      
      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="form-control">
          <label class="form-label">メールアドレス</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-input"
            required
          />
        </div>

        <div class="form-control">
          <label class="form-label">ユーザー名</label>
          <input
            v-model="formData.username"
            type="text"
            class="form-input"
            required
          />
        </div>

        <div class="form-control">
          <label class="form-label">パスワード</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-input"
            required
          />
        </div>

        <div class="button-group">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isLoading"
          >
            {{ isLoading ? '登録中...' : '登録する' }}
          </button>
          <router-link to="/" class="btn btn-secondary">
            キャンセル
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

const formData = ref({
  email: '',
  username: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    isLoading.value = true
    await authStore.register({
      email: formData.value.email,
      username: formData.value.username,
      password: formData.value.password
    })
    
    alert('確認メールを送信しました。メールを確認して登録を完了してください。')
    router.push('/login')
  } catch (error) {
    alert(error instanceof Error ? error.message : '予期せぬエラーが発生しました')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  padding: 2.5rem 1rem;
  background-color: var(--color-background);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form-box {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 32rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.button-group .btn {
  flex: 1;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 