export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type MeUser = {
  id: string
  email: string
  displayName?: string | null
  firstName?: string | null
  lastName?: string | null
  avatarUrl?: string | null
  hasPremium: boolean
  subscriptionEndsAt?: string | null
  profile?: {
    displayName?: string | null
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    bio?: string | null
  } | null
  subscriptions?: Array<{
    endsAt?: string | null
    status?: string | null
  }>
}

export function displayNameOf(me: MeUser | null | undefined): string {
  if (!me) return 'Пользователь'
  const fromProfile = me.profile?.displayName?.trim()
  if (fromProfile) return fromProfile
  const display = me.displayName?.trim()
  if (display) return display
  const parts = [me.firstName ?? me.profile?.firstName, me.lastName ?? me.profile?.lastName]
    .map((s) => s?.trim())
    .filter(Boolean) as string[]
  if (parts.length) return parts.join(' ')
  const local = me.email.split('@')[0]
  return local || 'Пользователь'
}

export function subscriptionEndsAtOf(me: MeUser | null | undefined): string | null {
  if (!me) return null
  if (me.subscriptionEndsAt) return me.subscriptionEndsAt
  const first = me.subscriptions?.[0]?.endsAt
  return first ?? null
}
