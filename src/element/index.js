import {
	Pagination,
	Notification,
	Icon,
	PageHeader,
	Rate,
	Drawer
} from 'element-ui';

const element = {
	install(Vue) {
		Vue.use(Drawer);
		Vue.use(Pagination);
		Vue.use(PageHeader);
		Vue.use(Rate);
		Vue.use(Icon);
		Vue.prototype.$notify = Notification;
	}
};

export default element;
