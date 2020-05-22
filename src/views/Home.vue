<template>
	<div class="home">
		<Header></Header>
		<SearchBar></SearchBar>
		<BookCardList :books="showBooks"></BookCardList>
		<div class="search-res" v-if="numSearchRes === -1">
			抱歉，没有搜索到相关资源...
		</div>
		<Pagination
			:total-books="totalBook"
			:page-size="numBooksPerPage"
			:page="page"
			@pageChange="pageChangeHandler"
		></Pagination>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header';
import BookCardList from '@/components/BookCardList';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import * as req from '../network/request';

// Math.ceil((document.body.clientWidth * 0.6 - 150) / 185)
export default {
	name: 'Home',
	components: {
		Header,
		BookCardList,
		Pagination,
		SearchBar
	},
	data() {
		return {
			books: [],
			page: 1,
			numBooksPerPage: 24,
			numTotalBooks: 0,
			numSearchRes: 0
		};
	},
	created() {
		this.handleResize();
		this.getBookData({ page: 1, limit: this.numBooksPerPage });
		this.getNumTotalBooks();
	},
	mounted() {
		// window.addEventListener('resize', this.handleResize);
	},
	methods: {
		async getBookData(params) {
			try {
				const res = await req.getBooks(params);
				this.books = res.data;
			} catch (err) {
				console.log(err);
			}
		},
		getNumTotalBooks() {
			req
				.getNumTotalBooks()
				.then(res => {
					this.numTotalBooks = res;
				})
				.catch(err => {
					console.log(err);
				});
		},
		pageChangeHandler(page) {
			this.page = page;
			this.getBookData({ page, limit: this.numBooksPerPage });
		},
		handleResize() {
			// 根据浏览器窗口的宽度决定每页显示的书本数量
			this.numBooksPerPage =
				Math.ceil((document.body.clientWidth * 0.6 - 150) / 185) * 3;
		},
		async searchBook(queryStr) {
			try {
				const res = await req.getBooks({ like: true, title: queryStr });
				this.books = res.data;
				if (res.data.length === 0) {
					const res = await req.getBooks({ like: true, author: queryStr });
					this.books = res.data;
				}
				//If numSearcgRes equals to -1 mean no result,-1 is need to render no result fragment
				if (this.books.length === 0) this.numSearchRes = -1;
				else this.numSearchRes = this.books.length;
			} catch (err) {
				console.log(err);
			}
		}
	},
	watch: {
		async $route(to) {
			if (Object.keys(to.query).length !== 0) {
				await this.searchBook(to.query.titleOrauthor);
			} else {
				this.pageChangeHandler(parseInt(to.params.id));
			}
		}
	},
	computed: {
		showBooks() {
			if (this.books.length <= this.numBooksPerPage) {
				return this.books;
			}
			const start = (this.page - 1) * this.numBooksPerPage;
			return this.books.slice(start, start + this.numBooksPerPage);
		},
		totalBook() {
			if (this.numSearchRes) return this.numSearchRes;
			return this.numTotalBooks;
		}
	},

	beforeRouteLeave(to, from, next) {
		this.numSearchRes = 0;
		next();
	}
};
</script>

<style>
.home {
	position: relative;
	min-height: 90vh;
}

.search-res {
	padding-left: 33%;
	margin-top: 100px;
	font-size: 2rem;
}
</style>
