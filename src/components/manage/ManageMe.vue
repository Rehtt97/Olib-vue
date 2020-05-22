<template>
	<div class="me">
		<div class="profile">
			<h2>我的信息</h2>
			<form>
				<div class="data-field">
					<label for="username">用户名</label>
					<input type="text" v-model="username" />
				</div>
				<div class="data-field">
					<label for="email">邮箱</label>
					<input type="email" v-model="email" />
				</div>
				<div class="data-field">
					<img class="userImg" :src="$remoteImg + '/users/' + user.avatar" alt="用户头像" />
					<label for="uploadImg" id="uploadImgBtn">上传头像</label>
					<input type="file" accept="image/*" name="photo" id="uploadImg" />
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>
.me {
	margin-left: 35%;
	width: 50%;
	/* padding: 100px 0 0 300px; */
	padding-top: 80px;
}

label {
	display: block;
	margin-bottom: 10px;
	font-size: 1.6rem;
}

input {
	display: block;
	outline: none;
	border: none;
	background-color: #f2f2f2;
	padding: 17.5px 17.5px;
	width: 100%;
	border-radius: 4px;
	font-size: 1.6rem;
	font-size: 1.8rem;
}

.profile h2 {
	font-size: 3rem;
	font-weight: bold;
	margin-bottom: 30px;
}

.profile form {
	width: 80%;
}
.data-field {
	margin-bottom: 25px;
}
.userImg {
	border-radius: 50%;
	height: 100px;
	width: 100px;
}
#uploadImg {
	display: none;
}
#uploadImgBtn {
	color: #68b2a0;
	font-size: 1.8rem;
	padding: 5px 8px;
	display: inline-block;
	border-bottom: 1px solid #68b2a0;
	cursor: pointer;
	position: relative;
	top: -40px;
	left: 20px;
	transition: 0.2s all;
}

#uploadImgBtn:hover {
	background-color: #68b2a0;
	color: #fff;
}
</style>
<script>
export default {
	name: 'ManageMe',
	data() {
		return {
			user: this.$store.getters.getCurrentUser,
			username: this.$store.getters.getCurrentUser.username,
			email: this.$store.getters.getCurrentUser.email,
			photo: ''
		};
	}
};
</script>
