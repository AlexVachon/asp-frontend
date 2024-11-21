<template>
  <div 
    :class="['divider', direction, widthClass]" 
    :style="customWidthStyle"
  ></div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import type { TDivider } from '@/components/Types/types';

const props = defineProps({
  width: {
    type: Number, // Largeur en pourcentage ou 0-100 en valeur fixe
    default: 100,
  },
  direction: {
    type: String as () => TDivider, // horizontal ou vertical
    default: 'horizontal',
  },
});

const widthClass = computed(() => {
  const predefinedWidths = [25, 50, 75, 100];
  return predefinedWidths.includes(props.width) ? `w-${props.width}` : '';
});

const customWidthStyle = computed(() => {
  return widthClass.value === '' ? { width: `${props.width}%` } : {};
});
</script>
