<script setup lang="ts">
import {
  BookOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  FileTextOutlined,
  MobileOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  ApartmentOutlined,
} from '@ant-design/icons-vue'
import { Collapse, CollapsePanel, Spin } from 'ant-design-vue'
import { RouterLink } from 'vue-router'
import StoreBadges from '@/components/StoreBadges.vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

const trustItems = [
  'Курсы',
  'Конспекты',
  'Видеоматериалы',
  'Профессиональное развитие',
]

const whyCards = [
  {
    num: '01',
    icon: BookOutlined,
    title: 'Структурированное обучение',
    text: 'Курсы, уроки и материалы организованы по медицинским направлениям.',
  },
  {
    num: '02',
    icon: SafetyCertificateOutlined,
    title: 'Профессиональный контент',
    text: 'Конспекты и видеоматериалы помогают систематизировать знания и применять их на практике.',
  },
  {
    num: '03',
    icon: ClockCircleOutlined,
    title: 'Учитесь в удобное время',
    text: 'Продолжайте обучение с телефона и сохраняйте свой прогресс.',
  },
]

const capabilityCards = [
  {
    icon: PlayCircleOutlined,
    title: 'Видеоматериалы',
    text: 'Изучайте медицинские темы через структурированные видеоматериалы.',
  },
  {
    icon: FileTextOutlined,
    title: 'Конспекты',
    text: 'Быстро повторяйте ключевую информацию в удобном формате.',
  },
  {
    icon: ApartmentOutlined,
    title: 'Структурированные темы',
    text: 'Материалы организованы по медицинским направлениям и подкатегориям.',
  },
  {
    icon: CrownOutlined,
    title: 'Premium-контент',
    text: 'Получайте доступ к дополнительным материалам и расширенным возможностям.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Выберите направление',
    text: 'Найдите интересующую медицинскую категорию.',
  },
  {
    num: '02',
    title: 'Изучайте материалы',
    text: 'Смотрите видео, изучайте конспекты и проходите структурированные темы.',
  },
  {
    num: '03',
    title: 'Развивайтесь постоянно',
    text: 'Возвращайтесь к материалам и продолжайте обучение в удобное время.',
  },
]

const premiumBenefits = [
  'Дополнительные материалы',
  'Расширенный контент',
  'Больше возможностей для обучения',
]

const fallbackFaq = [
  {
    id: 'f1',
    question: 'Что такое Medanatfarm?',
    answer:
      'Medanatfarm — платформа медицинского образования для врачей и фармацевтов со структурированными курсами, конспектами и видеоматериалами.',
  },
  {
    id: 'f2',
    question: 'Для кого предназначена платформа?',
    answer:
      'Для практикующих врачей, фармацевтов и специалистов, которым важно системно обновлять профессиональные знания.',
  },
  {
    id: 'f3',
    question: 'Какие материалы доступны?',
    answer:
      'На платформе доступны видеоматериалы, конспекты и темы, организованные по медицинским направлениям.',
  },
  {
    id: 'f4',
    question: 'Что входит в Premium?',
    answer:
      'Premium открывает доступ к дополнительным образовательным материалам и расширенному контенту.',
  },
  {
    id: 'f5',
    question: 'Можно ли пользоваться платформой с телефона?',
    answer:
      'Да. Medanatfarm доступен в мобильном приложении — учитесь в удобное время и сохраняйте прогресс.',
  },
]
</script>

