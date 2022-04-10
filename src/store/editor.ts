import { Module } from "vuex"
import { GloablDataProps } from "./index"
import { v4 as uuidv4 } from "uuid"
export interface SingleChartProps {
	id: string
	url: string
	style: string
}
export interface EditorStoreProps {
	props: { [key: string]: string }
	id: string
	name: string
	style: EditorStyleProps
	component: SingleChartProps[] | null
}
export interface EditorStyleProps {
	width: number
	height: number
	background?: string
	imgUrl?: string
	customImgBack: boolean
}
const componentDemo: SingleChartProps[] = [
	{ id: uuidv4(), url: "https://sogou.com", style: "top: 0;left: 0;" },
	{
		id: uuidv4(),
		url: "http://player.helson-lin.cn/chart/%E4%BB%AA%E8%A1%A8%E7%9B%98/index.html",
		style: "top: 420px;left: 20px;",
	},
	{
		id: uuidv4(),
		url: "http://player.helson-lin.cn/chart/%E7%8E%AF%E5%BD%A2%E5%9B%BE/index.html",
		style: "top: 420px;left: 400px;",
	},
]
export const testComponents: EditorStoreProps = {
	id: uuidv4(),
	name: "EDitor",
	props: { name: "demo" },
	style: {
		width: 1920,
		height: 1080,
		background: "#020b3b",
		imgUrl: "",
		customImgBack: false,
	},
	component: componentDemo,
}
const editor: Module<EditorStoreProps, GloablDataProps> = {
	state: testComponents,
	getters: {},
	mutations: {},
}

export default editor
