import { Module } from "vuex";
import { ChartOptionsProps } from "@/lib/chart/index";
import { GloablDataProps } from "./index";
import { v4 as uuidv4 } from "uuid";
export interface SingleChartProps {
	id: string;
	url: string;
	style: string;
}
export interface EditorStoreProps {
	props: { [key: string]: string };
	id: string;
	name: string;
	style: EditorStyleProps;
	component: ChartOptionsProps[] | null;
}
export interface EditorStyleProps {
	width: number;
	height: number;
	background?: string;
	imgUrl?: string;
	customImgBack: boolean;
}
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
	component: null,
};
const editor: Module<EditorStoreProps, GloablDataProps> = {
	namespaced: true,
	state: testComponents,
	getters: {},
	mutations: {
		setComponent: (state, list) => {
			state.component = list;
		},
	},
};

export default editor;
