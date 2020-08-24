import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import axios from 'axios';
import cors from 'cors';
import VueAxios from 'vue-axios';
import style from './scss/index.scss';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import TransitionDropdown from './components/general/TransitionDropdown';

library.add(faKey, faUser);

//Custom components
Vue.component('app-transition-dropdown', TransitionDropdown);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(
  style,
  cors,
);

new Vue({
  vuetify,
  router,
  store,
  VueAxios,
  axios,
  render: h => h(App)
}).$mount('#app');
