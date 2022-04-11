module.exports = {
	publicPath: "./",
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
			.tap((options) => Object.assign(options, { limit: 100000 }))
	},
}
