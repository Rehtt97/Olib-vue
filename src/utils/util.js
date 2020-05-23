import Swal from 'sweetalert2';

export function throttle(fn, delay) {
	var timer;
	return function() {
		var _this = this;
		var args = arguments;
		if (timer) {
			return;
		}
		timer = setTimeout(function() {
			fn.apply(_this, args);
			timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
		}, delay);
	};
}

export const notifier = notify => {
	Swal.fire({
		icon: notify.type,
		title: notify.title,
		showConfirmButton: false,
		timer: notify.time || 1500,
		text: notify.message || ''
	});
};

export const notifySuccess = ({ title, message, time = 1500 }) =>
	notifier({ title, message, time, type: 'success' });

export const notifyError = ({ title, message, time = 2500 }) =>
	notifier({ title, message, time, type: 'error' });
