import { createStore } from "vuex"
import user, { UserStoreProps } from "./user"
import editor, { EditorStoreProps } from "./editor"
export interface GloablDataProps {
	user: UserStoreProps
	editor: EditorStoreProps
}
const store = createStore({
	modules: {
		user,
		editor,
	},
})

export default store
