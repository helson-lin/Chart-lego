import { Module } from "vuex";
import { GloablDataProps } from "./index";
import { v4 as uuidv4 } from "uuid";
export interface LayerStoreProps {
	props: { [key: string]: string };
	components: ComponentData[];
	id: string;
}
export interface ComponentData {
	props: { [key: string]: string };
	id: string;
	name: string;
}
export const testComponents: ComponentData[] = [
	{
		id: uuidv4(),
		name: "l-text",
		props: { text: "demo" },
	},
];
const defaultProps = { width: "1920px", height: "1080px", background: "" };
const editor: Module<LayerStoreProps, GloablDataProps> = {
	namespaced: true,
	state: {
		id: uuidv4(),
		components: testComponents,
		props: defaultProps,
	},
	getters: {},
};

export default editor;