<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content fade-up">
          <p class="hero__eyebrow">Медицинское образование</p>
          <h1 class="hero__title">
            <span class="hero__brand">Medanatfarm</span>
            — знания для практики
          </h1>
          <p class="hero__subtitle">
            Платформа для врачей и фармацевтов: структурированные курсы,
            конспекты и видеоматериалы для системного профессионального развития.
          </p>
          <div class="hero__actions">
            <a href="#download" class="btn btn--primary">Скачать приложение</a>
            <RouterLink to="/faq" class="btn btn--secondary">
              Узнать больше
            </RouterLink>
          </div>
          <ul class="hero__trust" aria-label="Ключевые возможности">
            <li v-for="item in trustItems" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="hero__visual fade-up fade-up-delay-1" aria-hidden="true">
          <div class="hero__glow hero__glow--a" />
          <div class="hero__glow hero__glow--b" />

          <div class="preview-stack">
            <article class="preview-card preview-card--main">
              <div class="preview-card__top">
                <span class="preview-card__logo">Medanatfarm</span>
                <span class="preview-card__badge">Premium</span>
              </div>
              <strong class="preview-card__title">Курсы по направлениям</strong>
              <div class="preview-progress">
                <div class="preview-progress__bar" />
              </div>
              <p class="preview-progress__label">Прогресс обучения · 68%</p>
              <div class="preview-tiles">
                <div class="preview-tile">
                  <PlayCircleOutlined />
                  <span>Видео</span>
                </div>
                <div class="preview-tile">
                  <FileTextOutlined />
                  <span>Конспекты</span>
                </div>
                <div class="preview-tile">
                  <ReadOutlined />
                  <span>Темы</span>
                </div>
              </div>
            </article>

            <article class="preview-card preview-card--float preview-card--left">
              <span class="preview-chip">Анатомия</span>
              <strong>Системный подход</strong>
              <p>Категории и подкатегории</p>
            </article>

            <article class="preview-card preview-card--float preview-card--right">
              <span class="preview-chip preview-chip--green">Конспект</span>
              <strong>Ключевые тезисы</strong>
              <p>Быстрое повторение</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY -->
    <section class="section" id="why">
      <div class="container">
        <div class="section-intro fade-up">
          <h2 class="section-title">
            Всё необходимое для системного медицинского образования
          </h2>
          <p class="section-subtitle">
            Учитесь по структурированной программе и возвращайтесь к материалам
            в удобное время.
          </p>
        </div>
        <div class="why-grid">
          <article
            v-for="(card, index) in whyCards"
            :key="card.title"
            class="why-card fade-up"
            :class="`fade-up-delay-${index + 1}`"
          >
            <div class="why-card__head">
              <span class="why-card__num">{{ card.num }}</span>
              <span class="why-card__icon">
                <component :is="card.icon" />
              </span>
            </div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- FEATURES / ВОЗМОЖНОСТИ -->
    <section class="section section--muted" id="features">
      <div class="container">
        <div class="section-intro fade-up">
          <h2 class="section-title">Одна платформа — несколько форматов обучения</h2>
          <p class="section-subtitle">
            Видео, конспекты и структурированные темы в едином профессиональном
            пространстве.
          </p>
        </div>
        <div class="cap-grid">
          <article
            v-for="(item, index) in capabilityCards"
            :key="item.title"
            class="cap-card fade-up"
            :class="`fade-up-delay-${(index % 3) + 1}`"
          >
            <span class="cap-card__icon">
              <component :is="item.icon" />
            </span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section" id="how">
      <div class="container">
        <div class="section-intro fade-up">
          <h2 class="section-title">Как это работает</h2>
          <p class="section-subtitle">
            Три простых шага к системному профессиональному развитию.
          </p>
        </div>
        <ol class="steps">
          <li
            v-for="(step, index) in steps"
            :key="step.num"
            class="steps__item fade-up"
            :class="`fade-up-delay-${index + 1}`"
          >
            <span class="steps__num">{{ step.num }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- APP PREVIEW -->
    <section class="section section--muted" id="download">
      <div class="container app-preview">
        <div class="app-preview__copy fade-up">
          <h2 class="section-title">Медицинское образование всегда под рукой</h2>
          <p class="section-subtitle">
            Используйте Medanatfarm на смартфоне и получайте доступ к обучающим
            материалам в удобное время.
          </p>
          <div class="app-preview__actions">
            <StoreBadges />
            <a
              v-if="!siteStore.hasStoreBadges"
              href="#download"
              class="btn btn--primary"
            >
              Скачать приложение
            </a>
          </div>
        </div>

        <div class="phone fade-up fade-up-delay-1">
          <img
            class="phone__shot"
            src="/for-app.png"
            alt="Medanatfarm — экран приложения на смартфоне"
            width="780"
            height="1688"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <!-- PREMIUM -->
    <section class="section" id="premium">
      <div class="container">
        <div class="premium fade-up">
          <div class="premium__copy">
            <p class="premium__eyebrow">
              <CrownOutlined /> Premium
            </p>
            <h2 class="section-title">Расширяйте возможности обучения</h2>
            <p class="section-subtitle">
              Premium открывает доступ к дополнительным образовательным
              материалам и расширенному контенту.
            </p>
            <ul class="premium__list">
              <li v-for="item in premiumBenefits" :key="item">{{ item }}</li>
            </ul>
            <RouterLink to="/faq" class="btn btn--secondary">
              Узнать больше
            </RouterLink>
          </div>
          <div class="premium__panel" aria-hidden="true">
            <div class="premium__card">
              <MobileOutlined class="premium__card-icon" />
              <strong>Больше материалов</strong>
              <p>Расширенная библиотека для практики</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section section--muted" id="faq-preview">
      <div class="container">
        <div class="section-header fade-up">
          <div>
            <h2 class="section-title">Частые вопросы</h2>
            <p class="section-subtitle section-subtitle--compact">
              Ответы на популярные вопросы о платформе.
            </p>
          </div>
          <RouterLink to="/faq" class="section-link">Все вопросы →</RouterLink>
        </div>

        <Spin :spinning="siteStore.loading" class="page-spin" size="large">
          <Collapse
            accordion
            class="faq-list fade-up fade-up-delay-1"
            expand-icon-position="end"
          >
            <CollapsePanel
              v-for="item in siteStore.faqPreview.length
                ? siteStore.faqPreview
                : fallbackFaq"
              :key="item.id"
              :header="item.question"
            >
              <div class="faq-answer">{{ item.answer }}</div>
            </CollapsePanel>
          </Collapse>
        </Spin>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="section">
      <div class="container">
        <div class="final-cta fade-up">
          <div class="final-cta__orb final-cta__orb--a" aria-hidden="true" />
          <div class="final-cta__orb final-cta__orb--b" aria-hidden="true" />
          <h2 class="final-cta__title">Готовы развиваться профессионально?</h2>
          <p class="final-cta__text">
            Изучайте медицинские материалы системно и возвращайтесь к знаниям в
            любое время.
          </p>
          <a href="#download" class="btn btn--primary">Скачать приложение</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.section-intro {
  margin-bottom: 0.25rem;
}

.section-subtitle--compact {
  margin-bottom: 0;
}

.hero {
  position: relative;
  overflow: hidden;
  padding-block: 3.5rem 3rem;
  background:
    radial-gradient(circle at 88% 12%, rgba(22, 119, 255, 0.14), transparent 42%),
    radial-gradient(circle at 8% 88%, rgba(56, 189, 248, 0.1), transparent 40%),
    linear-gradient(180deg, #ffffff 0%, #f5f8fc 100%);
}

.hero__inner {
  display: grid;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 2rem;
  }
}

.hero__eyebrow {
  margin: 0 0 0.85rem;
  color: #1677ff;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.hero__title {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3.05rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: #1f2937;
}

.hero__brand {
  color: #1677ff;
}

.hero__subtitle {
  margin: 0 0 1.5rem;
  max-width: 34rem;
  color: #667085;
  font-size: 1.05rem;
  line-height: 1.65;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    .btn {
      width: 100%;
    }
  }
}

