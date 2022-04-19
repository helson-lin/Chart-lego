import { Module } from "vuex";
import { GloablDataProps } from "./index";
import Chart from "@/lib/chart/index";
import { ChartOptionsProps } from "@/types/chart";
export interface ChartStoreProps {
	chart: ChartOptionsProps | null;
}
const chart: Module<ChartStoreProps, GloablDataProps> = {
	namespaced: true,
	state: {
		chart: null,
	},
	getters: {},
	mutations: {
		setChart(state, chart: ChartOptionsProps) {
			state.chart = chart;
		},
		setRenderFunc(state, renderFunc: Function) {
			if (!state.chart) return;
			state.chart.renderFuc = renderFunc;
		},
	},
};

export default chart;
