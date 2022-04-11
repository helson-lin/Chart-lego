import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import CodeEditor from "../views/ChartEditor.vue";
import Template from "../views/Template.vue";
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/template/:id",
		name: "template",
		component: Template,
	},
	{
		path: "/editor",
		name: "Editor",
		component: Editor,
	},
	{
		path: "/chartCode",
		name: "ChartCode",
		component: CodeEditor,
	},
];
const router = createRouter({
	routes,
	history: createWebHistory(),
});
export default router;