.hero__trust {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  li {
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    background: #fff;
    border: 1px solid #e5e7eb;
    color: #4b5563;
    font-size: 0.82rem;
    font-weight: 600;
  }
}

.hero__visual {
  position: relative;
  min-height: 340px;
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  pointer-events: none;
}

.hero__glow--a {
  width: 240px;
  height: 240px;
  top: 0;
  right: 8%;
  background: rgba(22, 119, 255, 0.12);
}

.hero__glow--b {
  width: 180px;
  height: 180px;
  bottom: 4%;
  left: 4%;
  background: rgba(56, 189, 248, 0.12);
}

.preview-stack {
  position: relative;
  z-index: 1;
  padding: 1.5rem 0.5rem 1rem;
}

.preview-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(31, 41, 55, 0.08);
}

.preview-card--main {
  padding: 1.35rem;
  position: relative;
  z-index: 2;
}

.preview-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.preview-card__logo {
  font-weight: 700;
  color: #1677ff;
  font-size: 0.95rem;
}

.preview-card__badge {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #fff7e6;
  color: #d48806;
  font-size: 0.75rem;
  font-weight: 700;
}

.preview-card__title {
  display: block;
  font-size: 1.2rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.preview-progress {
  height: 8px;
  border-radius: 999px;
  background: #eef2f7;
  overflow: hidden;
}

.preview-progress__bar {
  width: 68%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #1677ff, #69b1ff);
}

.preview-progress__label {
  margin: 0.55rem 0 1rem;
  color: #667085;
  font-size: 0.85rem;
}

.preview-tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.55rem;
}

