/* eslint-disable @typescript-eslint/camelcase */
<template>
	<div class="codemirror-box">
		<div id="codemirror"></div>
	</div>
</template>
<script lang="ts" setup>
import CodeMirror, { Editor, EditorChange } from "codemirror";
import Chart, { ChartOptionsProps } from "@/lib/chart";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/search";
import "codemirror/addon/search/jump-to-line";
import "codemirror/addon/search/matchesonscrollbar";
import "codemirror/addon/search/match-highlighter";
import "codemirror/addon/selection/active-line";
// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/sql-hint";

// 高亮行功能
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/selection-pointer";

// 调整scrollbar样式功能
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";

// 自动括号匹配功能
import "codemirror/addon/edit/matchbrackets";

// 全屏功能 由于项目复杂，自带的全屏功能一般不好使
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen";

// 显示自动刷新
import "codemirror/addon/display/autorefresh";

// 多语言支持？
import "codemirror/addon/mode/overlay";
import "codemirror/addon/mode/multiplex";

// 代码段折叠功能
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";

import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import { onMounted, defineProps, ref, watchEffect } from "vue";
import { getChart } from "@/interface/chart";
import store from "@/store";
interface Props {
	uid: string;
}
const props = defineProps<Props>();
const code = ref<string>("");
const chartOption = ref<ChartOptionsProps | null>(null);
const chart = ref<Chart | null>(null);
const renderFucCode = ref<Function | null>(null);
const editor = ref<Editor | null>(null);
function evil(fn: string) {
	const Fn = Function;
	return new Fn("return " + fn)();
}
const execData = (str: string): Function => {
	let renderFuc;
	try {
		renderFuc = evil(str);
	} catch (err) {
		console.log("错误");
	}
	return renderFuc;
};
const initChart = () => {
	if (!chart.value) {
		chart.value = new Chart(chartOption.value, true);
	} else {
		chart.value.setRenderFunc(chartOption.value?.renderFuc);
		chart.value.reRender();
	}
};
const onChange = (instance: Editor, changeObj: EditorChange) => {
	const codeString = editor.value?.getValue();
	console.log("change", typeof codeString);
	if (!codeString || !chartOption.value) return;
	chartOption.value.renderFuc = execData(codeString);
	initChart();
};
const onCursorActivity = () => {
	console.warn("onCursorActivity");
};
const initCodeEditor = (str: string | ""): void => {
	const codemirrorDiv = document.getElementById("codemirror");
	if (!codemirrorDiv) return;
	editor.value = CodeMirror(codemirrorDiv, {
		mode: "javascript", //实现groovy代码高亮
		value: CodeMirror.Doc(str),
		lineNumbers: true, //显示行号
		indentUnit: 4,
		theme: "dracula", //设置主题
		lineWrapping: true, //代码折叠
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		matchBrackets: true, //括号匹配
		indentWithTabs: true,
		dragDrop: true,
		extraKeys: { Ctrl: "autocomplete" },
		allowDropFileTypes: ["text/html", "text/javascript"],
		readOnly: false,
	});
	editor.value.on("change", onChange);
	editor.value.on("cursorActivity", onCursorActivity);
};
const getChartCode = async (uid: string) => {
	const res = await getChart(uid);
	if (res.data.code === 0) {
		// eslint-disable-next-line @typescript-eslint/camelcase
		const { uid, name, style_option, api_option, handler } = res.data.data;
		code.value = handler;
		chartOption.value = {
			id: uid,
			name,
			styleOption: JSON.parse(style_option),
			apiOption: JSON.parse(api_option),
			renderFuc: execData(handler),
		};
		initChart();
		initCodeEditor(code.value);
	}
};
watchEffect(() => {
	if (props.uid) {
		getChartCode(props.uid);
	}
});
onMounted(() => {
	//initCodeEditor("");
});
</script>
<style lang="scss" scoped>
.codemirror-box {
	width: 100%;
	height: 100%;
}
#codemirror {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	:deep() .CodeMirror {
		height: 100%;
	}
}
</style>
