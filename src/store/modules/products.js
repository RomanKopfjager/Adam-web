import axios from '@/services/api';
import logo from '@/assets/img/logo_black.png';

// import axios from "axios";

const state = {
	categoryStatus: false,
	categoryId: null,
	productsList: []
};

const actions = {

	getCategoryId({commit}, categoryId){
		commit('SET_CATEGORY_ID', categoryId);
	},

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
	}
};

const mutations = {
	SET_CATEGORY_ID(state, categoryId) {
		state.categoryId = categoryId;
	},
	SET_CATEGORIES_BY_PRODUCT_ID(state, productsList) {
		state.categoryStatus = false;
		state.productsList = productsList;
	}
};

const getters = {
	productsList: state => state.productsList,
	categoryStatus: state => state.categoryStatus
};

export default {state, actions, mutations, getters}