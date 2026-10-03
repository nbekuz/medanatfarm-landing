import { apiClient } from '@/api/client'
import type { AuthTokens } from '@/types/auth'

export const authApi = {
  async login(email: string, password: string): Promise<AuthTokens> {
    const { data } = await apiClient.post<AuthTokens>('/auth/login', {
      email,
      password,
    })
    return data
  },

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const { data } = await apiClient.post<AuthTokens>('/auth/refresh', {
      refreshToken,
    })
    return data
  },
}
