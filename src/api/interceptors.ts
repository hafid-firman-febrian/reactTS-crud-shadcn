import api from "./axiosInstance"

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logika logout jika token kadaluwarsa
      console.error("Sesi habis, silakan login ulang.")
    }
    return Promise.reject(error)
  }
)
