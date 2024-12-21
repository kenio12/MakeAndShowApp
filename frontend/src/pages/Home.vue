<template>
  <div class="home-container">
    <div class="container">
      <div class="header">
        <h1 class="title">🏴‍☠️ 俺のアプリ 💀</h1>
        <p class="subtitle">作ったアプリを見せてやる！</p>
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
          <p class="app-creator">作成者: {{ app.user_id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface App {
  _id: string
  name: string
  description: string
  demo_url?: string
  source_url?: string
  screenshots: string[]
  created_at: string
  user_id: string
}

const apps = ref<App[]>([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/apps/')
    apps.value = await response.json()
  } catch (error) {
    console.error('アプリの取得に失敗しました:', error)
  }
})
</script>

<style scoped>
.home-container {
  background-color: #EBF8FF;
  min-height: 100vh;
  padding: 2.5rem 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #4A5568;
}

.apps-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.app-card {
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.3s;
}

.app-card:hover {
  transform: translateY(-4px);
}

.app-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.screenshot-container {
  margin-bottom: 1rem;
  border-radius: 0.375rem;
  overflow: hidden;
  position: relative;
  width: 100%;
  max-height: 500px;
}

.screenshot {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 500px;
  margin: auto;
  display: block;
  object-fit: contain;
  background-color: #F7FAFC;
}

.app-description {
  color: #4A5568;
  margin-bottom: 1rem;
}

.app-creator {
  font-size: 0.875rem;
  color: #718096;
}
</style> 