.preview-tile {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.75rem 0.55rem;
  border-radius: 14px;
  background: #f8fbff;
  border: 1px solid #e8eef8;
  color: #1677ff;
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
}

.preview-card--float {
  position: absolute;
  z-index: 3;
  padding: 0.9rem 1rem;
  width: min(200px, 46%);
  transition: transform 0.25s ease;
}

.preview-card--left {
  left: 0;
  bottom: 8%;
}

.preview-card--right {
  right: 0;
  top: 6%;
}

.preview-chip {
  display: inline-block;
  margin-bottom: 0.4rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: #eef4ff;
  color: #1677ff;
  font-size: 0.72rem;
  font-weight: 700;
}

.preview-chip--green {
  background: #ecfdf3;
  color: #12b76a;
}

.preview-card--float strong {
  display: block;
  font-size: 0.95rem;
  color: #1f2937;
}

.preview-card--float p {
  margin: 0.25rem 0 0;
  color: #667085;
  font-size: 0.8rem;
}

.why-grid {
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.why-card {
  height: 100%;
  padding: 1.5rem;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px rgba(31, 41, 55, 0.04);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #c7d7fe;
    box-shadow: 0 14px 30px rgba(22, 119, 255, 0.1);
  }

  h3 {
    margin: 1rem 0 0.55rem;
    font-size: 1.05rem;
    color: #1f2937;
  }

  p {
    margin: 0;
    color: #667085;
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

.why-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.why-card__num {
  font-size: 0.85rem;
  font-weight: 700;
  color: #98a2b3;
  letter-spacing: 0.04em;
}

.why-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  background: #eef4ff;
  color: #1677ff;
  font-size: 1.15rem;
}

.cap-grid {
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.cap-card {
  height: 100%;
  padding: 1.4rem;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #e5e7eb;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #c7d7fe;
    box-shadow: 0 12px 28px rgba(22, 119, 255, 0.08);
  }

  h3 {
    margin: 0.9rem 0 0.45rem;
    font-size: 1.02rem;
    color: #1f2937;
  }

  p {
    margin: 0;
    color: #667085;
    line-height: 1.55;
    font-size: 0.92rem;
  }
}

.cap-card__icon {
  display: inline-flex;
  width: 2.4rem;
  height: 2.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eef4ff;
  color: #1677ff;
  font-size: 1.15rem;
}

.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

.steps__item {
  position: relative;
  padding: 1.5rem;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #e5e7eb;
  height: 100%;

  @media (min-width: 768px) {
    &::after {
      content: '';
      position: absolute;
      top: 2.1rem;
      right: -0.75rem;
      width: 1.5rem;
      height: 2px;
      background: #d6e4ff;
      z-index: 1;
    }

    &:last-child::after {
      display: none;
    }
  }

  h3 {
    margin: 0.85rem 0 0.45rem;
    font-size: 1.05rem;
    color: #1f2937;
  }

  p {
    margin: 0;
    color: #667085;
    line-height: 1.55;
    font-size: 0.95rem;
  }
}

.steps__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 999px;
  background: #1677ff;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
}

