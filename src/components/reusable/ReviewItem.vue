<template>
	<li class="review-item">
		<div class="review-content">{{ review.review }}</div>
		<div class="review-rate">
			<el-rate v-model="review.rating" disabled> </el-rate>
		</div>
		<div class="user_time">
			<div class="review-user">
				<span class="des">By</span>
				<img
					class="user-img"
					:src="$remoteImg + '/users/' + review.user.avatar"
					:alt="review.user.username + 'image'"
				/>
				<span class="user-name">{{ review.user.username }}</span>
			</div>
			<div class="review-time">{{ review.createAt | formatDate }}</div>
		</div>
	</li>
</template>

<style scoped>
.review-item {
	font-size: 1.6rem;
	list-style: none;
	padding: 0 20px;
	padding-bottom: 15px;
	border-bottom: 1px dashed #6d6b6b;
}

.review-content {
	padding: 25px 0;
}

.review-rate {
	display: flex;
	justify-content: flex-end;
}
.user-img {
	width: 35px;
	border-radius: 50%;
}

.user-name {
	position: relative;
	left: 3px;
	top: -12px;
	font-size: 1.3rem;
}

.review-time {
	font-size: 1.3rem;
	position: relative;
	top: 1rem;
	/* left: 1rem; */
	left: -8px;
}

.user_time {
	display: flex;
	justify-content: flex-end;
}
.review-user {
	position: relative;
	left: -30px;
}

.des {
	font-size: 1.8rem;
	font-style: italic;
	position: relative;
	top: -8px;
	left: -6px;
}
</style>

<script>
export default {
	name: 'ReviewItem',
	props: {
		review: Object
	}
};
</script>
