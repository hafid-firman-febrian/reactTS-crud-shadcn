import axios from "axios"

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000, // 10 detik
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
})

export default api