.app-preview {
  display: grid;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.app-preview__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.phone {
  display: flex;
  justify-content: center;
}

.phone__shot {
  display: block;
  width: min(300px, 100%);
  height: auto;
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(17, 24, 39, 0.22);
  object-fit: contain;
}

.premium {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 12px 32px rgba(31, 41, 55, 0.05);

  @media (min-width: 900px) {
    grid-template-columns: 1.3fr 0.7fr;
    align-items: center;
    padding: 2.5rem;
  }
}

.premium__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.75rem;
  color: #d48806;
  font-weight: 700;
  font-size: 0.85rem;
}

.premium__list {
  margin: 0 0 1.35rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.55rem;

  li {
    position: relative;
    padding-left: 1.35rem;
    color: #4b5563;
    font-weight: 500;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.45rem;
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 50%;
      background: #1677ff;
    }
  }
}

.premium__panel {
  display: flex;
  justify-content: center;
}

.premium__card {
  width: 100%;
  max-width: 260px;
  padding: 1.5rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #eef4ff, #f8fbff);
  border: 1px solid #d6e4ff;
  text-align: center;

  strong {
    display: block;
    margin: 0.75rem 0 0.35rem;
    color: #1f2937;
  }

  p {
    margin: 0;
    color: #667085;
    font-size: 0.9rem;
  }
}

.premium__card-icon {
  font-size: 1.75rem;
  color: #1677ff;
}

.faq-list {
  margin-top: 1.25rem;
  background: transparent;
  border: none;

  :deep(.ant-collapse-item) {
    margin-bottom: 0.75rem;
    border: 1px solid #e5e7eb !important;
    border-radius: 16px !important;
    background: #fff;
    overflow: hidden;
  }

  :deep(.ant-collapse-header) {
    align-items: center !important;
    padding: 1rem 1.15rem !important;
    font-weight: 600;
    color: #1f2937 !important;
  }

  :deep(.ant-collapse-content-box) {
    padding: 0 1.15rem 1.1rem !important;
  }
}

.faq-answer {
  color: #667085;
  line-height: 1.65;
  white-space: pre-wrap;
}

.final-cta {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 3rem 1.5rem;
  border-radius: 24px;
  background:
    radial-gradient(circle at 15% 20%, rgba(22, 119, 255, 0.16), transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(56, 189, 248, 0.14), transparent 42%),
    linear-gradient(135deg, #f0f7ff, #eaf4ff 50%, #f7fbff);
  border: 1px solid #d6e4ff;
}

.final-cta__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.final-cta__orb--a {
  width: 160px;
  height: 160px;
  top: -40px;
  right: -20px;
  background: rgba(22, 119, 255, 0.1);
}

.final-cta__orb--b {
  width: 120px;
  height: 120px;
  bottom: -30px;
  left: -10px;
  background: rgba(56, 189, 248, 0.12);
}

.final-cta__title {
  position: relative;
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #1f2937;
  letter-spacing: -0.02em;
}

.final-cta__text {
  position: relative;
  margin: 0 auto 1.5rem;
  max-width: 34rem;
  color: #667085;
  line-height: 1.65;
}

@media (max-width: 959px) {
  .preview-card--float {
    display: none;
  }

  .hero__visual {
    min-height: auto;
  }
}
</style>
