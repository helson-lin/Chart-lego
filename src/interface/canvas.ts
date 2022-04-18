import HttpRequest from "../lib/axios/index";
/**
 * @description: 新增画布
 * @param: data 画布
 * @return: Promise
 */
export const addCanvas = (data: any) => {
	return HttpRequest.request({
		url: "/canvas/add",
		method: "POST",
		data,
	});
};

export const getCanvasById = (uid: string) => {
	return HttpRequest.request({
		url: `/canvas/queryOne?uid=${uid}`,
		method: "GET",
	});
};
