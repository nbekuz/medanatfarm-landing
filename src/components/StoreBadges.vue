<script setup lang="ts">
import { computed } from 'vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

const badges = computed(() => {
  const list: Array<{
    key: 'appstore' | 'rustore'
    href: string
    eyebrow: string
    title: string
  }> = []

  if (siteStore.stores.appStore?.url) {
    list.push({
      key: 'appstore',
      href: siteStore.stores.appStore.url,
      eyebrow: 'Доступно в',
      title: 'App Store',
    })
  }
  if (siteStore.stores.ruStore?.url) {
    list.push({
      key: 'rustore',
      href: siteStore.stores.ruStore.url,
      eyebrow: 'Доступно в',
      title: 'RuStore',
    })
  }
  return list
})
</script>

<template>
  <div v-if="badges.length" class="store-badges">
    <a
      v-for="badge in badges"
      :key="badge.key"
      class="store-badge"
      :class="`store-badge--${badge.key}`"
      :href="badge.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${badge.eyebrow} ${badge.title}`"
    >
      <!-- RuStore: official-style SVG badge asset -->
      <img
        v-if="badge.key === 'rustore'"
        class="store-badge__asset"
        src="/rustore.svg"
        alt="Доступно в RuStore"
        width="168"
        height="56"
        decoding="async"
      />

      <template v-else>
        <span class="store-badge__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.2-3.5ZM14.6 6.3c.6-.7 1-1.7.9-2.7-0.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 .1 1.9-.5 2.6-1.2Z"
            />
          </svg>
        </span>
        <span class="store-badge__text">
          <span class="store-badge__eyebrow">{{ badge.eyebrow }}</span>
          <span class="store-badge__title">{{ badge.title }}</span>
        </span>
      </template>
    </a>
  </div>
</template>

<style scoped lang="scss">
.store-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.store-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  min-height: 48px;
  padding: 0.45rem 1rem 0.45rem 0.7rem;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  text-decoration: none;
  transition:
    transform 0.15s ease,
    background-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background: #1f2937;
    transform: translateY(-1px);
    text-decoration: none;
    color: #fff;
    box-shadow: 0 8px 20px rgba(17, 24, 39, 0.18);
  }

  &--rustore {
    padding: 0;
    background: transparent;
    min-height: 0;

    &:hover {
      background: transparent;
      box-shadow: none;
      opacity: 0.92;
    }
  }
}

.store-badge__asset {
  display: block;
  height: 48px;
  width: auto;
  border-radius: 10px;
}

.store-badge__icon {
  display: inline-flex;
  width: 1.65rem;
  height: 1.65rem;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.store-badge__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.store-badge__eyebrow {
  font-size: 0.68rem;
  opacity: 0.85;
  letter-spacing: 0.01em;
}

.store-badge__title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
</style>
