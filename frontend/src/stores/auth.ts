import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  username: string
  email: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const isAuthenticated = ref(!!localStorage.getItem('token'))

  async function login(credentials: LoginCredentials) {
    try {
      const formData = new FormData();
      formData.append('username', credentials.email);
      formData.append('password', credentials.password);

      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'ログインに失敗しました');
      }

      const data = await response.json();
      user.value = data.user;
      isAuthenticated.value = true;
      
      localStorage.setItem('token', data.access_token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  }

  async function register(data: RegisterData) {
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || '登録に失敗しました')
      }

      const result = await response.json()
      console.log('Registration response:', result)
      return result
    } catch (error) {
      console.error('登録エラー:', error)
      throw error
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }
}) 