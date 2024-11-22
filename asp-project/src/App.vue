<template>
  <MenuConnect v-if="['login', 'sign'].includes(route.name as string)" />

  <main class="content">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import MenuConnect from '@/components/NavBar/MenuConnect.vue';

const route = useRoute()

</script>

<style scoped></style>
