import { Module } from "vuex";
import { GloablDataProps } from "./index";
export interface Tab {
	name: string;
	path: string;
	closeable: boolean;
}
export interface AdminStoreProps {
	tabList: Tab[];
}
const chart: Module<AdminStoreProps, GloablDataProps> = {
	namespaced: true,
	state: {
		tabList: [
			{
				name: "首页",
				path: "/admin",
				closeable: false,
			},
			{
				name: "菜单管理",
				path: "/admin/menu",
				closeable: false,
			},
		],
	},
	getters: {},
	mutations: {
		addTab(state, tab: Tab) {
			// 校验
			const isExist =
				state.tabList.findIndex((tabItem) => tab.path === tabItem.path) !== -1;
			if (isExist) {
				console.log("已经存在");
				return;
			}
			state.tabList.push(tab);
		},
		removeTab(state, index: number) {
			state.tabList.splice(index, 1);
		},
	},
};

export default chart;
