import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import '@mdi/font/css/materialdesignicons.css';

import '@/main.css';

const pinia = createPinia();

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

createApp(App)
  .use(vuetify)
  .use(pinia)
  .mount('#app');
