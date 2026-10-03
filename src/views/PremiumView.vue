<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Button, message, Spin } from 'ant-design-vue'
import { CheckOutlined, CrownOutlined } from '@ant-design/icons-vue'
import { paymentsApi } from '@/api/payments'
import { useAuthStore } from '@/stores/auth'

type PlanCode = 'PREMIUM_MONTHLY' | 'PREMIUM_YEARLY'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const selected = ref<PlanCode>('PREMIUM_YEARLY')
const paying = ref(false)
const ready = ref(false)

const benefits = [
  'Все видео и конспекты',
  'Интерактивные материалы',
  'Постоянные новые видео',
]

const endsLabel = computed(() => {
  const raw = auth.subscriptionEndsAt
  if (!raw) return null
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

onMounted(async () => {
  const { plan } = auth.hydrateFromQuery()
  if (plan === 'PREMIUM_MONTHLY' || plan === 'PREMIUM_YEARLY') {
    selected.value = plan
  } else if (typeof route.query.plan === 'string') {
    if (route.query.plan === 'PREMIUM_MONTHLY' || route.query.plan === 'PREMIUM_YEARLY') {
      selected.value = route.query.plan
    }
  }

  await auth.bootstrap()
  if (auth.isAuthenticated) {
    try {
      await auth.fetchMe()
    } catch {
      /* ignore */
    }
  }
  ready.value = true
})

function goLogin() {
  void router.push({
    name: 'login',
    query: { redirect: `/premium?plan=${selected.value}` },
  })
}

async function pay() {
  if (!auth.isAuthenticated) {
    goLogin()
    return
  }
  if (auth.hasPremium) {
    message.info('Подписка уже активна')
    return
  }

  paying.value = true
  try {
    const result = await paymentsApi.checkout({
      planCode: selected.value,
      returnUrl: 'https://medanatfarm.ru/premium/return/',
    })

    if (result.confirmationUrl) {
      window.location.href = result.confirmationUrl
      return
    }

    await auth.fetchMe()
    message.success('Premium активирован')
  } catch (e: unknown) {
    const code = (e as { response?: { data?: { code?: string; message?: string } } })
      ?.response?.data
    if (code?.code === 'SUBSCRIPTION_ACTIVE') {
      message.info('Подписка уже активна')
      await auth.fetchMe()
    } else {
      message.error(code?.message || 'Не удалось начать оплату')
    }
  } finally {
    paying.value = false
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <Spin :spinning="!ready" size="large">
        <div class="premium">
          <div class="hero-card">
            <div class="hero-card__badge">
              <CrownOutlined />
              Premium
            </div>
            <h1 class="page-title">Полный доступ к учебным материалам</h1>
            <p class="lead">
              Оформите подписку на сайте — без повторного входа, если вы пришли из приложения.
            </p>
            <ul class="benefits">
              <li v-for="item in benefits" :key="item">
                <CheckOutlined class="benefits__icon" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-if="auth.hasPremium" class="status-card">
            <h2>Подписка активна</h2>
            <p v-if="endsLabel">Действует до {{ endsLabel }}</p>
            <p class="muted">
              Новую подписку можно оформить после окончания текущей. Повторная оплата недоступна.
            </p>
            <div class="actions">
              <RouterLink to="/profile" class="btn btn--ghost">Профиль</RouterLink>
              <a href="/#download" class="btn btn--primary">Открыть приложение</a>
            </div>
          </div>

          <template v-else>
            <h2 class="plans-title">Выберите план</h2>
            <div class="plans">
              <button
                type="button"
                class="plan"
                :class="{ 'plan--active': selected === 'PREMIUM_MONTHLY' }"
                @click="selected = 'PREMIUM_MONTHLY'"
              >
                <div class="plan__name">На месяц</div>
                <div class="plan__price">399₽</div>
                <div class="plan__note">Гибкая подписка</div>
              </button>
              <button
                type="button"
                class="plan"
                :class="{ 'plan--active': selected === 'PREMIUM_YEARLY' }"
                @click="selected = 'PREMIUM_YEARLY'"
              >
                <div class="plan__badge">Выгодно</div>
                <div class="plan__name">На год</div>
                <div class="plan__price">2990₽</div>
                <div class="plan__note">≈249₽/мес</div>
              </button>
            </div>

            <Button
              type="primary"
              size="large"
              class="pay-btn"
              :loading="paying"
              block
              @click="pay"
            >
              {{ auth.isAuthenticated ? 'Оплатить Premium' : 'Войти и оплатить' }}
            </Button>

            <p v-if="!auth.isAuthenticated" class="login-hint">
              Уже есть аккаунт?
              <a href="#" @click.prevent="goLogin">Войти</a>
            </p>
          </template>

          <div class="docs">
            <span>Документы:</span>
            <RouterLink to="/offer">Публичная оферта</RouterLink>
            <RouterLink to="/terms">Условия</RouterLink>
            <RouterLink to="/privacy">Конфиденциальность</RouterLink>
          </div>
        </div>
      </Spin>
    </div>
  </section>
</template>

<style scoped lang="scss">
.premium {
  max-width: 720px;
  margin-inline: auto;
}

.hero-card {
  background: #0b1220;
  color: #f5f8fa;
  border-radius: 22px;
  padding: 1.5rem 1.4rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(201, 162, 74, 0.45);
}

.hero-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #e0b45a;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.page-title {
  margin: 0 0 0.6rem;
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  color: #fff;
}

.lead {
  margin: 0 0 1rem;
  color: rgba(245, 248, 250, 0.78);
  line-height: 1.45;
}

.benefits {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.benefits li {
  display: flex;
  gap: 0.55rem;
  align-items: flex-start;
}

.benefits__icon {
  color: #e0b45a;
  margin-top: 0.15rem;
}

.plans-title {
  margin: 0 0 0.85rem;
  font-size: 1.25rem;
}

.plans {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-bottom: 1.1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.plan {
  text-align: left;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  border-radius: 16px;
  padding: 1rem 1rem 0.9rem;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &--active {
    border-color: #c9a24a;
    box-shadow: 0 0 0 3px rgba(201, 162, 74, 0.18);
  }
}

.plan__badge {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #7a5a12;
  background: #ffe9a8;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
}

.plan__name {
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.plan__price {
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.plan__note {
  color: #667085;
  margin-top: 0.2rem;
  font-size: 0.92rem;
}

.pay-btn {
  height: 48px;
  font-weight: 700;
}

.login-hint {
  margin: 0.85rem 0 0;
  text-align: center;
  color: #667085;
}

.status-card {
  background: #fff;
  border: 1px solid rgba(54, 224, 176, 0.35);
  border-radius: 18px;
  padding: 1.25rem 1.2rem;
  margin-bottom: 1rem;

  h2 {
    margin: 0 0 0.35rem;
    color: #0f9f78;
  }

  p {
    margin: 0 0 0.45rem;
  }
}

.muted {
  color: #667085;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1rem;
}

.docs {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  color: #667085;
  font-size: 0.95rem;
}
</style>
