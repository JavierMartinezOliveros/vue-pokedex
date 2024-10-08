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

        <div className='detail-description'>
          {{ description }}
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from '../composables/pokemonUtils';
import Icon from './Icon.vue';

interface Props {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  moves: string[];
  description: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  image: '',
  description: ''
});

</script>