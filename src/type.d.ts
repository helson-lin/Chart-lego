import { ComponentPublicInstance } from "vue";
declare global {
	interface Window {
		$vm: ComponentPublicInstance;
		$echarts: echarts;
	}
}
// declare module "codemirror"
