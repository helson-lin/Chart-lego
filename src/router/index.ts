import {
	createRouter,
	createWebHistory,
	RouteMeta,
	_RouteLocationBase,
} from "vue-router";
interface RouteMetaCustom extends RouteMeta {
	title: string;
}
import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import CodeEditor from "../views/ChartEditor.vue";
import Template from "../views/Template.vue";
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: "Fano View",
			requiresAuth: false,
		},
	},
	{
		path: "/template/:id",
		name: "template",
		component: Template,
		meta: {
			title: "视图模板",
			requiresAuth: false,
		},
	},
	{
		path: "/editor/:id/",
		name: "Editor",
		component: Editor,
		meta: {
			title: "编辑器",
			requiresAuth: false,
		},
	},
	{
		path: "/chartCode",
		name: "ChartCode",
		component: CodeEditor,
		meta: {
			title: "图表编辑",
			requiresAuth: false,
		},
	},
];
const router = createRouter({
	routes,
	history: createWebHistory(),
});
router.beforeEach((to: _RouteLocationBase, from, next) => {
	// rewrite Document Title
	window.document.title = (to.meta as RouteMetaCustom).title || "Fano View";
	console.log(to);
	next();
});
export default router;
