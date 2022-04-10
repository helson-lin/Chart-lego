export interface StyleOptionProps {
	width: number
	height: number
	themeColor?: string
	background?: string // rgba
	left?: number // default: 0
	top?: number // default: 0
}
export interface BaseApiOptionProps {
	isRefresh: boolean
}
export interface HightApiOptionProps extends BaseApiOptionProps {
	url: string
	timer: number
}
export type ApiOptionProps<T> = T extends boolean
	? HightApiOptionProps
	: BaseApiOptionProps
export interface ChartOptionsProps {
	id: string // 即是图表的id又是Dom的id
	name: string
	styleOption: StyleOptionProps
	apiOption: ApiOptionProps<true>
	renderFuc: Function // 渲染的一个函数
}
import { ECharts, EChartsOption } from "echarts"

class Chart {
	private id: string
	private name: string
	private $el: HTMLElement | null = null
	private vm: ECharts | null = null
	private styleOption: StyleOptionProps
	private apiOption: ApiOptionProps<true>
	private renderFuc: Function
	private _options: EChartsOption | null = null
	public isDeugger = false
	constructor(initOptions: ChartOptionsProps, isDeugger: boolean) {
		const { id, name, styleOption, apiOption, renderFuc } = initOptions
		this.id = id
		this.name = name
		this.styleOption = styleOption
		this.apiOption = apiOption
		this.isDeugger = isDeugger || false
		if (typeof renderFuc !== "function") this.throwError("渲染函数不是函数")
		this.renderFuc = renderFuc
		this.log(`初始化Chart: ${JSON.stringify(initOptions)}`)
		this.init()
	}
	async init() {
		console.log(this.id)
		if (!this.id) this.throwError("当前图表id不存在, 无法挂载")
		const el = window.document.getElementById(this.id)
		if (!el) this.throwError("当前图表id不存在, 无法挂载")
		this.log(`获取Dom: ${el}`)
		this.$el = el
		this._options = await this.renderFuc.bind(this)()
		console.log(this)
		this.render()
	}
	render() {
		if (this.$el) {
			this.vm = window.echarts.init(this.$el)
			console.log(this.vm.setOption, this._options)
			this._options && this.vm?.setOption(this._options, true)
		}
	}

	log(str: string) {
		if (this.isDeugger) {
			console.info(str)
		}
	}
	
	throwError(str: string) {
		throw new Error(str)
	}
}

export default Chart
