<template>
	<div class="pagination">
		<el-pagination
			background
			layout="prev, pager, next"
			:total="totalBooks"
			:page-size="pageSize"
			:current-page="page"
			:hide-on-single-page="true"
			@current-change="pageChange"
			@pre-click="pageChange"
			@next-click="pageChange"
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		page: Number,
		totalBooks: Number,
		pageSize: Number
	},
	methods: {
		pageChange(currentPage) {
			this.$emit('pageChange', currentPage);
			this.$router.push(`/books/page/${currentPage}`);
		}
	}
};
</script>

<style>
.pagination {
	margin: 20px auto;
	text-align: center;
	position: absolute;
	bottom: -100px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
