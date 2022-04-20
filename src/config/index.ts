export default {
	/**
	 * @description 配置显示在浏览器标签的title
	 */
	title: "Fano-admin",
	/**
	 * @description 是否使用国际化，默认为false
	 *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
	 *              用来在菜单中显示文字
	 */
	useI18n: true,
	/**
	 * @description api请求基础路径
	 */
	baseUrl: {
		dev: "/api/",
		pro: "http://182.61.138.196:8088/api/",
	},
	/**
	 * @description 版本信息
	 */
	version: "1.0.0",
};
