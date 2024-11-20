<template> 
    <h1>
        <MenuConnect />
    </h1>

    <RouterView />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import MenuConnect from '@/components/NavBar/MenuConnect.vue';

</script>