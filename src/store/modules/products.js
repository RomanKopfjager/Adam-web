import axios from '@/services/api';
import logo from '@/assets/img/logo_black.png';

const state = {
	categoryId: null,
	activeProduct: null,
	activeProductInCart: null,

	productPopupStatus: false,
	productPopupComponentsList: {},

	productInCart: 0,

	productDescription: '',
	product: {},
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
	getProductInfoById({commit}, product) {
		const url = 'commercial_items_info.php';
		const token = localStorage.getItem('token');

		return new Promise((resolve, reject) => {

			let data = new FormData;
			data.append("id", product.id);
			data.append('token', token);
			data.append('add_components_types', 0);

			axios.post(url, data)
					.then(response => {
						let productResponse = response.data.response;
						console.log(productResponse)

						commit('SET_PRODUCT_INFO_BY_ID', productResponse);
						resolve(productResponse);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
		})

	},

	// Editing cart
	addProductToCart({commit}, data){
		const url = 'commercial_items_info.php';
		const token = localStorage.getItem('token');

		return new Promise((resolve, reject) => {

			let postData = new FormData;
			console.log(data)
			postData.append("id", data.product.id);
			postData.append('token', token);
			postData.append('add_components_types', 0);

			axios.post(url, postData)
					.then(response => {
						let productResponse = response.data.response;
						let components = productResponse.included_components_types_items;
						let componentsLength = Object.keys(components).length;
						let status = false;
						let componentsList = components;

						if(componentsLength && data.openComponents) {
							status = true;
							commit('DISPLAY_PRODUCT_POPUP', {
								status: status,
								componentsList: componentsList
							});
						} else {
							status = false;
							commit('DISPLAY_PRODUCT_POPUP', {
								status: status,
								componentsList: componentsList
							});

							console.log(components)
							commit('ADD_PRODUCT_TO_CART', productResponse);
							resolve(productResponse);
						}

						commit('SET_PRODUCT', data.product);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
		})
	},
	removeProductFromCart({commit}, product){
		commit('REMOVE_PRODUCT_FROM_CART', product);
	},

	disabledProductPopup({commit}) {
		commit('DISPLAY_PRODUCT_POPUP', {
			status: false,
			componentsList: {}
		})
	}
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
	// Set all product information with options localizations e.t.c. by product id
	SET_PRODUCT(state, product) {
		state.product = product;
	},

	ACTIVE_PRODUCT(state, data) {
		state.activeProduct = data.id;
		state.productDescription = data.description;
	},
	ACTIVE_PRODUCT_IN_CART(state, activeProductInCart) {
		state.activeProductInCart = activeProductInCart;
	},

	// Editing cart
	ADD_PRODUCT_TO_CART(state, product) {
		// console.debug(product)

		state.productsListInCart.push(product.item);

		for(let i = 0; i < product.quantity; i++) {
			state.productsListInCart.push(product.item);
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

	DISPLAY_PRODUCT_POPUP (state, popup) {
		state.productPopupStatus = popup.status
		state.productPopupComponentsList = popup.componentsList
	}

};

const getters = {
	productsList: state => state.productsList,
	productsListInCart: state => state.productsListInCart,

	// Set all product information with options localizations e.t.c. by product id
	product: state => state.product,
	productInfo: state => state.productInfo,
	productPopupStatus: state => state.productPopupStatus,
	productPopupComponentsList: state => state.productPopupComponentsList,

	activeProduct: state => state.activeProduct,
	activeProductInCart: state => state.activeProductInCart,
};

export default {state, actions, mutations, getters}