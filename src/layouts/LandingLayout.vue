<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue'
import { Button, Drawer } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BrandIcon from '@/components/BrandIcon.vue'
import { useAuthStore } from '@/stores/auth'
import { useSiteStore } from '@/stores/site'
import type { SocialType } from '@/types/site'

type NavItem = {
  label: string
  name: string
  to?: string
  href?: string
}

const route = useRoute()
const router = useRouter()
const siteStore = useSiteStore()
const auth = useAuthStore()
const drawerOpen = ref(false)

const navLinks: NavItem[] = [
  { to: '/', label: 'Главная', name: 'home' },
  { href: '/#features', label: 'Возможности', name: 'features' },
  { to: '/premium', label: 'Premium', name: 'premium' },
  { to: '/faq', label: 'FAQ', name: 'faq' },
  { to: '/terms', label: 'Условия', name: 'terms' },
  { to: '/privacy', label: 'Конфиденциальность', name: 'privacy' },
]

const footerNav = [
  { to: '/', label: 'Главная' },
  { href: '/#features', label: 'Возможности' },
  { to: '/premium', label: 'Premium' },
  { to: '/faq', label: 'FAQ' },
]

const footerDocs = [
  { to: '/offer', label: 'Оферта' },
  { to: '/terms', label: 'Условия' },
  { to: '/privacy', label: 'Конфиденциальность' },
]

const socialLabels: Record<SocialType, string> = {
  telegram: 'Telegram',
  max: 'MAX',
  youtube: 'YouTube',
  instagram: 'Instagram',
}

const currentYear = new Date().getFullYear()

const isActive = (name: string) => {
  if (name === 'features') return false
  return route.name === name
}

const telegramSocial = computed(() =>
  siteStore.visibleSocials.find((s) => s.type === 'telegram'),
)

function closeDrawer() {
  drawerOpen.value = false
}

function logout() {
  auth.logout()
  closeDrawer()
  void router.push('/')
}

onMounted(() => {
  void siteStore.bootstrap()
  void auth.bootstrap()
})
</script>

<template>
  <div class="landing">
    <header class="navbar">
      <div class="container navbar__inner">
        <RouterLink to="/" class="brand" @click="closeDrawer">
          <img
            class="brand__mark"
            src="/logo.png"
            alt="Medanatfarm"
            width="36"
            height="36"
          />
          <span class="brand__name">Medanatfarm</span>
        </RouterLink>

        <nav class="navbar__links" aria-label="Основная навигация">
          <template v-for="link in navLinks" :key="link.name">
            <RouterLink
              v-if="link.to"
              :to="link.to"
              class="navbar__link"
              :class="{ 'navbar__link--active': isActive(link.name) }"
            >
              {{ link.label }}
            </RouterLink>
            <a v-else :href="link.href" class="navbar__link">
              {{ link.label }}
            </a>
          </template>
        </nav>

        <div class="navbar__actions">
          <RouterLink to="/premium" class="btn btn--ghost navbar__link-btn">
            Premium
          </RouterLink>
          <template v-if="auth.isAuthenticated">
            <RouterLink to="/profile" class="btn btn--ghost navbar__link-btn">
              {{ auth.displayName }}
            </RouterLink>
            <button type="button" class="btn btn--ghost navbar__link-btn" @click="logout">
              Выйти
            </button>
          </template>
          <RouterLink v-else to="/login" class="btn btn--ghost navbar__link-btn">
            Войти
          </RouterLink>
          <a href="/#download" class="btn btn--primary navbar__cta">
            Скачать приложение
          </a>
          <button
            type="button"
            class="navbar__burger"
            aria-label="Открыть меню"
            @click="drawerOpen = true"
          >
            <MenuOutlined />
          </button>
        </div>
      </div>
    </header>

    <Drawer
      v-model:open="drawerOpen"
      placement="right"
      title="Меню"
      :width="300"
    >
      <nav class="drawer-nav" aria-label="Мобильная навигация">
        <template v-for="link in navLinks" :key="link.name">
          <RouterLink
            v-if="link.to"
            :to="link.to"
            class="drawer-nav__link"
            :class="{ 'drawer-nav__link--active': isActive(link.name) }"
            @click="closeDrawer"
          >
            {{ link.label }}
          </RouterLink>
          <a
            v-else
            :href="link.href"
            class="drawer-nav__link"
            @click="closeDrawer"
          >
            {{ link.label }}
          </a>
        </template>
        <template v-if="auth.isAuthenticated">
          <RouterLink to="/profile" class="drawer-nav__link" @click="closeDrawer">
            Профиль
          </RouterLink>
          <button type="button" class="drawer-nav__link drawer-nav__btn" @click="logout">
            Выйти
          </button>
        </template>
        <RouterLink v-else to="/login" class="drawer-nav__link" @click="closeDrawer">
          Войти
        </RouterLink>
        <Button type="primary" block href="/#download" @click="closeDrawer">
          Скачать приложение
        </Button>
      </nav>
    </Drawer>

    <main class="landing__main">
      <RouterView />
    </main>

    <footer class="footer">
      <div class="container footer__grid">
        <div class="footer__brand">
          <RouterLink to="/" class="brand brand--footer">
            <img
              class="brand__mark"
              src="/logo.png"
              alt="Medanatfarm"
              width="32"
              height="32"
            />
            <span class="brand__name">Medanatfarm</span>
          </RouterLink>
          <p class="footer__blurb">
            Платформа медицинского образования для врачей и фармацевтов.
          </p>
        </div>

        <div class="footer__column">
          <h3 class="footer__title">Навигация</h3>
          <ul class="footer__list">
            <li v-for="link in footerNav" :key="link.label">
              <RouterLink v-if="link.to" class="footer__nav-link" :to="link.to">
                {{ link.label }}
              </RouterLink>
              <a v-else class="footer__nav-link" :href="link.href">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div class="footer__column">
          <h3 class="footer__title">Документы</h3>
          <ul class="footer__list">
            <li v-for="link in footerDocs" :key="link.to">
              <RouterLink class="footer__nav-link" :to="link.to">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="footer__column">
          <h3 class="footer__title">Мы в соцсетях</h3>
          <ul class="footer__list footer__socials">
            <li v-if="telegramSocial">
              <a
                class="footer__social"
                :href="telegramSocial.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="footer__social-icon">
                  <BrandIcon name="telegram" />
                </span>
                <span>{{
                  telegramSocial.label || socialLabels.telegram
                }}</span>
              </a>
            </li>
            <li
              v-for="social in siteStore.visibleSocials.filter(
                (s) => s.type !== 'telegram',
              )"
              :key="social.type + social.url"
            >
              <a
                class="footer__social"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="footer__social-icon" :class="`is-${social.type}`">
                  <BrandIcon :name="social.type" />
                </span>
                <span>{{ social.label || socialLabels[social.type] }}</span>
              </a>
            </li>
            <li
              v-if="!siteStore.visibleSocials.length"
              class="footer__muted"
            >
              Скоро появятся
            </li>
          </ul>
        </div>
      </div>

      <div class="container footer__bottom">
        <p>© {{ currentYear }} Medanatfarm. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.landing__main {
  flex: 1;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
}

