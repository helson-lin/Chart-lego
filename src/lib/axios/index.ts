import axios, { Axios, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import config from "../../config/index";

interface KeyValueObjProps {
	[key: string]: string;
}
interface ConfigProps {
	baseUrl: string;
	headers: AxiosRequestHeaders;
}
export interface ApiDataProps<T> {
	code: number;
	data: T;
	msg: string;
}
export interface Reponse<T> {
	status: number;
	data: ApiDataProps<T>;
}
const baseUrl =
	process.env.NODE_ENV === "development"
		? config.baseUrl.dev
		: config.baseUrl.pro;
class HttpRequest {
	private baseUrl: string;
	private queue: { [key: string]: any };
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
		this.queue = {};
		console.log(this.baseUrl);
	}
	getInsideConfig(): ConfigProps {
		const config = {
			baseUrl: this.baseUrl,
			headers: {
				//
			},
		};
		return config;
	}
	destroy(url: string) {
		delete this.queue[url];
		if (!Object.keys(this.queue).length) {
			// Spin.hide() 当前没有请求的url
		}
	}
	interceptors(instance: Axios, url: string) {
		// 请求拦截
		instance.interceptors.request.use(
			(config) => {
				// 添加全局的loading...
				if (!Object.keys(this.queue).length) {
					// Spin.show() // 不建议开启，因为界面不友好
				}
				this.queue[url] = true;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
		// 响应拦截
		instance.interceptors.response.use(
			(res) => {
				this.destroy(url);
				const { data, status } = res;
				return { data, status };
			},
			(error) => {
				this.destroy(url);
				let errorInfo = error.response;
				if (!errorInfo) {
					const {
						request: { statusText, status },
						config,
					} = JSON.parse(JSON.stringify(error));
					errorInfo = {
						statusText,
						status,
						request: { responseURL: config.url },
					};
				}
				return Promise.reject(error);
			}
		);
	}
	request(options: AxiosRequestConfig) {
		if (!options.url) console.warn("Axios： url can't be blank");
		const instance = axios.create({ baseURL: this.baseUrl });
		options = Object.assign(this.getInsideConfig(), options);
		this.interceptors(instance, options.url || "");
		return instance(options);
	}
}
export default new HttpRequest(baseUrl);
