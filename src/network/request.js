import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';

// Login
export const login = async user => {
	const res = await axios({
		method: 'POST',
		url: '/users/login',
		data: user
	});
	return res;
};

export const signup = async user => {
	const res = await axios({
		method: 'POST',
		url: '/users/signup',
		data: user
	});
	return res;
};

export const getBooks = async params => {
	const res = await axios({
		method: 'GET',
		url: '/books',
		params
	});
	return res.data.data.data;
};

export const getNumTotalBooks = async () => {
	const res = await axios({
		method: 'GET',
		url: '/books/numTotalBooks'
	});
	return res.data.data.count;
};

export const getBook = async id => {
	const res = await axios({
		method: 'GET',
		url: `/books/${id}`
	});
	return res.data.data;
};

export const createNewReview = async (id, data) => {
	const res = await axios({
		method: 'POST',
		url: `/books/${id}/reviews`,
		data
	});
	return res.data;
};

export const getReviewsOfBook = async id => {
	const res = await axios({
		method: 'GET',
		url: `/books/${id}/reviews`
	});
	// console.log('res:', res.data.data);
	return res.data.data.reviews;
};

export const downloadBook = async (id, bookName) => {
	// 下面这种方式无法正确设置文件名字
	//  所以我决定直接从组件把文件名字传过来
	const res = await axios({
		url: `/books/${id}/download`,
		method: 'GET',
		responseType: 'blob' // important
	});

	const url = window.URL.createObjectURL(new Blob([res.data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${bookName}.epub`); //or any other extension
	document.body.appendChild(link);
	link.click();
};

export const updateUserInfo = async (data, type) => {
	const url =
		type === 'password' ? '/users/updateMypassord' : '/users/updateMe';

	const res = await axios({
		url,
		method: 'PATCH',
		data
	});
	return res;
};
