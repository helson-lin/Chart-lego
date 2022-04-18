import parse from "url-parse";
import { ChartOptionsProps } from "@/types/chart";
/**
 * @description: 获取本地cookie
 * @param {string} sName cookie的名称
 * @return {string} cookie的值
 */
export function getCookie(sName: string): string | null {
	const aCookie = document.cookie.split("; ");

	for (let i = 0; i < aCookie.length; i += 1) {
		const aCrumb = aCookie[i].split("=");
		if (sName === aCrumb[0]) return unescape(aCrumb[1]);
	}
	return null;
}
/**
 * @description: 获取重定向URL参数
 * @return {string} URL: BASE64
 */
export function generateRedirectUrl() {
	const { href, origin } = window.location;
	const url = href.replaceAll(origin, "");
	return btoa(url);
}
/**
 * @description: 解析重定向URL参数
 * @return {query: any;pathname: }
 */
export function analysisRedirectUrl(url: string): {
	query: any;
	pathname: string;
} {
	const originUrl = atob(url);
	const parsed = parse(originUrl);
	return {
		query: parsed.query,
		pathname: parsed.pathname,
	};
}
function objectToString(obj: { [key: string]: any }): string {
	const keys = Object.keys(obj);
	let str = "{";
	keys.forEach((key) => {
		if (typeof obj[key] !== "object") {
			str += `${key}:${obj[key]},`;
		} else {
			const objectType = Object.prototype.toString.call(obj[key]);
			if (objectType === "[object Object]") {
				str += `${key}:${objectToString(obj[key])},`;
			} else if (objectType === "[object Function]") {
				str += `${key}:${obj[key] + ""},`;
			}
		}
	});
	return str + "}";
}

export function stringifyChartComponent(
	chartList: ChartOptionsProps[] | null
): string {
	if (!chartList) return "";
	const chartListWithStr = chartList.map((chart) => {
		const { uid, name, img, styleOption, apiOption, renderFuc } = chart;
		const chartWidthRenderStr = {
			uid,
			name,
			img,
			styleOption: JSON.stringify(styleOption),
			apiOption: JSON.stringify(apiOption),
			renderFuc: renderFuc + "",
		};
		return chartWidthRenderStr;
	});
	return JSON.stringify(chartListWithStr);
}
