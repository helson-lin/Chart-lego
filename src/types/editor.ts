import { Font } from "./decorator";

export type Parse<T> = {
	[P in keyof T]: T[P];
};
/* 编辑器基本样式 */
export interface EditorStyleProps {
	width: number;
	height: number;
	background?: string;
	imgUrl: string | null;
	customImgBack: boolean;
	resize: number;
}

export interface BaseStyle {
	width: number;
	height: number;
	left: number;
	top: number;
	zIndex: number;
	background?: string;
	themeColor?: string;
}
export interface BaseStyle {
	width: number;
	height: number;
	left: number;
	top: number;
	zIndex: number;
	background?: string;
	themeColor?: string;
}

export type StyleOption<T extends undefined | any> = T extends undefined
	? BaseStyle
	: Parse<T> & BaseStyle;

/* 图表配置项API接口调用配置基础信息 */
export interface ApiOption {
	url: string;
	timer: number;
	isRefresh: boolean;
}

export interface BaseComponent<T> {
	uid: string;
	name: string;
	type: string;
	img?: string;
	styleOption: StyleOption<T | undefined>;
}

export interface DecoratorFactory {
	value: any;
	font?: Font;
	color?: string;
}

export interface ChartComponentExtends {
	apiOption?: ApiOption;
	renderFuc?: Function;
}

export type FvComponent<T, K extends undefined | any> = K extends undefined
	? BaseComponent<T>
	: BaseComponent<T> & Parse<K>;

export type FvComponentList = FvComponent<
	DecoratorFactory,
	ChartComponentExtends
>[];

export type FvComponentBase = FvComponent<
	DecoratorFactory,
	ChartComponentExtends
>;
