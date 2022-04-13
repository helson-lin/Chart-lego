import Chart from "@/lib/chart";
import { ECharts, EChartsOption } from "echarts";
/* 图表组件实例 */
export interface ChartComponentProps {
	id: string;
	chart: Chart;
}
/* 编辑器基本样式 */
export interface EditorStyleProps {
	width: number;
	height: number;
	background?: string;
	imgUrl?: string;
	customImgBack: boolean;
}
/* 图表基础信息定位宽高等样式 */
export interface StyleOptionProps {
	width: number;
	height: number;
	themeColor?: string;
	background?: string; // rgba
	left?: number; // default: 0
	top?: number; // default: 0
}
/* 是否开启定时渲染API */
export interface BaseApiOptionProps {
	isRefresh: boolean;
}
/* 图表配置项API接口调用配置基础信息 */
export interface HightApiOptionProps extends BaseApiOptionProps {
	url: string;
	timer: number;
}
/* 图表配置项API接口调用配置 */
export type ApiOptionProps<T> = T extends boolean
	? HightApiOptionProps
	: BaseApiOptionProps;

/* 图表配置项：实时渲染需要 */
export interface ChartOptionsProps {
	id: string; // 即是图表的id又是Dom的id
	name: string;
	styleOption: StyleOptionProps;
	apiOption: ApiOptionProps<true>;
	renderFuc: Function; // 渲染的一个函数
}
