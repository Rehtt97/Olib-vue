import Vue from 'vue';
import element from './element';
import '../theme/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;
// remote point to the remote user avatar
Vue.prototype.$remoteHost = 'http://127.0.0.1:8000';
Vue.prototype.$remoteImg = 'http://127.0.0.1:8000/img';

Vue.use(element);
Vue.filter('formatDate', function(val) {
	const date = new Date(val);
	return date.toLocaleDateString();
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

// Auto-authentication
const token = localStorage.getItem('token');
if (token) {
	axios.defaults.headers.common['Authorization'] = token;
}
