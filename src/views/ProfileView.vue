<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Button, Form, FormItem, Input, message } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const saving = ref(false)

const form = reactive({
  displayName: '',
  firstName: '',
  lastName: '',
  phone: '',
  bio: '',
})

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
  await auth.bootstrap()
  if (!auth.isAuthenticated) {
    await router.replace({ name: 'login', query: { redirect: '/profile' } })
    return
  }
  try {
    await auth.fetchMe()
  } catch {
    /* ignore */
  }
  const me = auth.me
  form.displayName = me?.displayName || me?.profile?.displayName || ''
  form.firstName = me?.firstName || me?.profile?.firstName || ''
  form.lastName = me?.lastName || me?.profile?.lastName || ''
  form.phone = me?.profile?.phone || ''
  form.bio = me?.profile?.bio || ''
})

async function save() {
  saving.value = true
  try {
    await auth.updateProfile({
      displayName: form.displayName.trim() || undefined,
      firstName: form.firstName.trim() || undefined,
      lastName: form.lastName.trim() || undefined,
      phone: form.phone.trim() || undefined,
      bio: form.bio.trim() || undefined,
    })
    message.success('Профиль сохранён')
  } catch {
    message.error('Не удалось сохранить профиль')
  } finally {
    saving.value = false
  }
}

function logout() {
  auth.logout()
  message.success('Вы вышли')
  void router.push('/')
}
</script>

<template>
  <section class="section">
    <div class="container profile-wrap">
      <div class="profile-card">
        <div class="profile-head">
          <div>
            <h1 class="page-title">Профиль</h1>
            <p class="muted">{{ auth.me?.email }}</p>
          </div>
          <Button danger @click="logout">Выйти</Button>
        </div>

        <div class="premium-box" :class="{ 'premium-box--on': auth.hasPremium }">
          <div>
            <strong>{{ auth.hasPremium ? 'Premium активен' : 'Premium не активен' }}</strong>
            <p v-if="auth.hasPremium && endsLabel" class="muted">
              Действует до {{ endsLabel }}
            </p>
            <p v-else class="muted">Откройте полный доступ к материалам</p>
          </div>
          <RouterLink to="/premium" class="btn btn--primary">
            {{ auth.hasPremium ? 'Premium' : 'Купить Premium' }}
          </RouterLink>
        </div>

        <Form layout="vertical" class="profile-form" @finish="save">
          <FormItem label="Отображаемое имя">
            <Input v-model:value="form.displayName" size="large" />
          </FormItem>
          <div class="row-2">
            <FormItem label="Имя">
              <Input v-model:value="form.firstName" size="large" />
            </FormItem>
            <FormItem label="Фамилия">
              <Input v-model:value="form.lastName" size="large" />
            </FormItem>
          </div>
          <FormItem label="Телефон">
            <Input v-model:value="form.phone" size="large" />
          </FormItem>
          <FormItem label="О себе">
            <Input.TextArea v-model:value="form.bio" :rows="3" />
          </FormItem>
          <Button type="primary" html-type="submit" size="large" :loading="saving">
            Сохранить
          </Button>
        </Form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile-wrap {
  display: flex;
  justify-content: center;
}

.profile-card {
  width: min(640px, 100%);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 1.75rem 1.5rem 1.5rem;
  box-shadow: 0 12px 32px rgba(22, 119, 255, 0.06);
}

.page-title {
  margin: 0 0 0.25rem;
  font-size: 1.65rem;
}

.muted {
  margin: 0;
  color: #667085;
}

.profile-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.premium-box {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  margin-bottom: 1.5rem;

  &--on {
    border-color: rgba(201, 162, 74, 0.55);
    background: linear-gradient(135deg, #fff8e8, #fff);
  }
}

.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.profile-form {
  margin-top: 0.25rem;
}
</style>
