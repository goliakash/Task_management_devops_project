import axios from 'axios'

const TOKEN_KEY = 'token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export async function login(credentials) {
  const response = await api.post('/auth/login', credentials)

  if (response.data?.token) {
    setToken(response.data.token)
  }

  return response.data
}

export async function register(userData) {
  const response = await api.post('/auth/register', userData)

  if (response.data?.token) {
    setToken(response.data.token)
  }

  return response.data
}

export async function getTasks() {
  const response = await api.get('/tasks')
  return response.data
}

export async function createTask(taskData) {
  const response = await api.post('/tasks', taskData)
  return response.data
}

export async function updateTask(taskId, taskData) {
  const response = await api.put(`/tasks/${taskId}`, taskData)
  return response.data
}

export async function deleteTask(taskId) {
  const response = await api.delete(`/tasks/${taskId}`)
  return response.data
}

export default api
