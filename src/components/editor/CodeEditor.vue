/* eslint-disable @typescript-eslint/camelcase */
<template>
	<div class="codemirror-box">
		<div id="codemirror"></div>
	</div>
</template>
<script lang="ts" setup>
import { h } from "vue";
import { notification } from "ant-design-vue";
import { BugOutlined } from "@ant-design/icons-vue";
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
import { ref, watchEffect, computed, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
interface Props {
	run: boolean;
}
const store = useStore();
const chartEditor = computed<ChartOptionsProps>(() => {
	return store.state.chart.chart;
});
const props = defineProps<Props>();
const emits = defineEmits<{
	(e: "runStatusChange", val: boolean): void;
}>();
const chart = ref<Chart | null>(null);
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
		notification.open({
			message: "代码错误警告",
			description:
				"Couldn't find a function to execute in the option OR this function is exist error",
			icon: () => h(BugOutlined, { style: "color: #108ee9" }),
			onClick: () => {
				console.log("Notification Clicked!");
			},
		});
		emits("runStatusChange", false);
		throw new Error(
			"Couldn't find a function to execute in the option OR this function is exist error"
		);
	}
	return renderFuc;
};
const renderChart = () => {
	if (!chart.value) {
		chart.value = new Chart(chartEditor.value, true);
	} else {
		console.log(chart.value, "冲洗你先让");
		chart.value.setRenderFunc(chartEditor.value?.renderFuc);
		chart.value.reRender();
	}
};
/**
 * @description: 光标激活
 * @param {*}
 * @return {*}
 */
const onCursorActivity = (instance: Editor): any => {
	console.warn("onCursorActivity", instance.getSelection());
};
/**
 * @description: 编辑器内容被修改
 * @param {*} instance 编辑器实例
 * @param {*} changeObj 代码改变
 * @return {*}
 */
const onChange = (instance: Editor, changeObj: EditorChange) => {
	const codeString = editor.value?.getValue();
	console.log("code changed");
	if (!codeString || !chartEditor.value) return;
	const codeFunction = execData(codeString);
	store.commit("chart/setRenderFunc", codeFunction);
};
const initCodeEditor = (str: string | ""): void => {
	const codemirrorDiv = document.getElementById("codemirror");
	if (!codemirrorDiv) return;
	editor.value = CodeMirror(codemirrorDiv, {
		mode: "javascript", //实现groovy代码高亮
		value: CodeMirror.Doc(str),
		lineNumbers: true, //显示行号
		indentUnit: 4,
		tabSize: 4,
		theme: "dracula", //设置主题
		lineWrapping: true, //代码折叠
		foldGutter: true,
		lineWiseCopyCut: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		matchBrackets: true, //括号匹配
		indentWithTabs: true,
		dragDrop: true,
		extraKeys: { Ctrl: "autocomplete" },
		allowDropFileTypes: ["text/html", "text/javascript"],
		hintOptions: { completeSingle: false },
		readOnly: false,
	});
	// editor.value.on("change", onChange);
	editor.value.on("cursorActivity", onCursorActivity);
	editor.value.setOption("extraKeys", {
		// 自定义按键
		Tab: function (cm: Editor) {
			if (!cm || cm.getOption("indentUnit") === undefined) return;
			const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
			cm.replaceSelection(spaces);
		},
	});
};
watchEffect(() => {
	if (props.run) {
		const codeString = editor.value?.getValue();
		console.log("code changed");
		if (!codeString || !chartEditor.value) return;
		const codeFunction = execData(codeString);
		store.commit("chart/setRenderFunc", codeFunction);
		setTimeout(() => {
			emits("runStatusChange", false);
		}, 200);
	}
});
watchEffect(() => {
	if (chartEditor.value) {
		renderChart();
		console.log(editor.value);
		if (!editor.value) {
			console.log("初始化编辑器数据");
			initCodeEditor(chartEditor.value.renderFuc.toString());
		}
	}
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
	font-family: Fira Code, Arial, Helvetica, sans-serif;
	/deep/ .CodeMirror-vscrollbar {
		@include scrollbar(10px, 15px);
	}
	:deep() .CodeMirror {
		height: 100%;
	}
}
</style>
