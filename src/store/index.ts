import { createStore } from "vuex";
import user, { UserStoreProps } from "./user";
import editor, { EditorStoreProps } from "./editor";
import chart, { ChartStoreProps } from "./chart";
import admin, { AdminStoreProps } from "./admin";
export interface GloablDataProps {
	user: UserStoreProps;
	editor: EditorStoreProps;
	chart: ChartStoreProps;
	admin: AdminStoreProps;
}
const store = createStore({
	modules: {
		user,
		editor,
		chart,
		admin,
	},
});

export default store;
