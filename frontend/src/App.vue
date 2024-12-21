<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<style>
:root {
  --navbar-height: 3rem;
}

#app {
  min-height: 100vh;
}

.main-content {
  padding-top: var(--navbar-height);  /* ナビバーの高さ分のパディング */
  min-height: calc(100vh - var(--navbar-height));  /* 最小の高さを設定 */
}
</style>
