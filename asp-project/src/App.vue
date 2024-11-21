<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import MenuConnect from '@/components/NavBar/MenuConnect.vue';

const route = useRoute()
</script>

<template>
  <div v-if="['login', 'sign'].includes(route.name as string)">
    <MenuConnect />
  </div>
  <div v-else>

  </div>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped></style>
