import { Font } from "./decorator";

export type Parse<T> = {
	[P in keyof T]: T[P];
};
export type Mixin<T, X> = {
	[P in keyof (T & X)]: (T & X)[P];
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

export type StyleOption<T> = Mixin<T, BaseStyle>;

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
	value?: string;
	styleOption: StyleOption<T>;
}
type TextAlign = "left" | "center" | "right" | "justify";
export interface DecoratorFactory {
	value: string | number;
	font?: Font;
	color?: string;
	textAlign?: TextAlign;
}

export interface ChartComponentExtends {
	apiOption?: ApiOption;
	renderFuc?: Function;
}

export type FvComponent<T, K> = Mixin<BaseComponent<T>, K>;

export type FvComponentList = FvComponent<
	DecoratorFactory,
	ChartComponentExtends
>[];

export type FvComponentBase = FvComponent<
	DecoratorFactory,
	ChartComponentExtends
>;
