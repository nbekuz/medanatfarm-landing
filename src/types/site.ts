export type SocialType = 'telegram' | 'max' | 'youtube' | 'instagram'
export type ContactType =
  | 'phone'
  | 'email'
  | 'whatsapp'
  | 'telegram'
  | 'max'
  | SocialType

export interface FaqItem {
  id: string
  question: string
  answer: string
  sortOrder?: number
}

export interface SiteSocial {
  type: SocialType
  url: string
  label?: string
}

export interface SiteContactItem {
  id: string
  type: ContactType | string
  section?: 'contact' | 'social'
  value: string
  url?: string
  label?: string
  sortOrder?: number
}

export interface SiteContacts {
  phone?: string | null
  email?: string | null
  whatsapp?: string | null
  contacts?: SiteContactItem[]
  items?: SiteContactItem[]
  socials?: SiteSocial[]
}

export interface SitePage {
  key: string
  title: string
  body: string
}

export type SitePageKey = 'TERMS' | 'PRIVACY'

export interface SiteStoreLink {
  type: string
  url: string
}

export interface SiteStores {
  appStore: SiteStoreLink | null
  ruStore: SiteStoreLink | null
}
