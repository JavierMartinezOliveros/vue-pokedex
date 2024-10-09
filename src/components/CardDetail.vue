<template>
  <div class="detail">
    <div class="detail-content-main">
      <img class="detail-content-image" :src="image" :alt="name" />
    </div>
    <div class="detail-content">
      <div class="detail-type">
        <span
          v-for="(type, index) in types"
          :key="index"
          :class="`detail-type__${type}`"
        >
          {{ capitalizeFirstLetter(type) }}
        </span>
      </div>

      <div class="detail-about">
        <h2>About</h2>
        <div className='detail-about-content'>
          <div className='detail-about-data'>
            <Icon name="weight" />
            {{ weight }} Kg
            <p>Weight</p>
          </div>
          <div className='detail-about-data'>
            <Icon name="ruler" />
            {{ height }} cm
            <p>Height</p>
          </div>

          <div className='detail-about-data'>
            <ul>
              <li v-for="(ability, index) in moves" :key="index">
                {{ capitalizeFirstLetter(ability) }}
              </li>
            </ul>
            <p>Moves</p>
          </div>
        </div>

        <div class='detail-stats'>
          <h2>Base Stats</h2>
          <StatsBar 
            v-for="(stat, index) in stats" 
            :key="index"
            :name="stat.name"
            :value="stat.value" 
            :maxValue="stat.maxValue" 
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { capitalizeFirstLetter } from '../composables/pokemonUtils';
  import Icon from './Icon.vue';
  import StatsBar from './StatsBar.vue';

  interface Stat {
    name: string;
    value: number;
    maxValue: number;
  }

  interface Props {
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    moves: string[];
    stats: Stat[];
  }

  withDefaults(defineProps<Props>(), {
    name: '',
    image: '',
  });

</script>