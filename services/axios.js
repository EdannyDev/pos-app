import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-pos-2tfc.onrender.com/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[AXIOS ERROR]:', error?.response?.data || error.message || error)
    return Promise.reject(error)
  }
)

export default axiosInstance