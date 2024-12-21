import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post-app',
      name: 'PostApp',
      component: () => import('@/pages/PostApp.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/pages/Signup.vue')
    },
    {
      path: '/verify-email',
      name: 'EmailVerification',
      component: () => import('@/pages/EmailVerification.vue')
    }
  ]
})

export default router 