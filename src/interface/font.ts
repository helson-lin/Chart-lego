import { HttpRequest } from "../lib/axios/request";

/**
 * @description: 请求字体列表
 */
export const getFontList = () => {
	return HttpRequest({
		url: "/font/list",
		method: "GET",
	});
};
