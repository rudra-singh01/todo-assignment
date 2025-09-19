import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  logout: () => api.get('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
}

// Todo API calls
export const todoAPI = {
  getAllTodos: () => api.get('/todo/get-all'),
  createTodo: (todoData) => api.post('/todo/create', todoData),
  updateTodo: (id, todoData) => api.post(`/todo/update-todo/${id}`, todoData),
  updateStatus: (id, status) => api.post(`/todo/update-status/${id}`, { completed: status }),
  deleteTodo: (id) => api.delete(`/todo/delete-todo/${id}`),
}

export default api
