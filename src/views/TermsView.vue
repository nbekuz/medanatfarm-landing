<script setup lang="ts">
import { Spin } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useSiteStore } from '@/stores/site'
import type { SitePage } from '@/types/site'

const siteStore = useSiteStore()
const page = ref<SitePage | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

function looksLikeHtml(text: string) {
  return /<\/?[a-z][\s\S]*>/i.test(text)
}

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    page.value = await siteStore.loadPage('TERMS')
  } catch {
    error.value = 'Страница условий использования временно недоступна.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="section">
    <div class="container">
      <Spin :spinning="loading" class="page-spin" size="large">
        <div v-if="page" class="page-card">
          <h1 class="page-title">{{ page.title }}</h1>
          <div
            v-if="looksLikeHtml(page.body)"
            class="prose"
            v-html="page.body"
          />
          <div v-else class="text-pre">{{ page.body }}</div>
        </div>
        <div v-else-if="error && !loading" class="page-card empty-state">
          {{ error }}
        </div>
        <div v-else class="page-spin__placeholder" aria-hidden="true" />
      </Spin>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-title {
  margin: 0 0 1.25rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
}
</style>
