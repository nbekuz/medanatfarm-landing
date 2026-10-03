<script setup lang="ts">
import { Collapse, CollapsePanel, Spin } from 'ant-design-vue'
import { computed, onMounted } from 'vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

const items = computed(() =>
  [...siteStore.faq].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
)

onMounted(async () => {
  if (!siteStore.faq.length) {
    try {
      await siteStore.loadFaq()
    } catch {
      /* handled in template */
    }
  }
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="section-title">Часто задаваемые вопросы</h1>
      <p class="section-subtitle">
        Ответы на популярные вопросы о Medanatfarm и мобильном приложении.
      </p>

      <Spin :spinning="siteStore.loading" class="page-spin" size="large">
        <div class="page-card">
          <Collapse v-if="items.length" accordion>
            <CollapsePanel
              v-for="item in items"
              :key="item.id"
              :header="item.question"
            >
              <div class="faq-answer">{{ item.answer }}</div>
            </CollapsePanel>
          </Collapse>
          <div v-else class="empty-state">
            {{
              siteStore.loading ? '' : 'Пока нет опубликованных вопросов.'
            }}
          </div>
        </div>
      </Spin>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-answer {
  color: #667085;
  line-height: 1.65;
  white-space: pre-wrap;
}
</style>
