<template>
	<form class="review-form">
		<h2 class="subtitle">发表评论</h2>
		<div class="form-wrapper">
			<textarea
				name="review"
				id="review"
				placeholder="说点什么吧..."
				v-model="review"
			></textarea>
			<div class="review-rating">
				<div class="block">
					<span class="demonstration">评分</span>
					<el-rate
						v-model="rating"
						:colors="colors"
						:allow-half="true"
					></el-rate>
				</div>
			</div>
			<button class="btn btn-primary" @click.prevent="createReview">
				提交
			</button>
		</div>
	</form>
</template>

<script>
import * as req from '@/network/request.js';
export default {
	name: 'CreateReviewForm',
	data() {
		return {
			rating: 0,
			colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
			review: ''
		};
	},
	methods: {
		async createReview() {
			try {
				await req.createNewReview(this.$route.params.id, {
					review: this.review,
					rating: this.rating
				});
				this.$notify({
					title: '发表成功',
					type: 'success',
					position: 'top-left',
					offset: 0
				});
				this.$emit('reviewCreated', this.$route.params.id);
			} catch (err) {
				this.$notify({
					title: '发表失败',
					type: 'error',
					message: `${err.response.data.message}`,
					position: 'top-left',
					offset: 0
				});
			}
		}
	}
};
</script>

<style>
.review-form {
	margin-top: 80px;
}
.form-wrapper {
	padding: 0 20px;
}
#review {
	width: 100%;
	height: 300px;
	font-size: 1.6rem;
	padding: 15px;
	border-radius: 5px;
}

.review-rating {
	padding: 15px 0;
	font-size: 1.5rem;
}
</style>
