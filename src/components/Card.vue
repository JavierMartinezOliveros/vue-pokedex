<template>
  <router-link :to="{ name: 'PokemonDetail', params: {id: link }}">
    <div class="card">
      <div class="card-number"># {{ formattedNumber(number) }}</div>
      <div class="card-content">
        <img class="card-image" :src="image" :alt="name" />
        <h2 class="card-name">{{ capitalizeFirstLetter(name) }}</h2>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import { capitalizeFirstLetter, formattedNumber } from '../composables/pokemonUtils';

  interface Props {
    name: string;
    image: string;
    number: number;
    link: number
  }

  withDefaults(defineProps<Props>(), {
    name: '',
    image: '',
    number: 0,
    link: 0
  });

</script>