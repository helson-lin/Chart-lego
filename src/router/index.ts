import {
	createRouter,
	createWebHistory,
	RouteMeta,
	_RouteLocationBase,
} from "vue-router";
interface RouteMetaCustom extends RouteMeta {
	title: string;
}
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import Canvas from "../views/Canvas.vue";
import CodeEditor from "../views/ChartEditor.vue";
import Template from "../views/Template.vue";
import { generateRedirectUrl } from "../utils/utils";
import Cookies from "js-cookie";
const routes = [
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			title: "Fano View-Login",
			requiresAuth: false,
		},
	},
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
		path: "/template/:uid",
		name: "template",
		component: Template,
		meta: {
			title: "视图模板",
			requiresAuth: true,
		},
	},
	{
		path: "/editor/:uid/",
		name: "Editor",
		component: Editor,
		meta: {
			title: "编辑器",
			requiresAuth: true,
		},
	},
	{
		path: "/canvas/:uid",
		name: "Canvas",
		component: Canvas,
		meta: {
			title: "Fano View-Canvas预览",
			requiresAuth: true,
		},
	},
	{
		path: "/chartCode/:uid",
		name: "ChartCode",
		component: CodeEditor,
		meta: {
			title: "图表编辑",
			requiresAuth: true,
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
	const fvToken = Cookies.get("fv_token"); // 服务端：httpOnly: false
	if ((to.meta as RouteMetaCustom).requiresAuth) {
		if (!fvToken) {
			const redirectUrl = generateRedirectUrl();
			next({
				path: "/login",
				query: {
					redirectUrl,
				},
			});
		} else {
			next();
		}
	} else {
		next();
	}
});
export default router;
