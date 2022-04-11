import HttpRequest from "../lib/axios/index";
export const getChart = (uid: string) => {
	return HttpRequest.request({
		url: `chart/queryOne?uid=${uid}`,
		method: "GET",
	});
};
export const getAllChart = () => {
	return HttpRequest.request({
		url: `chart/list`,
		method: "GET",
	});
};
export const addChart = (data: any) => {
	return HttpRequest.request({
		url: "chart/add",
		method: "POST",
		data,
	});
};
