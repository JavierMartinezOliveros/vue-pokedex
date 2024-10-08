import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import PokemonDetail from './views/Detail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonDetail',
    component: PokemonDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
