<template>
	<div class="searchBar">
		<form>
			<input
				class="search-input"
				type="text"
				placeholder="书名/作者"
				v-model="queryStr"
			/>
			<button class="search-btn" @click.prevent="search">
				<i class="el-icon-search"></i>
			</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'SearchBar',
	data() {
		return {
			queryStr: ''
		};
	},
	methods: {
		search() {
			this.$router.push({
				path: '/books',
				query: {
					titleOrauthor: this.queryStr
				}
			});
		}
	}
};
</script>

<style>
.searchBar {
	margin-top: 60px;
	padding: 0 30%;
	font-size: 2rem;
	text-align: center;
}

.search-input {
	width: 80%;
	height: 100%;
	padding: 8px 12px;
	border: 0.5px solid #333;
	border-top-right-radius: 0;
	border-bottom-left-radius: 0;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}

.search-btn {
	display: inline-block;
	border: none;
	position: relative;
	width: 60px;
	height: 40px;
	left: -61px;
	background: #ddd;
	cursor: pointer;
}
.search-btn:hover {
	background: #c1c1c1;
}
</style>
