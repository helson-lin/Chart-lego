import { HttpRequest } from "../lib/axios/request";
/**
 * @description: 请求图表详情
 * @param: uid 图表id
 * @return: Promise
 */
export const getChart = (uid: string) => {
	return HttpRequest({
		url: `chart/queryOne?uid=${uid}`,
		method: "GET",
	});
};
/**
 * @description: 请求所有图表
 * @param: page 页码
 * @param: pageSize 页数
 * @return: Promise
 */
export const getAllChart = () => {
	return HttpRequest<null, { rows: any[] }>({
		url: `chart/list`,
		method: "GET",
	});
};
/**
 * @description: 新增图表
 * @param: data 图表
 * @return: Promise
 */
export const addChart = (data: any) => {
	return HttpRequest({
		url: "chart/add",
		method: "POST",
		data,
	});
};
