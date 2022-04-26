import Request from "./index";
import type { RequestConfig } from "./types";
import config from "@/config/index";

interface CustomRequestConfig<T> extends RequestConfig {
	data?: T;
}
interface CustomResponse<T> {
	code: number;
	msg: string;
	data: T | any;
}

const httpRequest = new Request({
	baseURL:
		process.env.NODE_ENV === "production"
			? config.baseUrl.pro
			: config.baseUrl.dev,
	timeout: 1000 * 60 * 5,
});
/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {CustomRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
export const HttpRequest = <D, T = any>(config: CustomRequestConfig<D>) => {
	const { method = "GET" } = config;
	if (method === "get" || method === "GET") {
		config.params = config.data;
	}
	return httpRequest.request<CustomResponse<T>>(config);
};
