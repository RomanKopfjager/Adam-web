import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import axios from 'axios';
import cors from 'cors';
import VueAxios from 'vue-axios';
import VueGeolocation from 'vue-browser-geolocation';
import style from './scss/index.scss';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faKey, faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;
Vue.use(
  VueGeolocation,
  style,
  cors
);

new Vue({
  vuetify,
  router,
  store,
  VueAxios,
  axios,
  VueGeolocation,
  render: h => h(App)
}).$mount('#app')
