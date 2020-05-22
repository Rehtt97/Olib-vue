<template>
	<div class="book-detail">
		<Header></Header>
		<el-page-header
			@back="goBack"
			content="书籍详情"
			class="sub-header"
		></el-page-header>
		<div class="book-info">
			<div class="book-cover">
				<img :src="$remoteHost + book.cover" :alt="book.title + 'image'" />
			</div>
			<div class="book-meta">
				<ul>
					<li>书名: {{ book.title }}</li>
					<li>作者: {{ book.author | formatAuthor }}</li>
					<li>语言: {{ book.language }}</li>
					<li>标签: {{ book.categories }}</li>
					<li>出版社: {{ book.press }}</li>
					<li>出版日期: {{ book.publishDate | formatBookDate }}</li>
					<li>ISBN: {{ book.ISBN }}</li>
					<li>下载次数: {{ book.downloadTimes }}</li>
				</ul>
			</div>
			<div class="book-op">
				<ul>
					<li>
						<a href="#" class="hvr-bounce-in" @click="read">立刻阅读</a>
					</li>
					<li>
						<a href="#" class="hvr-bounce-in">添加至书单</a>
					</li>
					<li>
						<a href="#" class="hvr-bounce-in" @click="download">下载</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="book-summary">
			<h2 class="subtitle">内容简介</h2>
			<summary class="summary" v-html="book.summary"></summary>
		</div>
		<SubReview :reviews="book.reviews"></SubReview>
	</div>
</template>

<style scoped>
.book-detail {
	background: #fcfcfc;
	padding-bottom: 200px;
}
.sub-header {
	width: 40%;
	margin: 100px auto;
	margin-bottom: 15px;
}

.book-info {
	display: flex;
	background: #eaeaea;
	margin: 30px auto;
	width: 40%;
	justify-content: space-between;
	padding: 15px;
	font-size: 1.6rem;
}

.book-cover {
	width: 150px;
}
.book-cover img {
	width: 100%;
	/* border: 1px solid rgba(161, 36, 36, 0.062); */
	box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
.book-meta {
	width: 300px;
	margin-left: 45px;
	color: #333;
	flex: 1;
}
.book-meta > ul {
	list-style-type: none;
	border-left: 0.8px solid #ccc;
	padding-left: 30px;
}
.book-meta li {
	padding-bottom: 14px;
}

.book-op {
	display: flex;
	align-items: flex-end;
}

.book-op ul {
	list-style-type: none;
}

.book-op a:link,
.book-op a:visited {
	display: block;
	padding: 8px 12px;
	color: #fff;
	background-color: #68b2a0;
	margin-bottom: 12px;
	transition: all 0.2s;
}

.book-op a:hover,
.book-op a:active {
	background-color: #54a491;
}

.book-summary {
	border-top: 1px solid #ccc;
	background: rgba(242, 242, 242, 0.282);
	margin: 0 auto;
	height: 800px;
	width: 40%;
}

.subtitle {
	margin: 40px 0 50px 15px;
	font-size: 2.5rem;
	border-left: 5px solid #54a491;
	padding-left: 10px;
}
</style>
<script>
import Header from '@/components/Header.vue';
import SubReview from '@/components/SubReview.vue';
import * as req from '@/network/request.js';
export default {
	name: 'Detail',
	data() {
		return {
			id: this.$route.params.id,
			book: {}
		};
	},
	components: {
		Header,
		SubReview
	},
	created() {
		this.getBook(this.id);
	},
	methods: {
		async getBook(id) {
			try {
				const res = await req.getBook(id);
				this.book = res.data;
				if (this.book.ISBN) this.book.ISBN = 'NULL';
			} catch (err) {
				console.log(err);
			}
		},
		goBack() {
			this.$router.go(-1);
		},
		async download() {
			try {
				await req.downloadBook(this.id, this.book.title);
			} catch (err) {
				this.$notify({
					title: '下载失败',
					type: 'error',
					message: '请先登录，然后重试！',
					position: 'top-left',
					offset: 100
				});
			}
		},
		read() {
			this.$router.push({
				name: 'EbookReader',
				params: {
					id: this.id,
					filename: this.book.filename
				}
			});
		}
	},
	filters: {
		formatAuthor(val) {
			if (val) return val.join(',');
			else return 'NULL';
		},
		formatBookDate(val) {
			if (!val) return 'NULL';
			const date = new Date(val);
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		}
	}
};
</script>
