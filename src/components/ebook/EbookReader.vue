<template>
	<div
		id="reader"
		:class="readerTheme"
		:style="{ background: readerTheme.background }"
	>
		<el-drawer
			:visible.sync="menuShow"
			direction="ttb"
			:modal="false"
			size="10%"
			custom-class="menu"
		>
			<div slot="title">
				<span class="menu-title"><i class="el-icon-setting">Menu</i></span>
			</div>
			<div class="setting">
				<div class="theme-settings">
					<span>配色</span>
					<ul class="theme-op">
						<li><div class="op op-1" @click="changeTheme(0)"></div></li>
						<li><div class="op op-2" @click="changeTheme(1)"></div></li>
						<li><div class="op op-3" @click="changeTheme(2)"></div></li>
					</ul>
				</div>
				<div class="fontsize-settings">
					<span>字号</span>
					<select
						class="fontsize-ops"
						@change="changeFontSize($event.target.value)"
					>
						<option value="16">16px</option>
						<option value="18">18px</option>
						<option value="20">20px</option>
						<option value="22">22px</option>
						<option value="24">24px</option>
					</select>
				</div>
			</div>
		</el-drawer>
		<TocBar
			:navigation="navigation"
			@jumpTo="jumpTo"
			:bgc="readerTheme.background"
			:color="readerTheme.color"
		></TocBar>
		<div id="read"></div>
		<div class="prev-wrapper">
			<button class="menu-opener" @click="toggleMenu">
				<i class="el-icon-s-tools"></i>
			</button>
			<button class="prev" @click="prevPage">
				<i class="el-icon-arrow-left"></i>
			</button>
		</div>
		<div class="next-wrapper">
			<button class="next" @click="nextPage">
				<i class="el-icon-arrow-right"></i>
			</button>
		</div>
	</div>
</template>

<script>
import epub from 'epubjs';
import TocBar from './TocBar';
export default {
	components: { TocBar },
	data() {
		return {
			menuShow: false,
			selectedFontSize: 16,
			selectedThemeIndex: 0,
			readerTheme: {
				background: '#fff',
				color: '#000',
				fontSize: ''
			},
			themeList: [
				{
					name: 'default',
					style: {
						body: {
							color: '#000',
							background: '#fff'
						}
					}
				},
				{
					name: '米色',
					style: {
						body: {
							color: '#5B4636',
							background: '#f4ecd8'
						}
					}
				},
				{
					name: '护眼',
					style: {
						body: {
							color: '#333',
							background: '#ceeaba'
						}
					}
				}
			],
			bookAvailable: false, //epub 的 locations 对象是否加载完毕
			navigation: {},
			book: {},
			rendition: {},
			filename: localStorage.getItem('filename')
		};
	},
	methods: {
		changeTheme(i) {
			this.setTheme(i);
			this.readerTheme = this.themeList[i].style.body;
		},
		changeFontSize(val) {
			this.setFontSize(val);
			this.readerTheme.fontSize = val;
		},
		toggleMenu() {
			this.menuShow = !this.menuShow;
		},
		// 根据链接(目录)跳转到指定位置
		jumpTo(href) {
			this.rendition.display(href);
		},
		setFontSize(fontSize) {
			this.selectedFontSize = fontSize;
			if (this.themes) {
				this.themes.fontSize(fontSize + 'px');
			}
		},
		setTheme(index) {
			this.selectedThemeIndex = index;
			this.themes.select(this.themeList[index].name);
		},
		// 切换标题和菜单的显示状态
		toggleTitleAndMenu() {
			this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
			if (!this.ifTitleAndMenuShow) {
				this.$refs.menuBar.hideSetting();
			}
		},
		prevPage() {
			if (this.rendition) {
				this.rendition.prev();
			}
		},
		nextPage() {
			if (this.rendition) {
				this.rendition.next();
			}
		},
		// 电子书的解析和渲染
		async showEpub() {
			const URL = `${this.$remoteHost}/${this.filename}`;
			this.book = await epub(URL, {});
			this.rendition = this.book.renderTo('read', {
				width: '80%',
				height: window.innerHeight * 0.9
			});

			this.themes = this.rendition.themes;
			this.setFontSize(this.selectedFontSize);
			// 注册主题
			this.themeList.forEach(theme => {
				this.themes.register(theme.name, theme.style);
			});
			this.setTheme(this.selectedThemeIndex);

			// Book对象的钩子函数ready
			this.book.ready
				.then(() => {
					this.rendition.display();
					this.navigation = this.book.navigation;
					// 生成Locations对象
					return this.book.locations.generate();
				})
				.then(() => {
					// 保存locations对象
					this.locations = this.book.locations;
					// 标记电子书为解析完毕状态
					this.bookAvailable = true;
				});
		}
	},

	async mounted() {
		await this.showEpub();
		// 鼠标滚轮控制翻页 太难了我做不想做 为什么 因为底层的iframe把mouse事件吃掉了 尽管可以独立生成mouse事件
		// 但是每个iframe都是动态的需要不断重新获取iframe对象 很麻烦
	},
	created() {
		// 阅读器初始化 获取离开前的设定
		if (localStorage.getItem('theme')) {
			this.readerTheme = JSON.parse(localStorage.getItem('theme'));
			this.selectedFontSize = parseInt(this.readerTheme.fontSize);
		}
		if (localStorage.getItem('themeIndex'))
			this.selectedThemeIndex = parseInt(localStorage.getItem('themeIndex'));
	},
	// 刷新后router的params filename丢失导致无法申请，所以存储在localstorage
	beforeRouteEnter(to, from, next) {
		if (to.params.filename)
			localStorage.setItem('filename', to.params.filename);
		next();
	},
	beforeRouteLeave(to, from, next) {
		localStorage.setItem('theme', JSON.stringify(this.readerTheme));
		localStorage.setItem('themeIndex', this.selectedThemeIndex);
		next();
	}
};
</script>

