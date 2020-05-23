<template>
	<div class="me">
		<div class="profile">
			<form @submit.prevent="updateMe">
				<h2>我的信息</h2>
				<div class="data-field">
					<label for="username">用户名</label>
					<input type="text" v-model="username" />
				</div>
				<div class="data-field">
					<label for="email">邮箱</label>
					<input type="email" v-model="email" />
				</div>
				<div class="data-field">
					<img
						class="userImg"
						:src="$remoteImg + '/users/' + user.avatar"
						alt="用户头像"
					/>
					<label for="avatar" id="uploadImgBtn">上传头像</label>
					<input type="file" accept="image/*" name="avatar" id="avatar" />
				</div>
				<button class="btn btn-primary btn-save">保存设置</button>
			</form>
			<form
				autocomplete="off"
				class="form-changpwd"
				@submit.prevent="updatePassword"
			>
				<h2>更改密码</h2>
				<div class="data-field">
					<label for="opassword">原密码</label>
					<input
						type="password"
						v-model="originPassword"
						placeholder="●●●●●●●●●"
					/>
				</div>
				<div class="data-field">
					<label for="npassword">新密码</label>
					<input type="password" v-model="password" placeholder="●●●●●●●●●" />
				</div>
				<div class="data-field">
					<label for="npasswordc">确认密码</label>
					<input
						type="password"
						v-model="passwordConfirm"
						placeholder="●●●●●●●●●"
					/>
				</div>
				<button class="btn btn-primary btn-save btn-save-pwd">保存密码</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
.me {
	margin-left: 35%;
	width: 55%;
	/* padding: 100px 0 0 300px; */
	padding-top: 80px;
}

form {
	position: relative;
	overflow: visible;
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
	width: 60%;
}
.data-field {
	margin-bottom: 25px;
}
.userImg {
	border-radius: 50%;
	height: 100px;
	width: 100px;
}
#avatar {
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
.btn-save {
	width: 120px;
	border-radius: 18px;
	text-transform: uppercase;
	letter-spacing: 1px;
	position: absolute;
	right: 0;
	bottom: 10px;
	font-size: 1.8rem;
}

.form-changpwd {
	border-top: 1px solid #ccc;
	margin-top: 70px;
	padding-top: 35px;
}

.btn-save-pwd {
	bottom: -70px;
}
</style>
<script>
import { notifySuccess, notifyError } from '@/utils/util.js';
import * as req from '@/network/request.js';
export default {
	name: 'ManageMe',
	data() {
		return {
			username: this.$store.getters.getCurrentUser.username,
			email: this.$store.getters.getCurrentUser.email,
			originPassword: '',
			password: '',
			passwordConfirm: ''
		};
	},
	computed: {
		user() {
			return this.$store.getters.getCurrentUser;
		}
	},
	methods: {
		async updateMe() {
			const form = new FormData();
			const avatar = document.querySelector('#avatar');
			if (avatar.files.length > 0) {
				form.append('avatar', avatar.files[0]);
			}
			form.append('username', this.username);
			form.append('email', this.email);
			try {
				await this.$store.dispatch('updateUser', form);
				notifySuccess({ title: '您的信息已更新成功' });
			} catch (err) {
				let message;
				if (err.response) message = err.response.data.message;
				message = '无法访问到服务器';
				notifyError({ title: '信息更新失败', message });
				console.log(err);
			}
		},
		async updatePassword() {
			try {
				await req.updateUser(
					{
						originPassword: this.originPassword,
						password: this.password,
						passwordConfirm: this.passwordConfirm
					},
					'password'
				);
				notifySuccess({ title: '密码更新成功' });
			} catch (err) {
				let message;
				if (err.response) message = err.response.data.message;
				message = '无法访问到服务器';
				notifyError({
					title: '密码更新失败',
					message
				});
				console.log(err);
			}
		}
	}
};
</script>
