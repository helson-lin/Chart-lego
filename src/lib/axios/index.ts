import axios, { AxiosResponse } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { RequestConfig, RequestInterceptors } from "./types";
interface CustomResponse<T> {
	code: number;
	msg: string;
	data: T | unknown;
}

class Request<T> {
	// axios 实例
	instance: AxiosInstance;
	// 拦截器对象
	interceptorsObj?: RequestInterceptors;

	constructor(config: RequestConfig) {
		this.instance = axios.create(config);
		if (config.interceptors) this.interceptorsObj = config.interceptors;

		this.instance.interceptors.request.use(
			(res: AxiosRequestConfig) => {
				return res;
			},
			(err: unknown) => err
		);
		// 使用实例拦截器
		this.instance.interceptors.request.use(
			this.interceptorsObj?.requestInterceptors,
			this.interceptorsObj?.requestInterceptorsCatch
		);
		this.instance.interceptors.response.use(
			this.interceptorsObj?.responseInterceptors,
			this.interceptorsObj?.responseInterceptorsCatch
		);

		// 全局响应拦截器保证最后执行
		this.instance.interceptors.response.use(
			// 因为我们接口的数据都在res.data下，所以我们直接返回res.data
			(res) => {
				if (res.status === 500) console.warn("服务器错误");
				return res.data;
			},
			(err: unknown) => err
		);
	}
	request<T>(config: RequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			// 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
			if (config.interceptors?.requestInterceptors) {
				config = config.interceptors.requestInterceptors(config);
			}
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
					if (config.interceptors?.responseInterceptors) {
						res = config.interceptors.responseInterceptors<T>(res);
					}

					resolve(res);
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	}
}

export default Request;
