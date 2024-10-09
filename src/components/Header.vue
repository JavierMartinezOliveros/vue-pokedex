
<template>
  <header>
    <img src="/pokeball.svg" class="logo" alt="Pokemon logo" />
    <div class="pokedex-header">
      <RouterLink v-if="link" :to="link">
        <Icon
          :name="icon"
          :size="size"
          :stroke-width="strokeWidth"
        />
      </RouterLink>
        <Icon 
          v-else
          :name="icon"
          :size="size"
          :stroke-width="strokeWidth"
        />
      <h1>{{ capitalizeFirstLetter(title) }}</h1>
      <div class="pokedex-header-number"  v-if="number">
        # {{ formattedNumber(number) }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { capitalizeFirstLetter, formattedNumber } from '../composables/pokemonUtils';
  import Icon from './Icon.vue';
  import type { Size } from './Icon.types';
  
  interface Props {
    title: string;
    icon: string;
    size?: Size;
    link?: string;
    strokeWidth?: number;
    number?: number
  }
  withDefaults(defineProps<Props>(), {
    title: '',
    icon: '',
    size: 'md',
    link: '',
  });
</script>