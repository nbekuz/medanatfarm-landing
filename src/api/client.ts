import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const ACCESS_KEY = 'mf_access_token'
const REFRESH_KEY = 'mf_refresh_token'

const baseURL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export function getStoredAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_KEY)
  } catch {
    return null
  }
}

export function getStoredRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_KEY)
  } catch {
    return null
  }
}

export function setStoredTokens(accessToken: string, refreshToken?: string | null) {
  localStorage.setItem(ACCESS_KEY, accessToken)
  if (refreshToken) {
    localStorage.setItem(REFRESH_KEY, refreshToken)
  }
}

export function clearStoredTokens() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

type UnauthorizedHandler = () => void
let onUnauthorized: UnauthorizedHandler | null = null

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  onUnauthorized = handler
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStoredTokens()
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)

async function getRequest<T>(url: string): Promise<T> {
  const { data } = await apiClient.get<T>(url)
  return data
}

export const api = {
  get<T>(url: string) {
    return getRequest<T>(url)
  },
}

export default api
