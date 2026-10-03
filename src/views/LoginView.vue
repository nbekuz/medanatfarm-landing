<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Button, Form, FormItem, Input, message } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const submitting = ref(false)

const redirectTo = computed(() => {
  const raw = route.query.redirect
  if (typeof raw === 'string' && raw.startsWith('/')) return raw
  return '/premium'
})

onMounted(async () => {
  await auth.bootstrap()
  if (auth.isAuthenticated) {
    await router.replace(redirectTo.value)
  }
})

watch(
  () => auth.isAuthenticated,
  (ok) => {
    if (ok) void router.replace(redirectTo.value)
  },
)

async function onSubmit() {
  if (!email.value.trim() || !password.value) {
    message.warning('Введите email и пароль')
    return
  }
  submitting.value = true
  try {
    await auth.login(email.value, password.value)
    message.success('Вы вошли')
    await router.replace(redirectTo.value)
  } catch {
    message.error(auth.error || 'Не удалось войти')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="section">
    <div class="container auth-wrap">
      <div class="auth-card">
        <h1 class="page-title">Вход</h1>
        <p class="auth-lead">
          Войдите, чтобы оформить Premium или управлять профилем.
        </p>

        <Form layout="vertical" @finish="onSubmit">
          <FormItem label="Email" required>
            <Input
              v-model:value="email"
              type="email"
              size="large"
              placeholder="you@email.com"
              autocomplete="email"
            />
          </FormItem>
          <FormItem label="Пароль" required>
            <Input.Password
              v-model:value="password"
              size="large"
              placeholder="••••••••"
              autocomplete="current-password"
            />
          </FormItem>
          <Button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="submitting"
          >
            Войти
          </Button>
        </Form>

        <p class="auth-foot">
          Нет аккаунта?
          <a href="/#download">Скачайте приложение</a>
          и зарегистрируйтесь там.
        </p>
        <p class="auth-foot">
          <RouterLink to="/premium">К Premium</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.auth-wrap {
  display: flex;
  justify-content: center;
}

.auth-card {
  width: min(440px, 100%);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 1.75rem 1.5rem 1.5rem;
  box-shadow: 0 12px 32px rgba(22, 119, 255, 0.06);
}

.page-title {
  margin: 0 0 0.5rem;
  font-size: 1.65rem;
}

.auth-lead {
  margin: 0 0 1.25rem;
  color: #667085;
  line-height: 1.45;
}

.auth-foot {
  margin: 1rem 0 0;
  color: #667085;
  font-size: 0.95rem;
}
</style>
