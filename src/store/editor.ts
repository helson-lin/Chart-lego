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
		url: "https://www.xhling.com/post-398.html",
		style: "top: 420px;left: 20px;",
	},
]
export const testComponents: EditorStoreProps = {
	id: uuidv4(),
	name: "EDitor",
	props: { name: "demo" },
	style: {
		width: 1920,
		height: 1080,
		background: "#f2f2f2",
		imgUrl: "https:/pic.kblue.site/pexels-photo-1126384.jpeg",
		customImgBack: true,
	},
	component: componentDemo,
}
const editor: Module<EditorStoreProps, GloablDataProps> = {
	state: testComponents,
	getters: {},
	mutations: {},
}

export default editor
