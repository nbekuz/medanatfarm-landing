<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'
import ruRU from 'ant-design-vue/es/locale/ru_RU'
import { RouterView } from 'vue-router'

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677FF',
    colorSuccess: '#12B76A',
    colorError: '#F04438',
    colorText: '#1F2937',
    colorTextSecondary: '#667085',
    colorBorder: '#E5E7EB',
    colorBgLayout: '#F5F7FA',
    colorBgContainer: '#FFFFFF',
    borderRadius: 8,
    fontFamily:
      "'Segoe UI', 'Noto Sans', system-ui, -apple-system, sans-serif",
  },
}
</script>

<template>
  <ConfigProvider :locale="ruRU" :theme="themeConfig">
    <RouterView />
  </ConfigProvider>
</template>