.navbar__inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 72px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  color: #111827;
  font-weight: 700;
  flex-shrink: 0;

  &:hover {
    text-decoration: none;
    color: #111827;
  }
}

.brand__mark {
  border-radius: 10px;
}

.brand__name {
  font-size: 1.05rem;
  letter-spacing: -0.02em;
}

.navbar__links {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  flex: 1;
}

.navbar__link {
  padding: 0.55rem 0.85rem;
  border-radius: 10px;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &--active,
  &:hover {
    color: #1677ff;
    background: #eef4ff;
    text-decoration: none;
  }
}

.navbar__actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__cta {
  display: none;
  min-height: 42px;
  padding: 0.55rem 1.1rem;
  font-size: 0.9rem;
}

.navbar__link-btn {
  display: none;
  min-height: 40px;
  padding: 0.45rem 0.85rem;
  font-size: 0.9rem;
  text-decoration: none;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drawer-nav__btn {
  border: none;
  background: transparent;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font: inherit;
}

.navbar__burger {
  border: none;
  background: transparent;
  font-size: 1.25rem;
  padding: 0.4rem;
  cursor: pointer;
  color: #111827;
  border-radius: 8px;

  &:hover {
    background: #f3f4f6;
  }

  &:focus-visible {
    outline: 2px solid #1677ff;
    outline-offset: 2px;
  }
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.drawer-nav__link {
  padding: 0.8rem 0.65rem;
  border-radius: 10px;
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;

  &--active,
  &:hover {
    color: #1677ff;
    background: #eef4ff;
    text-decoration: none;
  }
}

.footer {
  margin-top: auto;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  padding-top: 2.75rem;
}

.footer__grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 960px) {
    grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  }
}

.footer__blurb {
  margin: 0.85rem 0 0;
  color: #667085;
  line-height: 1.6;
  max-width: 22rem;
  font-size: 0.95rem;
}

.footer__title {
  margin: 0 0 0.85rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #344054;
}

.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.footer__nav-link {
  color: #667085;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #1677ff;
    text-decoration: none;
  }
}

.footer__socials {
  gap: 0.55rem;
}

.footer__social {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: #1f2937;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    color: #1677ff;
    text-decoration: none;
  }
}

.footer__social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  background: #e8f4fc;
  color: #229ed9;
  font-size: 0.95rem;

  &.is-youtube {
    background: #fdeceb;
    color: #ff0000;
  }

  &.is-instagram {
    background: #fceef5;
    color: #e1306c;
  }

  &.is-max {
    background: #eef2ff;
    color: #4f46e5;
  }
}

.footer__muted {
  color: #98a2b3;
  font-size: 0.9rem;
}

.footer__bottom {
  margin-top: 2rem;
  padding-block: 1.15rem;
  border-top: 1px solid #e5e7eb;
  color: #98a2b3;
  font-size: 0.875rem;
}

@media (min-width: 960px) {
  .navbar__links {
    display: flex;
  }

  .navbar__cta,
  .navbar__link-btn {
    display: inline-flex;
  }

  .navbar__burger {
    display: none;
  }
}
</style>
