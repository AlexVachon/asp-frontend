<template>
    <div >
      <b-form-checkbox 
        v-model="checked"
        name="check-theme"  
        switch 
        size="m"
        @change="toggleTheme"
        >
        <span>
            <i :class="iconClass" class="ms-2"></i>
        </span>
      </b-form-checkbox>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  
  const checked = ref(false);

  const iconClass = computed(() => (checked.value ? 'bi-moon-fill': 'bi-sun-fill'))

  const toggleTheme = () => {
    const theme = checked.value ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme)
  };

  </script>
  