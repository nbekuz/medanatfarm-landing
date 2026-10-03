import { apiClient } from '@/api/client'
import type { MeUser } from '@/types/auth'

export type UpdateProfilePayload = {
  firstName?: string
  lastName?: string
  displayName?: string
  phone?: string
  bio?: string
}

export const usersApi = {
  async me(): Promise<MeUser> {
    const { data } = await apiClient.get<MeUser>('/users/me')
    return data
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<MeUser> {
    const { data } = await apiClient.patch<MeUser>('/users/me', payload)
    return data
  },
}
