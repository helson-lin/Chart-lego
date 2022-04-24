import HttpRequest from "../lib/axios/index";

/**
 * @description: 请求字体列表
 */
export const getFontList = () => {
	return HttpRequest.request({
		url: "/font/list",
		method: "GET",
	});
};
