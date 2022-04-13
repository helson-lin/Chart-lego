<template>
	<div class="chart-editor">
		<div class="editor-header">
			<Button @click="print">输出</Button>
		</div>
		<div class="editor">
			<div class="editor-l">
				<CodeEditor :uid="uid" ref="v1" />
				<div class="resize"></div>
			</div>
			<div class="editor-r">
				<div
					id="f1662dfbada6935775119edd6dfb2a59"
					style="width: 400px; height: 400px"
				></div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import CodeEditor from "@/components/editor/CodeEditor.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { getChart } from "@/interface/chart";
export default {
	components: { CodeEditor },
	setup() {
		const uid = ref("f1662dfbada6935775119edd6dfb2a59");
		const store = useStore();
		const v1 = ref<HTMLElement | null>(null);
		const print = () => {
			console.log(v1.value);
		};
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
		const getChartCode = async (uid: string) => {
			const res = await getChart(uid);
			if (res.data.code === 0) {
				// eslint-disable-next-line @typescript-eslint/camelcase
				const { uid, name, style_option, api_option, handler } = res.data.data;
				const data = {
					id: uid,
					name,
					styleOption: JSON.parse(style_option),
					apiOption: JSON.parse(api_option),
					renderFuc: execData(handler),
				};
				console.log(store.commit);
				store.commit("chart/setChart", data);
			}
		};
		onMounted(() => {
			getChartCode("f1662dfbada6935775119edd6dfb2a59");
		});
		return {
			print,
			v1,
			uid,
		};
	},
};
</script>
<style lang="scss" scoped>
.chart-editor {
	width: 100%;
	height: 100vh;
	.editor {
		width: 100%;
		height: 100%;
		display: flex;
		&-l {
			width: 600px;
			height: 100%;
			display: flex;
			.resize {
				width: 10px;
				height: 100%;
				content: "";
				display: block;
				background: #eee;
			}
		}
	}
}
</style>
