module.exports = {
	publicPath: "/",
	productionSourceMap: false,
	outputDir: "dist",
	assetsDir: "static",
	devServer: {
		host: "0.0.0.0",
		proxy: {
			"/api": {
				target: "http://127.0.0.1:7001",
				changeOrigin: true,
				pathRewrite: {
					"^/api": "/",
				},
				logLevel: "debug",
			},
		},
	},
	chainWebpack: (config) => {
		config.module
			.rule("images")
			.use("url-loader")
			.loader("url-loader")
			.tap((options) => Object.assign(options, { limit: 4000 }));
	},
	css: {
		loaderOptions: {
			sass: {
				data: `
					@import "./src/style/index.scss";
					@import "./src/style/theme/index.scss";
					@import "./src/style/tools/_sassMagic.scss";
				`,
			},
			less: {
				lessOptions: {
					modifyVars: {
						"primary-color": "#1DA57A",
						"link-color": "#1DA57A",
						"border-radius-base": "2px",
					},
					javascriptEnabled: true,
				},
			},
		},
	},
};
