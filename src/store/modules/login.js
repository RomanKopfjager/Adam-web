import axios from '@/services/api';

const state = {
	status: '',
	token: localStorage.getItem('token') || '',
	loginText: 'Connecting...',
};

const actions = {
	userLogin({commit}, userData) {
		const url = 'login.php';

		return new Promise((resolve, reject) => {
			let post = new FormData;
			post.append('login', userData.login)
			post.append('password', userData.password)

			commit('AUTH_REQUEST');
			axios.post(url, post)
					.then(response => {
								if (response.data.error) {
									switch (response.data.error.code) {
										case(1) :
											commit('AUTH_ERROR_USER');
											break;
										case(2) :
											commit('AUTH_ERROR_PASSWORD');
											break;
										default :
											commit('AUTH_ERROR_USER');
									}
									const data = response.data;
									resolve(data);
								} else {
									const token = response.data.response.token;
									localStorage.setItem('token', token)
									axios.defaults.headers.common['Authorization'] = token;

									commit('AUTH_SUCCESS', token);
									resolve(token);
								}
							}
					)
					.catch(error => {
						localStorage.removeItem('token');

						commit('AUTH_ERROR');
						reject(error);
					})
		})
	}
};

const mutations = {
	AUTH_REQUEST(state) {
		state.status = false;
	},

	AUTH_SUCCESS(state, token) {
		state.status = true;
		state.token = token;
		state.loginText = 'Logged in';
	},

	AUTH_ERROR_USER(state) {
		state.status = false;
		state.token = '';
		state.loginText = 'User not exist';
	},
	AUTH_ERROR_PASSWORD(state) {
		state.status = false;
		state.token = '';
		state.loginText = 'Invalid password';
	}
};

const getters = {
	isLoggedIn: state => !!state.token,
	authStatus: state => state.status,
	loginText: state => state.loginText,
};

export default {state, actions, mutations, getters}