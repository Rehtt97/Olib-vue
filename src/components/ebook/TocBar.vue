<template>
	<transition name="slide-right">
		<div class="toc" :style="{ color: COLOR, background: BGC }">
			<div
				v-for="item in navigation.toc"
				:key="item.id"
				@click="jumpTo(item.href)"
			>
				<span class="text">{{ item.label }}</span>
				<div
					v-for="subItem in item.subitems"
					:key="subItem.id"
					@click.stop="jumpTo(subItem.href)"
				>
					<span class="text">{{ subItem.label }}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'TocBar',
	props: {
		navigation: Object,
		bgc: {
			type: String,
			default: '#ecf0f1'
		},
		color: { type: String, default: '#555' }
	},
	methods: {
		jumpTo(target) {
			this.$emit('jumpTo', target);
		}
	},
	computed: {
		BGC() {
			if (this.bgc === '#fff') return '#ecf0f1';
			return this.bgc;
		},
		COLOR() {
			if (this.color === '#000') return '#555';
			return this.color;
		}
	}
};
</script>

<style scoped>
.toc {
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 12%;
	font-size: 1.6rem;
	border-right: 2px solid #ccc;
	overflow: auto;
}

span {
	display: inline-block;
	width: 100%;
	height: 100%;
	padding: 6px 12px;
	cursor: pointer;
	border-radius: 5px;
}

.toc span:hover {
	background-color: #ddd;
}
</style>
