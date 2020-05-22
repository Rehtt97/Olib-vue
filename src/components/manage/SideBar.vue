<template>
	<div class="sidebar">
		<ul class="side-nav">
			<li><router-link to="./me">我的信息</router-link></li>
			<li><a href="./bookList">我的书单</a></li>
			<li><a href="./bookUpload">上传书籍</a></li>
			<li v-if="user.role === 'admin'"><a href="./books">书籍管理</a></li>
			<li v-if="user.role === 'admin'"><a href="./users">用户管理</a></li>
			<li v-if="user.role === 'admin'"><a href="./reviews">评论管理</a></li>
		</ul>
	</div>
</template>

<style scoped>
.sidebar {
	position: absolute;
	overflow: auto;
	width: 15%;
	background-color: #f1f1f1;
	height: 100vh;
}
.side-nav {
	list-style-type: none;
}
.side-nav a:link,
.side-nav a:visited {
	font-size: 1.8rem;
	padding-left: 2em;
	padding-top: 1.2em;
	padding-bottom: 1.2em;
	display: block;
	color: #333;
	transition: 0.2s;
}

.side-nav a:hover {
	background-color: #ddd;
	color: #000;
}
</style>

<script>
export default {
	name: 'SideBar',
	data() {
		return {
			user: this.$store.getters.getCurrentUser
		};
	}
};
</script>
