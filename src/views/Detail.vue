<template>
  <div :class="`pokedex ${firstType}`">
    <Header 
      :title="capitalizeFirstLetter(pokemon?.name ?? '')"
      icon="arrow-left"
      size="lg"
      link="/"
      :stroke-width="2"
      :number="pokemon?.id ?? 0"
    />

    <div v-if="loading">Loading Pokémon details...</div>
    <div v-if="error">Error: {{ error }}</div>
    
    <CardDetail
      v-if="pokemon"
      :name="pokemon.name"
      :image="getPokemonImageUrl(pokemon.id)"
      :types="pokemon.types.map(type => type.type.name)" 
      :weight="pokemon.weight"
      :height="pokemon.height"
      :moves="pokemon.abilities.map(ability => ability.ability.name)"
      :stats="formatStats(pokemon.stats)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import CardDetail from '../components/CardDetail.vue'
import { capitalizeFirstLetter, getPokemonImageUrl } from '../composables/pokemonUtils';

interface PokemonType {
  type: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonSpecies {
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: Ability[];
  stats: Stat[];
  species: PokemonSpecies;
}

export default defineComponent({
  name: 'Detail',
  components: {
    Header,
    CardDetail
  },
  setup() {
    const pokemon = ref<Pokemon | null>(null);
    const flavorText = ref('');
    const loading = ref(true);
    const error = ref('');

    const route = useRoute();

    const fetchPokemonDetail = async (id: number) => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        pokemon.value = response.data;

        if (pokemon.value) {
          const speciesResponse = await axios.get(pokemon.value.species.url);
          const flavorTexts = speciesResponse.data.flavor_text_entries;
          flavorText.value = flavorTexts.length > 0 ? flavorTexts[0].flavor_text : 'No flavor text available.';
        }

      } catch (err) {
        const errorMessage = (err as Error).message || 'Unknown error';
        error.value = 'Error fetching Pokémon details: ' + errorMessage;
      } finally {
        loading.value = false;
      }
    };

    const firstType = computed(() => {
      return pokemon.value?.types?.[0]?.type.name || 'unknown';
    });

    const pokemonId = Number(route.params.id); 

    const statAbbr: { [key: string]: string } = {
      hp: 'hp',
      attack: 'atk',
      defense: 'def',
      'special-attack': 'satk',
      'special-defense': 'sdef',
      speed: 'spd',
    };

    const formatStats = (stats: any[]) => {
      const maxValue = 200;
      return stats.map(stat => ({
        name: statAbbr[stat.stat.name].toUpperCase(),
        value: stat.base_stat,
        maxValue
      }));
    };

    onMounted(() => {
      fetchPokemonDetail(pokemonId);
    });

    return {
      pokemon,
      loading,
      error,
      firstType,
      capitalizeFirstLetter, 
      getPokemonImageUrl,
      formatStats
    };
  }
});
</script>
