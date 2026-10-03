import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { siteApi } from '@/api/site'
import type {
  FaqItem,
  SiteContacts,
  SitePage,
  SitePageKey,
  SiteStores,
} from '@/types/site'

export const useSiteStore = defineStore('site', () => {
  const faq = ref<FaqItem[]>([])
  const contacts = ref<SiteContacts>({ socials: [] })
  const stores = ref<SiteStores>({ appStore: null, ruStore: null })
  const pages = ref<Record<string, SitePage>>({})

  const loading = ref(false)
  const error = ref<string | null>(null)

  const faqPreview = computed(() =>
    [...faq.value]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .slice(0, 3),
  )

  const visibleContacts = computed(() => {
    const list = contacts.value.contacts ?? contacts.value.items ?? []
    return [...list]
      .filter((item) => (item.url || item.value)?.trim())
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  })

  const visibleSocials = computed(
    () => contacts.value.socials?.filter((item) => item.url?.trim()) ?? [],
  )

  const hasStoreBadges = computed(
    () => Boolean(stores.value.appStore?.url || stores.value.ruStore?.url),
  )

  async function loadFaq() {
    faq.value = await siteApi.fetchFaq()
  }

  async function loadContacts() {
    contacts.value = await siteApi.fetchContacts()
  }

  async function loadStores() {
    stores.value = await siteApi.fetchStores()
  }

  async function loadPage(key: SitePageKey): Promise<SitePage> {
    if (pages.value[key]) return pages.value[key]
    const page = await siteApi.fetchPage(key)
    pages.value[key] = page
    return page
  }

  async function bootstrap() {
    if (loading.value) return
    loading.value = true
    error.value = null

    try {
      await Promise.all([loadFaq(), loadContacts(), loadStores()])
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Не удалось загрузить данные сайта'
    } finally {
      loading.value = false
    }
  }

  return {
    faq,
    contacts,
    stores,
    pages,
    loading,
    error,
    faqPreview,
    visibleContacts,
    visibleSocials,
    hasStoreBadges,
    loadFaq,
    loadContacts,
    loadStores,
    loadPage,
    bootstrap,
  }
})
