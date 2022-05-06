import { type } from "os";

export type FontFamiltOptions =
	| "Source Han Sans"
	| "PingFang"
	| "Monospace"
	| "Fira Code"
	| "Arial"
	| "system-ui"
	| "微软雅黑"
	| "仿宋";
export interface Font {
	fontSize?: number;
	fontFamily?: FontFamiltOptions;
	fontWeight?: number;
}
// 内置阴影效果：
// normal: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08)
// light: 0px 0px 12px rgba(0, 0, 0, .12)
// lighter: 0px 0px 6px rgba(0, 0, 0, .12)
// dark
export type BoxShadowType = "normal" | "light" | "dark" | "lighter";
export type Parse<T> = {
	[P in keyof T]: T[P];
};
// export interface Border {}
export interface DecoratorStyleOptions {
	width: number;
	height: number;
	top: number;
	left: number;
	color?: string;
	zIndex?: 1 | 2 | 3;
	font?: Font;
	boxShadow?: BoxShadowType | string;
}
export interface Decorator {
	styleOption?: DecoratorStyleOptions;
}
export interface VideoComponent {
	autoplay?: boolean;
	loop?: boolean;
}
export interface ExtendsOption {
	[key: string]: string;
}
export interface DecoratorOptionProps {
	uid: string; // 即是图表的id又是Dom的id
	name?: string;
	imgUrl?: string;
	type: string;
	value?: string | number | boolean; // 图表的值
	styleOption?: DecoratorStyleOptions;
	extends?: ExtendsOption;
}
