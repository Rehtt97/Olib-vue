<template>
	<ul class="review-list">
		<ReviewItem
			v-for="review in reviews"
			:review="review"
			:key="review.id"
		></ReviewItem>
	</ul>
</template>

<script>
import ReviewItem from './ReviewItem.vue';
export default {
	name: 'ReviewList',
	props: {
		reviews: Array
	},
	components: {
		ReviewItem
	}
};
</script>
