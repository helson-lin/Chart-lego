import { ChartOptionsProps } from "@/types/chart";

export interface ApiChartOption {
	uid: string;
	name: string;
	style_option: string;
	api_option: string;
	handler: string;
	img: string | null;
	status: 0 | 1;
	del_flag: 0 | 1;
}
/**
 * @description: 将函数字符串转函数
 * @param {string} fn 函数字符串
 * @return {*}
 */
function evil(fn: string): Function {
	const Fn = Function;
	return new Fn("return " + fn)();
}
/**
 * @description: 函数字符串转换为Functon
 * @param {string} str 函数字符串
 * @return {function}
 */
function execData(str: string): Function {
	let renderFuc;
	try {
		renderFuc = evil(str);
	} catch (err) {
		throw new Error("handler can't be tranlate to Function !");
	}
	return renderFuc;
}
/**
 * @description: 格式化图表为对象数据
 * @param {ApiChartOption} data
 * @return {ChartOptionsProps}
 */
const formatterChartOption = (data: ApiChartOption): ChartOptionsProps => {
	// eslint-disable-next-line @typescript-eslint/camelcase
	const { uid, name, style_option, api_option, handler, img } = data;
	return {
		uid,
		name,
		styleOption: JSON.parse(style_option),
		apiOption: JSON.parse(api_option),
		renderFuc: execData(handler),
		img: img,
	};
};

export default {
	formatterChartOption,
	execData,
};
