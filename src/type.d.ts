import { ComponentPublicInstance } from "vue";
declare global {
	interface Window {
		$vm: ComponentPublicInstance;
		$echarts: echarts;
	}
}
declare module "colorpicker-v3";
import "./types/editor";
