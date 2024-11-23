<template>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div v-for="(toast, index) in toasts" :key="index" class="toast" :class="['bg-' + toast.variant, 'text-white']"
            role="alert" aria-live="assertive" aria-atomic="true" ref="toast" data-bs-animation="true" data-bs-autohide="true">
            <div v-if="toast.title" class="toast-header">
                <strong class="me-auto">{{ toast.title }}</strong>
                <b-button type="button" class="btn-close" @click="closeToast(index)" aria-label="Close"></b-button>
            </div>
            <div class="toast-body d-flex justify-content-between">
                {{ toast.message }}
                <b-button v-if="!toast.title"  type="button" class="btn-close" @click="closeToast(index)" aria-label="Close"></b-button>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref, nextTick } from 'vue';
//@ts-ignore
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import type { Toast } from '../Types/types';

const toasts = ref<Toast[]>([]);

const showToast = (toast: Toast) => {
    toasts.value.push(toast);
    console.log("TOAST: ", toasts.value)
    nextTick(async() => {
        const toastElement = document.querySelector(`.toast:nth-child(${toasts.value.length})`);
        if (toastElement) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement);
            await toastBootstrap.show();
        }
    });
    setTimeout(() => {
        closeToast(toasts.value.length - 1);
    }, toast.delay);
};

const closeToast = (index: number) => {
    toasts.value.splice(index, 1);
};

defineExpose({
    showToast
});
</script>