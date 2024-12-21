<template>
  <div class="login-container">
    <div class="form-box">
      <h1 class="title">ログイン</h1>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-control">
          <label class="form-label">メールアドレス</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-input"
            required
            placeholder="example@email.com"
          />
        </div>

        <div class="form-control">
          <label class="form-label">パスワード</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-input"
            required
            placeholder="パスワードを入力"
          />
        </div>

        <div class="button-group">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isLoading"
          >
            {{ isLoading ? 'ログイン中...' : 'ログイン' }}
          </button>
        </div>

        <div class="signup-link">
          アカウントをお持ちでない方は
          <router-link to="/signup" class="link">
            新規登録
          </router-link>
          へ
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
  password: ''
})

const handleSubmit = async () => {
  try {
    isLoading.value = true
    console.log('ログイン試行:', { email: formData.value.email })  // デバッグ用

    await authStore.login({
      email: formData.value.email,
      password: formData.value.password
    })
    
    console.log('ログイン成功')  // デバッグ用
    router.push('/')  // ログイン成功後はホームページへ
  } catch (error) {
    console.error('ログインエラー:', error)  // デバッグ用
    alert(error instanceof Error ? error.message : 'ログインに失敗しました')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-group {
  margin-top: 1rem;
}

.button-group .btn {
  width: 100%;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.signup-link {
  margin-top: 1rem;
  text-align: center;
  color: var(--color-gray);
}

.link {
  color: var(--color-primary);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style> 