<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Button, Spin } from 'ant-design-vue'
import { paymentsApi } from '@/api/payments'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()

const loading = ref(true)
const status = ref<'success' | 'pending' | 'failed' | 'error'>('pending')
const messageText = ref('Проверяем оплату…')

function paymentIdFromQuery(): string | null {
  const q = route.query
  const id =
    (typeof q.payment_id === 'string' && q.payment_id) ||
    (typeof q.paymentId === 'string' && q.paymentId) ||
    null
  return id?.trim() || null
}

function tryOpenApp(paymentId: string | null) {
  const query = paymentId ? `?payment_id=${encodeURIComponent(paymentId)}` : ''
  const customScheme = `medanatfarm://premium/return${query}`
  const intentUrl =
    `intent://medanatfarm.ru/premium/return/${query}` +
    '#Intent;scheme=https;package=com.nbek.medanatfarm;end'

  const ua = navigator.userAgent || ''
  const isAndroid = /Android/i.test(ua)
  window.location.href = isAndroid ? intentUrl : customScheme
}

onMounted(async () => {
  auth.hydrateFromQuery()
  await auth.bootstrap()

  const paymentId = paymentIdFromQuery()

  // Prefer opening the app quickly for installed clients.
  setTimeout(() => tryOpenApp(paymentId), 400)

  if (!auth.isAuthenticated) {
    loading.value = false
    status.value = 'pending'
    messageText.value =
      'Если приложение не открылось — войдите на сайте или откройте Medanatfarm вручную.'
    return
  }

  if (!paymentId) {
    loading.value = false
    status.value = 'pending'
    messageText.value =
      'Платёж обрабатывается. Откройте приложение — статус обновится автоматически.'
    return
  }

  try {
    const result = await paymentsApi.sync(paymentId)
    await auth.fetchMe()
    const st = (result.payment?.status || result.status || '').toUpperCase()
    if (st === 'SUCCEEDED' || auth.hasPremium) {
      status.value = 'success'
      messageText.value = 'Premium активирован. Можно вернуться в приложение.'
    } else if (st === 'FAILED' || st === 'CANCELLED') {
      status.value = 'failed'
      messageText.value = 'Оплата не завершена. Попробуйте ещё раз.'
    } else {
      status.value = 'pending'
      messageText.value =
        'Оплата обрабатывается. Через несколько секунд откройте приложение.'
    }
  } catch {
    status.value = 'error'
    messageText.value =
      'Не удалось проверить оплату на сайте. Откройте приложение — проверка продолжится там.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <Spin :spinning="loading" size="large">
          <h1 class="page-title">Возврат из оплаты</h1>
          <p class="lead">{{ messageText }}</p>

          <div class="actions">
            <Button type="primary" size="large" @click="tryOpenApp(paymentIdFromQuery())">
              Открыть Medanatfarm
            </Button>
            <RouterLink
              v-if="status === 'failed' || status === 'error'"
              to="/premium"
              class="btn btn--ghost"
            >
              К Premium
            </RouterLink>
            <RouterLink v-else-if="status === 'success'" to="/profile" class="btn btn--ghost">
              Профиль
            </RouterLink>
          </div>
        </Spin>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.card {
  max-width: 520px;
  margin-inline: auto;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 1.75rem 1.4rem;
  text-align: center;
  box-shadow: 0 12px 32px rgba(22, 119, 255, 0.06);
}

.page-title {
  margin: 0 0 0.75rem;
  font-size: 1.45rem;
}

.lead {
  margin: 0 0 1.25rem;
  color: #667085;
  line-height: 1.45;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  align-items: stretch;
}
</style>
