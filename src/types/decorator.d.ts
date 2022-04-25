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
// export interface Border {}
export interface DecoratorStyleOptions {
	width: number;
	height: number;
	top: number;
	left: number;
	color?: string;
	zIndex?: 1 | 2 | 3;
	font?: Font;
}
export interface Decorator {
	styleOption?: DecoratorStyleOptions;
}
export interface DecoratorOptionProps {
	uid: string; // 即是图表的id又是Dom的id
	name?: string;
	imgUrl?: string;
	type: string;
	value?: string | number | boolean; // 图表的值
	styleOption?: DecoratorStyleOptions;
}
