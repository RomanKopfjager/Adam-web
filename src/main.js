import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import api from './services/api';
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

let handleClickOutside;

Vue.directive('click-outside', {
	bind (el, binding, vnode) {
		handleClickOutside = (e) => {
			e.stopPropagation()
			const { handler, exclude } = binding.value
			let clickedOnExcludedEl = false

// Gives you the ability to exclude certain elements if you want, pass as array of strings to exclude
			if (exclude) {
				exclude.forEach(refName => {
					if (!clickedOnExcludedEl) {
						const excludedEl = vnode.context.$refs[refName]
						clickedOnExcludedEl = excludedEl.contains(e.target)
					}
				})
			}

			if (!el.contains(e.target) && !clickedOnExcludedEl) {
				handler(e)
			}
		}
		document.addEventListener('click', handleClickOutside)
		document.addEventListener('touchstart', handleClickOutside)
	},

	unbind () {
		document.removeEventListener('click', handleClickOutside)
		document.removeEventListener('touchstart', handleClickOutside)
	}
})

Vue.use(
		style,
);

new Vue({
	router,
	store,
	api,
	render: h => h(App)
}).$mount('#app');
