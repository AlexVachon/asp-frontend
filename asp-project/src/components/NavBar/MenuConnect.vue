<template>

    <nav class="menu-connect">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/mast.png" alt="Logo" width="30" height="25" class="d-inline-block align-text-top">
                Mast
            </a>
            <SwitchTheme />
        </div>
    </nav>

</template>

<script lang="ts" setup>
import SwitchTheme from '../Tools/SwitchTheme.vue';
</script>
