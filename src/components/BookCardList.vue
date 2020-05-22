<template>
	<main class="BookCardList">
		<BookCardItem
			v-for="book in books"
			:key="book.id"
			:book="book"
		></BookCardItem>
	</main>
</template>

<style scoped>
.BookCardList {
	padding: 0 20%;
	display: grid;
	grid-template-columns: repeat(auto-fill, 150px);
	/* grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); */
	grid-column-gap: 35px;
	grid-row-gap: 40px;
	justify-items: center;
	justify-content: center;
	margin-top: 50px;
}
</style>

<script>
import BookCardItem from './BookCardItem';
export default {
	name: 'BookCardList',
	props: {
		books: {
			type: Array
		}
	},
	components: {
		BookCardItem
	}
};
</script>
