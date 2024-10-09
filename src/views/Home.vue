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
    <div class="pokedex-navigation">
      <button 
        v-if="offset > 0" 
        @click="prevPage" 
      >
        <Icon 
          name="chevron-left"
          size="lg"
          :stroke-width="2"
        />
      </button>
      <button @click="nextPage">
        <Icon 
          name="chevron-right"
          size="lg"
          :stroke-width="2"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getPokemonImageUrl } from '../composables/pokemonUtils';
import Header from '../components/Header.vue';
import Icon from '../components/Icon.vue';
import Card from '../components/Card.vue';
import { fetchPokemons } from '../pokemonService';

interface Pokemon {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Card,
    Icon
  },
  setup() {
    const pokemons = ref<Pokemon[]>([]);
    const loading = ref(true);
    const error = ref('');
    const limit = 12;
    const offset = ref(0);

    const loadPokemons = async () => {
      loading.value = true;
      try {
        pokemons.value = await fetchPokemons(limit, offset.value);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Unknown error';
        error.value = 'Error fetching Pokémon: ' + errorMessage;
      } finally {
        loading.value = false;
      }
    };

    const nextPage = () => {
      offset.value += limit;
      loadPokemons();
    };

    const prevPage = () => {
      if (offset.value > 0) {
        offset.value -= limit;
        loadPokemons();
      }
    };

    onMounted(() => {
      loadPokemons();
    });

    return {
      pokemons,
      loading,
      error,
      getPokemonImageUrl,
      nextPage,
      prevPage,
      offset,
    };
  },
});
</script>
