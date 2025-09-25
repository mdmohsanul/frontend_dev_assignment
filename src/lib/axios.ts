import axios from "axios"

const api = axios.create({
  baseURL: "/api", // base URL for Next.js API routes
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
