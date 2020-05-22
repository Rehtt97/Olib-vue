<template>
	<div class="login-page">
		<Header></Header>
		<div class="login-container">
			<h2 class="login-title">Log into your account</h2>
			<form class="login-form" @submit.prevent="login">
				<div class="form-group">
					<label for="email">Email Address</label>
					<input
						v-model="email"
						type="email"
						placeholder="your@example.com"
						required
					/>
				</div>
				<div class="form-group">
					<label for="email">Password</label>
					<input
						v-model="password"
						type="password"
						placeholder="•••••••••"
						required
					/>
				</div>
				<button type="sbumit" class="btn-submit">Login</button>
			</form>
		</div>
	</div>
</template>

<script>
import Header from '../components/Header';
export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: '',
			user: {}
		};
	},
	methods: {
		async login() {
			let email = this.email;
			let password = this.password;
			try {
				const res = await this.$store.dispatch('login', { email, password });
				this.$notify({
					title: 'Log in successfully!',
					dangerouslyUseHTMLString: true,
					message: `Welcome! ${res.data.data.user.username}. We will redirect you to the home page in 3s.`,
					type: 'success',
					position: 'top-left',
					showClose: false,
					offset: 100,
					duration: 2500
				});
				setTimeout(() => {
					this.$router.push('/');
				}, 3000);
			} catch (err) {
				this.$notify({
					title: 'Login fail!',
					dangerouslyUseHTMLString: true,
					message: `${err.response.data.message}.`,
					type: 'error',
					position: 'top-left',
					showClose: false,
					offset: 100
				});
			}
		}
	},
	components: {
		Header
	}
};
</script>
<style>
.login-page {
	background: #f7f7f7;
	height: 100vh;
}

.login-title {
	background: linear-gradient(
		to left,
		rgba(104, 178, 160, 1),
		rgb(162, 184, 157)
	);
	background-clip: text;
	color: transparent;
	font-size: 2.6rem;
	text-transform: uppercase;
	word-spacing: 5px;
	margin-bottom: 35px;
}

.login-container {
	margin-top: 180px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	background-color: #fff;
	border-radius: 5px;
	padding: 50px 70px;
	box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
}

.form-group {
	margin-bottom: 25px;
}

.form-group label {
	display: block;
	margin-bottom: 10px;
	font-size: 2rem;
}

.form-group input {
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

.login-form {
	width: 550px;
}

.btn-submit {
	border: none;
	margin-top: 5px;
	background-color: #68b2a0;
	color: #fff;
	font-size: 1.8rem;
	padding: 14px 30px;
	border-radius: 10rem;
	position: relative;
	top: 0;
	transition: 0.3s all;
	cursor: pointer;
}

.btn-submit:hover {
	top: -3px;
	-webkit-box-shadow: 0px 10px 13px -1px #ccc;
	box-shadow: 0px 10px 13px -1px #ccc;
}
</style>
