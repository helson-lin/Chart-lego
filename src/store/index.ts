import { createStore } from "vuex";
import user, { UserStoreProps } from "./user";
import editor, { EditorStoreProps } from "./editor";
import chart, { ChartStoreProps } from "./chart";
export interface GloablDataProps {
	user: UserStoreProps;
	editor: EditorStoreProps;
	chart: ChartStoreProps;
}
const store = createStore({
	modules: {
		user,
		editor,
		chart,
	},
});

export default store;
