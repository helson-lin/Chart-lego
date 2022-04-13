import { ChartOptionsProps } from "@/types/chart";

export interface ApiChartOption {
	uid: string;
	name: string;
	style_option: string;
	api_option: string;
	handler: string;
}
function evil(fn: string): Function {
	const Fn = Function;
	return new Fn("return " + fn)();
}
function execData(str: string): Function {
	let renderFuc;
	try {
		renderFuc = evil(str);
	} catch (err) {
		throw new Error("handler无法被转换为Function");
	}
	return renderFuc;
}
const formatterChartOption = (data: ApiChartOption): ChartOptionsProps => {
	// eslint-disable-next-line @typescript-eslint/camelcase
	const { uid, name, style_option, api_option, handler } = data;
	return {
		id: uid,
		name,
		styleOption: JSON.parse(style_option),
		apiOption: JSON.parse(api_option),
		renderFuc: execData(handler),
	};
};

export default {
	formatterChartOption,
	execData,
};
