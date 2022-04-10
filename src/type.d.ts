import { ECharts } from "echarts"
import { ComponentPublicInstance } from "vue"
declare global {
	interface Window {
		$vm: ComponentPublicInstance
		$echarts: echarts
	}
}
