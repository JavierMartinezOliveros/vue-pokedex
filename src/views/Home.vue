<template>
  <div class="pokedex">
  <Header 
    title="Pokedex"
    icon="Home"
    size="lg"
    :stroke-width="2"
  />
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error: {{ error }}</div>
  <div 
    v-else
    class="pokedex-content"
  >
    <Card 
      v-for="pokemon in pokemons" 
      :key="pokemon.id"
      :name="pokemon.name"
      :number="pokemon.id"
      :image="getPokemonImageUrl(pokemon.id)"
      :link="pokemon.id"
    />

  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getPokemonImageUrl } from '../composables/pokemonUtils';
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import { fetchPokemons } from '../pokemonService';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Card
  },
  setup() {
    const pokemons = ref([]);
    const loading = ref(true);
    const error = ref('');

    onMounted(async () => {
      try {
        pokemons.value = await fetchPokemons();
      } catch (err) {
        error.value = 'Error fetching Pokémon: ' + err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      pokemons,
      loading,
      error,
      getPokemonImageUrl,
    };
  },
});
</script>
