<template>
	<div id="book-review" v-if="reviews">
		<h2 class="subtitle">评论({{ numReview }})</h2>
		<ReviewList :reviews="showReviews"></ReviewList>
		<CreateReviewForm @reviewCreated="refreshReview" />
	</div>
</template>

<style>
#book-review {
	background: rgba(242, 242, 242, 0.282);
	margin: 100px auto;
	width: 40%;
}

.subtitle {
	margin: 40px 0 50px 15px;
	font-size: 2.5rem;
	border-left: 5px solid #54a491;
	padding-left: 10px;
	padding-bottom: 10px;
	border-bottom: 2.5px solid #ccc;
}
</style>

<script>
import ReviewList from './reusable/ReviewList';
import CreateReviewForm from './reusable/CreateReviewForm';
import * as req from '@/network/request.js';
export default {
	name: 'SubReview',
	props: {
		reviews: Array
	},
	components: {
		ReviewList,
		CreateReviewForm
	},
	data() {
		return {
			newReviews: []
		};
	},
	computed: {
		numReview() {
			return this.showReviews.length;
		},
		showReviews() {
			if (this.newReviews.length === 0) return this.reviews;
			return this.newReviews;
		}
	},
	methods: {
		async refreshReview(id) {
			try {
				this.newReviews = await req.getReviewsOfBook(id);
			} catch (err) {
				console.log(err);
			}
		}
	}
};
</script>
