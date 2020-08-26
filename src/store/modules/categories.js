import axios from '@/services/api';

const state = {
	categoriesList: {},
};

const actions = {
	getCategories({commit}) {
		const url = 'commercial_categories_list.php';
		const token = localStorage.getItem('token');

		return new Promise((resolve, reject) => {

			let data = new FormData;
			data.append('token', token)

			axios.post(url, data)
					.then(response => {
						let allCategories = response.data.response;

						let categories = allCategories.filter(category => !category.parent_id)
						let subCategories = allCategories.filter(category => category.parent_id)

						categories.forEach((category) => {
							category.sub_category = subCategories.filter(subCategory => subCategory.parent_id === category.id)
						})

						commit('SET_CATEGORIES', categories);
						resolve(categories);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
		})
	}
};

const mutations = {
	SET_CATEGORIES(state, categoryList) {
		state.categoriesList = categoryList;
	}
};

const getters = {
	categoriesList: state => state.categoriesList
};

export default {state, actions, mutations, getters}