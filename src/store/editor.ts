import { Module } from "vuex";
import { ChartOptionsProps } from "@/types/chart";
import { DecoratorOptionProps, Decorator } from "@/types/decorator";
import { GloablDataProps } from "./index";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
import {
	EditorStyleProps,
	FvComponentList,
	FvComponentBase,
} from "@/types/editor";
import { number } from "echarts";

export type CutomChartOption = {};
export interface DecoratorOptionsWidthType extends DecoratorOptionProps {
	type: "decorator";
}
export interface ChartOptionsPropsWidthType extends ChartOptionsProps {
	type: "chart";
}
export type ComponetTypeOptions =
	| DecoratorOptionsWidthType
	| ChartOptionsPropsWidthType;
export interface EditorStoreProps {
	uid: string;
	name: string;
	style: EditorStyleProps;
	components?: FvComponentList; // for the monent
	editingComponentId: string | null;
	editingComponentType: string | null;
}
export interface EditorCavansProps {
	uid: string;
	name: string;
	style: EditorStyleProps;
	component: FvComponentList;
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
	style: defaultStyle,
	components: [],
	editingComponentId: null,
	editingComponentType: null,
};
const editor: Module<EditorStoreProps, GloablDataProps> = {
	namespaced: true,
	state: testComponents,
	getters: {
		getUid(state) {
			return state.uid;
		},
		getEditor(state: EditorStoreProps): EditorCavansProps {
			const { uid, name, style, components } = state;
			return { uid, name, style, component: components || [] };
		},
	},
	mutations: {
		setEditorUid(state, uid) {
			state.uid = uid;
		},
		addComponent(state, component: FvComponentBase) {
			if (!state.components) return;
			state.components.push(component);
		},
		/**
		 * @description: 设置正在编辑的组件
		 */
		setEditingComponent(state, playload) {
			const { id, type } = playload;
			state.editingComponentId = id;
			state.editingComponentType = type;
		},
		/**
		 * @description:  删除正在编辑的组件
		 * @param {*} state
		 * @return {*}
		 */
		removeEditingComponent(state) {
			if (!state.components || !state.editingComponentId) return;
			state.components = state.components.filter(
				(component) => component.uid !== state.editingComponentId
			);
			state.editingComponentType = null;
			state.editingComponentId = null;
		},
		/**
		 * @description: 复制正在使用的组件
		 */
		copyComponent(state) {
			if (!state.components) return;
			const editComponent = state.components.filter(
				(component) => component.uid === state.editingComponentId
			);
			if (editComponent && editComponent.length === 1) {
				const copyComponent = lodash.cloneDeep(editComponent[0]);
				const uid = uuidv4();
				copyComponent.uid = uid;
				state.components.push(copyComponent);
				state.editingComponentId = uid;
				state.editingComponentType = editComponent[0].type;
				// 设置编辑状态的组件
			}
		},
		/**
		 * @description: 设置组件的宽高
		 * @return {*}
		 */
		setCompoentWh(state, idAndh: IdAndwhProps) {
			if (!state.components) return;
			const { uid, width, height } = idAndh;
			const items = state.components.filter((item) => item.uid === uid);
			if (items.length === 0) return;
			items[0].styleOption.width = width;
			items[0].styleOption.height = height;
		},
		/**
		 * @description: 设置组件的定位
		 * @return {*}
		 */
		setComponentTl(state, idAndTl: IdAndtlProps) {
			if (!state.components) return;
			const { uid, top, left } = idAndTl;
			const items = state.components.filter((item) => item.uid === uid);
			if (items.length === 0) return;
			items[0].styleOption.top = top;
			items[0].styleOption.left = left;
		},
		/**
		 * @description: 设置组件的层级
		 * @return {*}
		 */
		setCompoentZindex(state, dir: "up" | "down") {
			if (!state.components) return;
			const items = state.components.filter(
				(item) => item.uid === state.editingComponentId
			);
			if (items.length === 0) return;
			if (typeof items[0].styleOption.zIndex !== "number")
				items[0].styleOption.zIndex = 1;
			if (dir === "up") {
				items[0].styleOption.zIndex += 1;
			} else {
				items[0].styleOption.zIndex -= 1;
			}
		},
		/**
		 * @description: 设置编辑器的样式
		 */
		setStyle(state, options: EditorStyleProps) {
			state.style = options;
		},
		/**
		 * @description: 设置编辑器的缩放
		 */
		setEditorStyleSize(state, size: number) {
			state.style.resize = size;
		},
		setComponentValue(state, value: any) {
			if (!state.components) return;
			const items = state.components.filter(
				(item) => item.uid === state.editingComponentId
			);
			if (items.length > 0) items[0].value = value;
		},
		/**
		 * @description: 设置编辑器的自定义背景
		 */
		setEditorBackground(state, customImgBack: boolean) {
			state.style.customImgBack = customImgBack;
		},
	},
};

export default editor;
