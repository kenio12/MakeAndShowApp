<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="brand">
        <span class="brand-text">
          <span class="brand-full-text">俺のアプリ</span>
          <button class="mobile-brand-btn">
            <span class="mobile-brand-text">俺</span>
          </button>
        </span>
      </router-link>

      <div class="nav-buttons">
        <!-- 投稿ボタン（常に表示） -->
        <router-link to="/post-app">
          <button class="btn btn-primary">
            <span class="btn-text">アプリを投稿</span>
            <span class="btn-icon">⚡</span>
          </button>
        </router-link>

        <!-- 認証関連のボタン -->
        <template v-if="authStore.isAuthenticated">
          <button @click="handleLogout" class="btn btn-red">
            <span class="btn-text">ログアウト</span>
            <span class="btn-icon">🚪</span>
          </button>
        </template>
        <template v-else>
          <router-link to="/login">
            <button class="btn btn-blue">
              <span class="btn-text">ログイン</span>
              <span class="btn-icon">🔑</span>
            </button>
          </router-link>
          <router-link to="/signup">
            <button class="btn btn-green">
              <span class="btn-text">新規登録</span>
              <span class="btn-icon">✨</span>
            </button>
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
  background-color: #2B6CB0;
  padding: 0 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #2C5282;
}

.container {
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
}

.brand {
  text-decoration: none;
  transition: opacity 0.2s;
}

.brand:hover {
  opacity: 0.9;
}

.brand-text {
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.brand-full-text {
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-green {
  background-color: #48BB78;
  color: white;
}

.btn-blue {
  background-color: #3182CE;
  color: white;
}

.btn-red {
  background-color: #E53E3E;
  color: white;
}

.btn-green:hover {
  background-color: #38A169;
}

.btn-blue:hover {
  background-color: #2B6CB0;
}

.btn-red:hover {
  background-color: #C53030;
}

.btn-icon {
  font-size: 1.2rem;
  display: none;  /* PCではアイコンを非表示 */
}

/* スマホ表示用のメディアクエリ */
@media (max-width: 640px) {
  .btn-text {
    display: none;  /* スマホではテキストを非表示 */
  }

  .btn-icon {
    display: block;  /* スマホではアイコンを表示 */
  }

  .btn {
    padding: 0.5rem;  /* パディングを調整 */
    min-width: 2.5rem;  /* 最小幅を設定 */
    justify-content: center;  /* アイコンを中央寄せ */
  }

  .nav-buttons {
    gap: 0.5rem;  /* ボタン間の間隔を縮める */
  }

  .brand-full-text {
    display: none;
  }
  
  .brand-text {
    gap: 0.25rem;
  }

  .brand-icon {
    font-size: 1.4rem;
  }
}

.btn-primary {
  background-color: #805AD5;  /* 紫色 */
  color: white;
}

.btn-primary:hover {
  background-color: #6B46C1;
}

/* リンクの下線を削除 */
.nav-buttons a {
  text-decoration: none;
}

.brand {
  text-decoration: none;
  transition: opacity 0.2s;
}

.brand:hover {
  opacity: 0.9;
}

.mobile-brand-btn {
  display: none;  /* PCでは非表示 */
  background-color: #4A5568;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  align-items: center;
  gap: 0.5rem;
}

.mobile-brand-btn:hover {
  background-color: #2D3748;
}

.mobile-brand-text {
  display: inline-block;
  vertical-align: middle;
}

/* スマホ表示用のメディアクエリ */
@media (max-width: 640px) {
  .brand-full-text {
    display: none;  /* PCテキストを非表示 */
  }

  .mobile-brand-btn {
    display: flex;  /* スマホではボタンを表示 */
  }

  .brand-text {
    gap: 0.25rem;
  }

  .brand-icon {
    font-size: 1.2rem;
  }
}
</style> 