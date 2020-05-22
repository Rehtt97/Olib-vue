<template>
	<div class="manage">
		<Header></Header>
		<SideBar></SideBar>
		<router-view></router-view>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import SideBar from '@/components/manage/SideBar.vue';
export default {
	name: 'Manage',
	components: {
		Header,
		SideBar
	}
};
</script>
