<template>
  <b-overlay 
    :show="show" 
    rounded="sm" 
    :variant="theme === 'light' ? 'light' : 'secondary'"
  >
    <slot default />
  </b-overlay>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue';

defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const theme = ref(document.documentElement.getAttribute('data-bs-theme') || 'light');

const updateTheme = () => {
  theme.value = document.documentElement.getAttribute('data-bs-theme') || 'light';
};

onMounted(() => {
  const observer = new MutationObserver(() => updateTheme());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>
