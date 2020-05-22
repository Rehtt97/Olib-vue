<template>
	<div class="bookCard">
		<a :href="'/books/' + book.id + '/detail'" class="bookCardLink">
			<figure class="book-cover">
				<img :src="$remoteHost + book.cover" alt="" class="book-cover" />
			</figure>

			<div class="book-info">
				<span class="book-title">{{ book.title }}</span>
				<span class="book-author">{{ book.author[0] }}</span>
			</div>
		</a>
	</div>
</template>

<style scoped>
.bookCard {
	padding: 15px;
}

.bookCard:hover {
	background-color: #cde0c9;
}

.book-cover {
	width: 120px;
	height: 180px;
	margin-bottom: 15px;
	overflow: hidden;
	box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.book-info {
	width: 120px;
}

.book-title {
	font-size: 1.2rem;
	color: #333333;
	font-weight: bold;
	display: block;
	padding-bottom: 4px;
}
.book-author {
	color: #777777;
	font-size: 1.2rem;
}
</style>

<script>
export default {
	name: 'bookCard',
	props: {
		book: {
			type: Object
		}
	}
};
</script>
