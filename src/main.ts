import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router.ts';

import './style.scss';
import './assets/css/main.scss';

// Crea la instancia de la aplicación Vue
const app = createApp({
  render: () => h(App),
});

// Usa el enrutador
app.use(router);

// Monta la aplicación en el elemento con id "app"
app.mount('#app');
