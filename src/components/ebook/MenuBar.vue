<template>
	<div class="menu-bar">
		<!-- 一级菜单 -->
		<transition name="slide-up">
			<div
				class="menu-wrapper"
				:class="{ 'hide-box-shadow': ifSettingShow }"
				v-show="ifTitleAndMenuShow"
			>
				<div class="icon-wrapper">
					<span class="icon-menu icon" @click="showSetting(3)"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-progress icon" @click="showSetting(2)"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-bright icon" @click="showSetting(1)"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-a icon" @click="showSetting(0)">A</span>
				</div>
			</div>
		</transition>
		<!-- 二级菜单 -->
		<transition name="slide-up">
			<div class="select">
				<div class="setting-wrapper" v-show="ifSettingShow">
					<!-- 字体 -->
					<div class="setting-font-size" v-if="showTag === 0">
						<div
							class="preview"
							:style="{ fontSize: fontSizeList[0].fontSize + 'px' }"
						>
							A
						</div>
						<div class="select">
							<div
								class="select-wrapper"
								v-for="(item, index) in fontSizeList"
								:key="index"
								@click="$emit('setFontSize', item.fontSize)"
							>
								<div class="line"></div>
								<div class="point-wrapper">
									<div
										class="point"
										v-show="selectedFontSize === item.fontSize"
									>
										<div class="small-point"></div>
									</div>
								</div>
								<div class="line"></div>
							</div>
						</div>
						<div
							class="preview"
							:style="{
								fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'
							}"
						>
							A
						</div>
					</div>

					<!-- 主题 -->
					<div class="setting-theme" v-if="showTag === 1">
						<div
							class="setting-theme-item"
							v-for="(item, index) in themeList"
							:key="index"
							@click="$emit('setTheme', index)"
						>
							<div
								class="preview"
								:style="{ background: item.style.body.background }"
								:class="{ 'no-border': item.style.body.background !== '#fff' }"
							></div>
							<div
								class="text"
								:class="{ selected: index === selectedThemeIndex }"
							>
								{{ item.name }}
							</div>
						</div>
					</div>

					<!-- 进度 -->
					<div class="setting-progress" v-if="showTag === 2">
						<div class="progress-wrapper">
							<input
								class="progress"
								type="range"
								max="100"
								min="0"
								step="1"
								@change="$emit('onProgressChange', $event.target.value)"
								@input="onProgressInput($event.target.value)"
								:value="progress"
								:disabled="!bookAvailable"
								ref="progress"
							/>
						</div>
						<div class="text-wrapper">
							<span>{{ bookAvailable ? progress + '%' : '加载中...' }}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>

		<!-- 目录 -->
		<content-view
			:ifShowContent="ifShowContent"
			v-show="ifShowContent"
			:navigation="navigation"
			:bookAvailable="bookAvailable"
			@jumpTo="jumpTo"
		></content-view>
		<!-- 目录遮罩 -->
		<transition name="fade">
			<div
				class="content-mask"
				v-show="ifShowContent"
				@click="hideContent"
			></div>
		</transition>
	</div>
</template>

<script>
import ContentView from './Content';

export default {
	components: {
		ContentView
	},
	props: {
		ifTitleAndMenuShow: Boolean,
		themeList: Array,
		selectedFontSize: Number,
		selectedThemeIndex: Number,
		bookAvailable: Boolean,
		navigation: Object
	},
	data() {
		return {
			ifSettingShow: false,
			showTag: 0,
			progress: 0,
			ifShowContent: false,
			fontSizeList: [
				{ fontSize: 12 },
				{ fontSize: 14 },
				{ fontSize: 16 },
				{ fontSize: 18 },
				{ fontSize: 20 },
				{ fontSize: 22 },
				{ fontSize: 24 }
			]
		};
	},
	methods: {
		jumpTo(target) {
			this.$emit('jumpTo', target);
		},
		hideContent() {
			this.ifShowContent = false;
		},
		// 拖动进度条事件
		onProgressInput(progress) {
			this.progress = progress;
			this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
		},
		showSetting(tag) {
			this.showTag = tag;
			if (this.showTag === 3) {
				this.ifSettingShow = false;
				this.ifShowContent = true;
			} else {
				this.ifSettingShow = true;
			}
		},
		hideSetting() {
			this.ifSettingShow = false;
		}
	}
};
</script>
