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
	color?: string;
	font?: Font;
}
export interface Decorator {
	styleOption: DecoratorStyleOptions;
}

export interface DecoratorOptionProps extends Decorator {
	uid: string; // 即是图表的id又是Dom的id
	name: string;
}
