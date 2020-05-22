<template>
	<div class="header">
		<div class="header-logo">
			<a href="/">
				<img src="../assets/img/logo.png" alt="Olib Logo" />
			</a>
		</div>
		<nav class="header-nav">
			<div class="header-nav-group" v-if="!isLoggedIn">
				<a href="#" class="nav-el header-nav-login" @click="logIn">Log in</a>
				<a href="#" class="nav-el header-nav-signup" @click="signUp">Sign up</a>
			</div>
			<div class="header-nav-group" v-else>
				<a href="#" class="nav-el header-nav-logout" @click="logout">Log out</a>
				<a href="#" class="nav-el header-nav-user" @click="gotoManage">
					<img
						:src="$remoteImg + '/users/' + user.avatar"
						:alt="user.username"
						class="user-avatar"
					/>
					<span>{{ user.username }}</span>
				</a>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'Header',

	methods: {
		logIn() {
			this.$router.push('/login');
		},
		async logout() {
			try {
				await this.$store.dispatch('logout');
				if (this.$route.path !== '/books/page/1') {
					this.$notify({
						title: '登出成功!',
						dangerouslyUseHTMLString: true,
						message: `2s后将返回首页...`,
						type: 'success',
						position: 'top-left',
						showClose: false,
						offset: 100,
						duration: 3000
					});
					setTimeout(() => {
						this.$router.push('/');
					}, 2000);
				}
				console.log(this.$route);
			} catch (err) {
				console.log('登出失败！');
			}
		},
		signUp() {
			this.$router.push('/signup');
		},
		gotoManage() {
			this.$router.push(`/user/${this.user._id}/manage`);
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},
		user() {
			return this.$store.getters.getCurrentUser;
		}
	}
};
</script>

<style>
.header {
	display: flex;
	height: 70px;
	background: #68b2a0;
	background: linear-gradient(255deg, #68b2a0 0%, #68b2a0 44%, #cde0c9 100%);
	padding: 0 80px;
	justify-content: space-between;
}

.header-logo {
	display: flex;
	align-items: center;
}

.header-logo img {
	width: 125px;
}

.header-nav-group {
	display: flex;
	align-items: center;
	height: 100%;
}

.nav-el:link,
.nav-el:visited {
	display: inline-block;
	padding: 10px 18px;
	font-size: 2rem;
	font-weight: 300;
	color: #fff;
	margin-left: 20px;
	text-transform: uppercase;
	transition: 0.2s all;
	position: relative;
	top: 0;
}

.nav-el:hover,
.nav-el:active {
	top: -3px;
	text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
		0px -5px 35px rgba(255, 255, 255, 0.3);
}

.user-avatar {
	width: 50px;
	border-radius: 50%;
}

.header-nav-user {
	margin-left: 25px;
}

.header-nav-user span {
	color: #fff;
	font-size: 1.8rem;
	position: relative;
	top: -18px;
	left: 10px;
	font-weight: 300;
}

.header-nav-signup:link,
.header-nav-signup:visited {
	border: 1px solid #fff;
	border-radius: 30px;
}

.header-nav-signup:hover,
.header-nav-signup:active {
	background-color: #fff;
	color: rgba(104, 178, 160);
}
</style>
