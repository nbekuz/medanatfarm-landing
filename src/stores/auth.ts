import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authApi } from '@/api/auth'
import {
  clearStoredTokens,
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredTokens,
  setUnauthorizedHandler,
} from '@/api/client'
import { usersApi, type UpdateProfilePayload } from '@/api/users'
import {
  displayNameOf,
  subscriptionEndsAtOf,
  type MeUser,
} from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(getStoredAccessToken())
  const refreshToken = ref<string | null>(getStoredRefreshToken())
  const me = ref<MeUser | null>(null)
  const bootstrapped = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(accessToken.value))
  const hasPremium = computed(() => Boolean(me.value?.hasPremium))
  const displayName = computed(() => displayNameOf(me.value))
  const subscriptionEndsAt = computed(() => subscriptionEndsAtOf(me.value))

  function applyTokens(access: string, refresh?: string | null) {
    accessToken.value = access
    if (refresh) refreshToken.value = refresh
    setStoredTokens(access, refresh)
  }

  function clearSession() {
    accessToken.value = null
    refreshToken.value = null
    me.value = null
    clearStoredTokens()
  }

  async function fetchMe() {
    if (!accessToken.value) {
      me.value = null
      return null
    }
    me.value = await usersApi.me()
    return me.value
  }

  /**
   * Read tokens from URL query, persist, strip them from the address bar.
   * Supports: access_token, refresh_token, plan (plan left for the page).
   */
  function hydrateFromQuery(search: string = window.location.search): {
    plan: string | null
    hydrated: boolean
  } {
    const params = new URLSearchParams(search)
    const access =
      params.get('access_token') ||
      params.get('accessToken') ||
      params.get('token')
    const refresh =
      params.get('refresh_token') || params.get('refreshToken')
    const plan = params.get('plan')

    let hydrated = false
    if (access && access.trim()) {
      applyTokens(access.trim(), refresh?.trim() || null)
      hydrated = true
    }

    if (hydrated || plan) {
      params.delete('access_token')
      params.delete('accessToken')
      params.delete('token')
      params.delete('refresh_token')
      params.delete('refreshToken')
      // Keep plan in URL for UX (optional) — strip sensitive only
      const next = params.toString()
      const path = `${window.location.pathname}${next ? `?${next}` : ''}${window.location.hash}`
      window.history.replaceState({}, '', path)
    }

    return { plan: plan?.trim() || null, hydrated }
  }

  async function bootstrap() {
    if (bootstrapped.value) return
    setUnauthorizedHandler(() => {
      clearSession()
    })

    hydrateFromQuery()

    if (accessToken.value) {
      loading.value = true
      try {
        await fetchMe()
      } catch {
        clearSession()
      } finally {
        loading.value = false
      }
    }

    bootstrapped.value = true
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const tokens = await authApi.login(email.trim(), password)
      applyTokens(tokens.accessToken, tokens.refreshToken)
      await fetchMe()
    } catch (e: unknown) {
      clearSession()
      const msg =
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'Неверный email или пароль'
      error.value = typeof msg === 'string' ? msg : 'Неверный email или пароль'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(payload: UpdateProfilePayload) {
    me.value = await usersApi.updateProfile(payload)
    return me.value
  }

  function logout() {
    clearSession()
  }

  return {
    accessToken,
    refreshToken,
    me,
    bootstrapped,
    loading,
    error,
    isAuthenticated,
    hasPremium,
    displayName,
    subscriptionEndsAt,
    hydrateFromQuery,
    bootstrap,
    login,
    logout,
    fetchMe,
    updateProfile,
    applyTokens,
  }
})
