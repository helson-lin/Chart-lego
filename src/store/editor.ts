import { Module } from "vuex";
import { ChartOptionsProps } from "@/types/chart";
import { GloablDataProps } from "./index";
import { v4 as uuidv4 } from "uuid";
import { EditorStyleProps } from "@/types/editor";

export type CutomChartOption = {};
export interface EditorStoreProps {
	props: { [key: string]: string };
	uid: string;
	name: string;
	style: EditorStyleProps;
	component: ChartOptionsProps[] | null;
	editingComponentId: string | null;
}
export interface EditorCavansProps {
	uid: string;
	name: string;
	style: EditorStyleProps;
	component: ChartOptionsProps[] | null;
}
export interface IdAndwhProps {
	uid: string;
	width: number;
	height: number;
}
export interface IdAndtlProps {
	uid: string;
	left: number;
	top: number;
	distLt?: number[];
}
const defaultStyle: EditorStyleProps = {
	width: 1920,
	height: 1080,
	background: "#ffffff",
	imgUrl: "",
	customImgBack: false,
	resize: 50,
};
export const testComponents: EditorStoreProps = {
	uid: uuidv4(),
	name: "",
	props: {},
	style: defaultStyle,
	component: null,
	editingComponentId: null,
};
const editor: Module<EditorStoreProps, GloablDataProps> = {
	namespaced: true,
	state: testComponents,
	getters: {
		getUid(state) {
			return state.uid;
		},
		getEditor(state: EditorStoreProps): EditorCavansProps {
			const { uid, name, style, component } = state;
			// let componentWidthHandedLT = Object.assign(
			// 	[],
			// 	component
			// ) as ChartOptionsProps[];
			// if (componentWidthHandedLT) {
			// 	// as ChartOptionsProps[]
			// 	componentWidthHandedLT = componentWidthHandedLT.map((item) => {
			// 		const newObj = Object.assign({}, item);
			// 		if (item.styleOption.distLt) {
			// 			newObj.styleOption.top += item.styleOption.distLt[1];
			// 			newObj.styleOption.left += item.styleOption.distLt[0];
			// 			delete newObj.styleOption.distLt;
			// 		}
			// 		return newObj;
			// 	});
			// }
			return { uid, name, style, component };
		},
	},
	mutations: {
		setEditorUid(state, uid) {
			state.uid = uid;
		},
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
			const { uid, width, height } = idAndh;
			const items = state.component.filter((item) => item.uid === uid);
			if (items.length === 0) return;
			items[0].styleOption.width = width;
			items[0].styleOption.height = height;
		},
		setComponentTl(state, idAndTl: IdAndtlProps) {
			if (!state.component) return;
			const { uid, top, left, distLt } = idAndTl;
			const items = state.component.filter((item) => item.uid === uid);
			if (items.length === 0) return;
			items[0].styleOption.top = top;
			items[0].styleOption.left = left;
			items[0].styleOption.distLt = distLt;
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
