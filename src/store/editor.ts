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
	editingComponentId: string | null;
}
export interface IdAndwhProps {
	id: string;
	width: number;
	height: number;
}
export interface IdAndtlProps {
	id: string;
	left: number;
	top: number;
}
const defaultStyle: EditorStyleProps = {
	width: 1920,
	height: 1080,
	background: "#ffffff",
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
	editingComponentId: null,
};
const editor: Module<EditorStoreProps, GloablDataProps> = {
	namespaced: true,
	state: testComponents,
	getters: {},
	mutations: {
		setComponent(state, list) {
			state.component = list;
		},
		setEditingComponent(state, id: string | null) {
			state.editingComponentId = id;
		},
		addComponent(state, compoent: ChartOptionsProps) {
			if (!state.component) return;
			state.component.push(compoent);
		},
		setCompoentWh(state, idAndh: IdAndwhProps) {
			if (!state.component) return;
			const { id, width, height } = idAndh;
			const items = state.component.filter((item) => item.id === id);
			if (items.length === 0) return;
			items[0].styleOption.width = width;
			items[0].styleOption.height = height;
		},
		setComponentTl(state, idAndTl: IdAndtlProps) {
			if (!state.component) return;
			const { id, top, left } = idAndTl;
			const items = state.component.filter((item) => item.id === id);
			if (items.length === 0) return;
			items[0].styleOption.top = top;
			items[0].styleOption.left = left;
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
