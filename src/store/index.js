import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as req from '../network/request';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		status: '',
		token: localStorage.getItem('token') || '',
		user: JSON.parse(localStorage.getItem('user')) || {}
	},
	mutations: {
		auth_request(state) {
			state.status = 'Loading';
		},
		auth_success(state, payload) {
			state.status = 'success';
			state.token = payload.token;
			state.user = { ...payload.user };
			// state.user.username = user.username;
		},
		auth_error(state) {
			state.status = 'Fail';
		},
		logout(state) {
			state.status = '';
			state.token = '';
		}
	},
	actions: {
		login({ commit }, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request');
				req
					.login(user)
					.then(res => {
						const token = res.data.token;
						const user = res.data.data.user;
						localStorage.setItem('token', `Bearer ${token}`);
						localStorage.setItem('user', JSON.stringify(user));
						axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
						commit({ type: 'auth_success', token, user });
						resolve(res);
					})
					.catch(err => {
						commit('auth_error');
						localStorage.removeItem('token');
						localStorage.removeItem('user');
						reject(err);
					});
			});
		},
		logout({ commit }) {
			return new Promise(resolve => {
				commit('logout');
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				resolve();
			});
		},
		signup({ commit }, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request');
				req
					.signup(user)
					.then(res => {
						const token = res.data.token;
						const user = res.data.data.user;
						localStorage.setItem('token', `Bearer ${token}`);
						localStorage.setItem('user', JSON.stringify(user));
						axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
						commit({ type: 'auth_success', token, user });
						resolve(res);
					})
					.catch(err => {
						commit('auth_error');
						localStorage.removeItem('token');
						localStorage.removeItem('user');
						reject(err);
					});
			});
		}
	},
	getters: {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		getCurrentUser: state => state.user
	},
	modules: {}
});
