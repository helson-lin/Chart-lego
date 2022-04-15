import { Module } from "vuex";
import { ChartOptionsProps } from "@/types/chart";
import { GloablDataProps } from "./index";
import { v4 as uuidv4 } from "uuid";
import { EditorStyleProps } from "@/types/editor";
export interface EditorStoreProps {
	props: { [key: string]: string };
	id: string;
	name: string;
	style: EditorStyleProps;
	component: ChartOptionsProps[] | null;
}
const defaultStyle: EditorStyleProps = {
	width: 1920,
	height: 1080,
	background: "#f2f2f2",
	imgUrl: "https:/pic.kblue.site/index_bg.png",
	customImgBack: false,
	resize: 60,
};
export const testComponents: EditorStoreProps = {
	id: uuidv4(),
	name: "EDitor",
	props: { name: "demo" },
	style: defaultStyle,
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
		setStyle(state, options: EditorStyleProps) {
			state.style = options;
		},
		setEditorStyleSize(state, size: number) {
			state.style.resize = size;
		},
		setEditorBackground(state, customImgBack: boolean) {
			state.style.customImgBack = customImgBack;
		},
	},
};

export default editor;
