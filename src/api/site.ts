import api from '@/api/client'
import type {
  FaqItem,
  SiteContacts,
  SitePage,
  SitePageKey,
  SiteStores,
} from '@/types/site'

export const siteApi = {
  fetchFaq() {
    return api.get<FaqItem[]>('/site/faq')
  },

  fetchContacts() {
    return api.get<SiteContacts>('/site/contacts')
  },

  fetchStores() {
    return api.get<SiteStores>('/site/stores')
  },

  fetchPage(key: SitePageKey) {
    return api.get<SitePage>(`/site/pages/${key}`)
  },
}
