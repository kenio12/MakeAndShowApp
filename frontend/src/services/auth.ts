import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type RegisterData = {
  email: string
  username: string
  password: string
}

export const register = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/auth/register`, data)
  return response.data
} 