import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

// Page components
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import Products from './views/Products.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			afterLoggedIn: true
		}
	},
	{
		path: '/product',
		name: 'Product',
		component: Product,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/product/:id',
		component: Products,
		meta: {
			requiresAuth: true
		}
	}
];

const router = new VueRouter({
	routes,
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.afterLoggedIn)){
		if(localStorage.getItem('token')) {
			next('/product');
		}
	}
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next();
			return;
		}
		next('/')
	} else {
		next();
	}
})

export default router