<style scoped>
.setting {
	padding: 0 0 0 20px;
	display: flex;
}
.theme-settings {
	display: flex;
}
.theme-settings span {
	font-size: 1.8rem;
}
.theme-op {
	list-style-type: none;
}
.theme-op li {
	display: inline-block;
	padding: 0 4px;
	cursor: pointer;
}
.op {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: tomato;
	border: 2px solid #ccc;
}

.op-1 {
	background: #fff;
}
.op-2 {
	background: #f4ecd8;
}
.op-3 {
	background: #ceeaba;
}

.fontsize-settings span {
	font-size: 1.8rem;
	padding-left: 20px;
	padding-right: 10px;
}

.fontsize-ops {
	font-size: 1.6rem;
}

/********************************
==============分割===============
********************************/

#reader {
	position: relative;
	height: 100vh;
}
button {
	background: transparent;
	border: none;
	font-size: 4rem;
	color: rgba(204, 204, 204, 0.637);
	font-weight: bold;
	opacity: 0;
	transition: 0.2s all;
}
button:hover {
	color: #ccc;
	opacity: 1;
}
.next-wrapper {
	width: 12.5%;
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
}

.next {
	display: inline-block;
	height: 100%;
	width: 100%;
	cursor: pointer;
}

.prev-wrapper {
	width: 12.5%;
	height: 100%;
	position: absolute;
	left: 12%;
	top: 0;
	bottom: 0;
}

.prev {
	display: inline-block;
	height: 90%;
	width: 100%;
	cursor: pointer;
}

.prev i {
	position: relative;
	top: -60px;
}

.menu-opener {
	display: inline-block;
	width: 100%;
	height: 10%;
	font-size: 3rem;
	cursor: pointer;
}

.menu-opener i {
	position: relative;
	left: -80px;
	top: -20px;
}

.menu {
	font-size: 1.6rem;
	z-index: 55;
}
.menu-title {
	font-size: 2rem;
}
#read {
	margin-left: 12%;
	display: flex;
	justify-content: center;
	padding-top: 2.5%;
	width: 88%;
	height: 100%;
}
.epub-container {
	margin: 0 auto;
}
</style>
