<script setup lang="ts">
defineProps<{
  name: 'telegram' | 'youtube' | 'instagram' | 'max' | 'whatsapp' | 'phone' | 'email'
}>()
</script>

<template>
  <svg
    v-if="name === 'telegram'"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M21.8 4.3c.3-.1.6 0 .7.3.1.2.1.5 0 .7L18.4 20c-.1.3-.3.5-.6.6-.2.1-.4 0-.6-.1l-5.4-4.1-2.9 2.7c-.2.2-.5.2-.7.1-.2-.1-.3-.4-.3-.6v-3.6L18 7.2l-9.8 5.8-4-.9c-.4-.1-.6-.4-.6-.8s.3-.7.6-.8L21.8 4.3Z"
    />
  </svg>

  <svg
    v-else-if="name === 'youtube'"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.6 12 4.6 12 4.6s-7.5 0-9.4.5A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8ZM9.8 15.5v-7l6.3 3.5-6.3 3.5Z"
    />
  </svg>

  <svg
    v-else-if="name === 'instagram'"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Zm3.1 1.2c-.1-1.8-.5-3.4-1.8-4.7C18.1 2.1 16.5 1.7 14.7 1.6 12.9 1.5 11.1 1.5 9.3 1.6 7.5 1.7 5.9 2.1 4.6 3.4 3.3 4.7 2.9 6.3 2.8 8.1 2.7 9.9 2.7 11.7 2.8 13.5c.1 1.8.5 3.4 1.8 4.7 1.3 1.3 2.9 1.7 4.7 1.8 1.8.1 3.6.1 5.4 0 1.8-.1 3.4-.5 4.7-1.8 1.3-1.3 1.7-2.9 1.8-4.7.1-1.8.1-3.6 0-5.4ZM19.4 17c-.3 1.1-1 1.7-2.1 2-1.4.3-4.7.3-5.3.3s-3.9 0-5.3-.3c-1.1-.3-1.8-.9-2.1-2-.3-1.4-.3-4.7-.3-5.3s0-3.9.3-5.3c.3-1.1 1-1.7 2.1-2 1.4-.3 4.7-.3 5.3-.3s3.9 0 5.3.3c1.1.3 1.8.9 2.1 2 .3 1.4.3 4.7.3 5.3s0 3.9-.3 5.3Z"
    />
  </svg>

  <svg
    v-else-if="name === 'max'"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M4.2 5.5h3.1l2.8 6.2 2.8-6.2h3.1v13h-2.6V10.4l-2.7 6.1h-2.2L5.8 10.4V18.5H3.2V5.5h1Z"
    />
    <path d="M18.2 5.5h2.6v13h-2.6V5.5Z" opacity="0.85" />
  </svg>

  <svg
    v-else-if="name === 'whatsapp'"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M12 2.1A9.9 9.9 0 0 0 3.4 16.9L2 22l5.3-1.4A9.9 9.9 0 1 0 12 2.1Zm0 18.1a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7 3.8Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 2.3 1 2.3.7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z"
    />
  </svg>

  <svg
    v-else-if="name === 'phone'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path
      d="M6.6 3.8h2.2c.5 0 .9.3 1 .8l.6 2.4c.1.4 0 .8-.3 1.1l-1.2 1.2a12.5 12.5 0 0 0 5.4 5.4l1.2-1.2c.3-.3.7-.4 1.1-.3l2.4.6c.5.1.8.5.8 1v2.2c0 .5-.4 1-1 1A14.2 14.2 0 0 1 5.6 4.8c0-.6.5-1 1-1Z"
    />
  </svg>

  <svg
    v-else-if="name === 'email'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
    <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
  </svg>
</template>

<style scoped>
svg {
  width: 1em;
  height: 1em;
  display: block;
}
</style>
