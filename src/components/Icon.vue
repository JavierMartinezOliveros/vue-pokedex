<template>
  <component
    :is="iconComponent"
    :size="iconSize"
    :stroke-width="props.strokeWidth"
    class="o-icon"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Size } from './Icon.types';

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Ruler,
  Weight
} from 'lucide-vue-next';

const iconComponents = {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Ruler,
  Weight
};

interface Props {
  name: string;
  size?: Size;
  strokeWidth?: number;
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  strokeWidth: 1,
});

const iconSize = computed(() => {
  switch (props.size) {
    case 'lg':
      return 24;
    case 'md':
      return 18;
    case 'sm':
      return 12;
    case 'xs':
      return 9;
  }
});

const iconComponent = computed(() => {
  const componentName = props.name.split('-').map((w) => {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join('');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore comment
  return iconComponents[componentName];
});
</script>
