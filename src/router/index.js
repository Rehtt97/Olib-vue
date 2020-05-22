import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);
const Login = () => import('../views/Login.vue');
const SignUp = () => import('../views/SignUp.vue');
const Detail = () => import('../views/Detail.vue');
const Manage = () => import('../views/Manage.vue');
const EbookReader = () => import('@/components/ebook/EbookReader.vue');
const ManageMe = () => import('@/components/manage/ManageMe.vue');
const ManageBookList = () => import('@/components/manage/ManageBookList.vue');

const routes = [
	{
		path: '/',
		redirect: '/books/page/1'
	},
	{
		path: '/books/page/:id',
		name: 'Books',
		component: Home,
		meta: {
			title: 'Olib | All books'
		}
	},
	{
		path: '/books/:id/detail',
		name: 'Details',
		component: Detail,
		meta: {
			title: 'Olib |'
		}
	},
	{
		path: '/book/:id/read',
		name: 'EbookReader',
		component: EbookReader
	},
	{
		path: '/books',
		name: 'BooksSearch',
		component: Home,
		meta: {
			title: 'Olib | Search result'
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			title: 'Olib | Login'
		}
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: SignUp,
		meta: {
			title: 'Olib | Sign Up'
		}
	},
	{
		path: '/user/:userId/manage',
		name: 'Manage',
		component: Manage,
		children: [
			{
				path: '',
				redirect: 'me'
			},
			{
				path: 'me',
				component: ManageMe,
				name: 'ManageMe'
			},
			{
				path: 'bookList',
				component: ManageBookList,
				name: 'ManageBookList'
			}
		]
	}
];

const router = new VueRouter({
	routes,
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	// console.log(to, from);
	document.title = to.meta.title;
	next();
});

export default router;
