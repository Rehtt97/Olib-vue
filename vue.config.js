module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				assets: '@/assets',
				common: '@/common',
				components: '@/components',
				network: '@/network',
				views: '@/views',
				css: '@/assets/css',
				img: '@/assets/img',
				node_modules: './node_modules'
			}
		}
	}
};
