import { ECharts, EChartsOption } from "echarts";
import {
	ChartOptionsProps,
	ApiOptionProps,
	StyleOptionProps,
} from "@/types/chart";
class Chart {
	private id: string;
	private name: string;
	private prefix: string;
	private $el: HTMLElement | null = null;
	private vm: ECharts | null = null;
	private styleOption: StyleOptionProps;
	private apiOption: ApiOptionProps<true>;
	private renderFuc: Function;
	private _options: EChartsOption | null = null;
	public isDeugger = false;
	constructor(initOptions: ChartOptionsProps, isDeugger: boolean, prefix = "") {
		const { id, name, styleOption, apiOption, renderFuc } = initOptions;
		this.id = id;
		this.prefix = prefix;
		this.name = name;
		this.styleOption = styleOption;
		this.apiOption = apiOption;
		this.isDeugger = isDeugger || false;
		if (typeof renderFuc !== "function") this.throwError("渲染函数不是函数");
		this.renderFuc = renderFuc;
		this.log(`初始化Chart: ${JSON.stringify(initOptions)}`);
		this.init();
	}
	async init() {
		console.log(this.id);
		if (!this.id) this.throwError("当前图表id不存在, 无法挂载");
		const el = window.document.getElementById(this.prefix + this.id);
		if (!el) this.throwError("当前图表id不存在, 无法挂载");
		this.log(`获取Dom: ${el}`);
		this.$el = el;
		this._options = await this.renderFuc.bind(this)();
		console.log(this);
		this.render();
	}
	render() {
		if (this.$el) {
			this.vm = window.echarts.init(this.$el);
			console.log(this.vm.setOption, this._options);
			this._options && this.vm?.setOption(this._options, true);
		}
	}
	resize() {
		if (!this.vm) return;
		this.vm.resize();
	}
	log(str: string) {
		if (this.isDeugger) {
			console.info(str);
		}
	}
	throwError(str: string) {
		throw new Error(str);
	}
	getName() {
		console.log(this.name);
	}
}

export default Chart;
