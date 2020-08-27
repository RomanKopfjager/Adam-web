import axios from '@/services/api';
import logo from '@/assets/img/logo_black.png';

const state = {
	categoryId: null,
	activeProduct: null,
	activeProductInCart: null,

	productDescription: '',
	productInfo: {},
	productsList: [],
	productsListInCart: []
};

const actions = {

	//Get list of products based on category ID
	getProductsByCategoryId({commit}, categoryId) {
		const url = 'commercial_items_list.php';
		const token = localStorage.getItem('token');

		let productsList = [];
		commit('SET_CATEGORIES_BY_PRODUCT_ID', productsList);

		return new Promise((resolve, reject) => {

			let data = new FormData;
			data.append('token', token)
			data.append("category_id", categoryId);
			data.append("mode", 0);
			data.append("archive", 0);

			axios.post(url, data)
					.then(response => {
						let products = response.data.response;

						products.forEach((product) => {
							if (!product.image) {
								product.image = logo;
							}
							productsList.push(product);
						});
						commit('SET_CATEGORIES_BY_PRODUCT_ID', productsList);
						resolve(productsList);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
		})
	},

	// Get all product information with options localizations e.t.c. by product id
	getProductInfoById({commit}, productId) {
		const url = 'commercial_items_info.php';
		const token = localStorage.getItem('token');

		return new Promise((resolve, reject) => {

			let data = new FormData;
			data.append("id", productId);
			data.append('token', token);

			axios.post(url, data)
					.then(response => {
						let product = response.data.response;
						console.log(response)

						commit('SET_PRODUCT_INFO_BY_ID', product);
						resolve(product);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
		})

	},

	// Editing cart
	addProductToCart({commit}, product){
		state.productsListInCart.push(product);

		let localCart = JSON.stringify(state.productsListInCart);

		localStorage.setItem('products_in_cart', localCart);

		commit('ADD_PRODUCT_TO_CART', product);
	},
	removeProductFromCart({commit}, product){
		commit('REMOVE_PRODUCT_FROM_CART', product);
	},
};

const mutations = {
	// Set all products by category id
	SET_CATEGORIES_BY_PRODUCT_ID(state, productsList) {
		state.productsList = productsList;
	},

	// Set all product information with options localizations e.t.c. by product id
	SET_PRODUCT_INFO_BY_ID(state, product) {
		state.productInfo = product;
	},

	ACTIVE_PRODUCT(state, data) {
		state.activeProduct = data.id;
		state.productDescription = data.description;
	},
	ACTIVE_PRODUCT_IN_CART(state, activeProductInCart) {
		state.activeProductInCart = activeProductInCart;
	},

	// Editing cart
	ADD_PRODUCT_TO_CART(state, data) {

		console.log(data)
		for(let i = 0; i < data.quantity; i++) {
			console.log(i)
			state.productsListInCart.push(data.id);
		}


		let localCart = JSON.stringify(state.productsListInCart);

		localStorage.setItem('products_in_cart', localCart);
	},
	REMOVE_PRODUCT_FROM_CART(state, product) {
		// state.productsListInCart.remove(state.productsListInCart.indexOf(product));

		// let localCart =  localStorage.getItem('products_in_cart');

		state.activeProductInCart = product;
		let cart = state.productsListInCart;

		cart.splice(product, 1);
	},
};

const getters = {
	productsList: state => state.productsList,
	productsListInCart: state => state.productsListInCart,

	// Set all product information with options localizations e.t.c. by product id
	productInfo: state => state.productInfo,

	activeProduct: state => state.activeProduct,
	activeProductInCart: state => state.activeProductInCart,
};

export default {state, actions, mutations, getters}