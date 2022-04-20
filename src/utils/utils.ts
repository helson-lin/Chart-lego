import parse from "url-parse";
import { Component, createApp } from "vue";
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

/**
 * @description: 图表组件转换为string
 * @param {chartList} 图表
 */
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

/**
 * @description: 创建挂载组件
 * @param {id} 挂载组件的父级的id
 * @param {vue} 组件
 * @param {option}  组件Props
 */
export function createAndMountTemplate(
	id: string,
	vue: Component,
	option?: { [key: string]: string }
) {
	let component;
	if (!option) {
		component = createApp(vue);
	} else {
		component = createApp(vue, option);
	}
	const mountDom = document.getElementById(id);
	if (!mountDom) throw new Error("will mount id dom can't be find");
	component.mount(mountDom);
}
