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

        <div class="form-control">
          <label class="form-label">パスワード（確認用）</label>
          <input
            v-model="formData.passwordConfirm"
            type="password"
            class="form-input"
            required
          />
          <span v-if="passwordMismatch" class="error-text">
            パスワードが一致しません
          </span>
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
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

const formData = ref({
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
})

const passwordMismatch = computed(() => {
  return formData.value.password !== formData.value.passwordConfirm
})

const handleSubmit = async () => {
  if (passwordMismatch.value) {
    alert('パスワードが一致しません')
    return
  }

  try {
    isLoading.value = true
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
      credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || 'サインアップに失敗しました')
    }

    alert('サインアップが完了しました！メールを確認して、アカウントを有効化してください。')
    
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

.error-text {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style> 