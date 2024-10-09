<template>
  <div class="stat-bar">
    <p>{{ name }}</p>
    <div class="stat-data">
      <p><span>{{ value }}</span></p>
      <div class='progress-bar'>
        <div class="filler" :style="{ width: percentage + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  
  interface Props {
    name: string;
    value: number;
    maxValue?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    name: '',
    value: 0,
    maxValue: 200,
  });

  const percentage = (props.value / props.maxValue) * 100;
</script>