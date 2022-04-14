<template>
	<div class="chart-editor">
		<div class="editor-header">
			<div class="btns">
				<a-tooltip placement="topLeft" :mouseEnterDelay="0.5">
					<template #title>
						<span>运行</span>
					</template>
					<a-button
						type="primary"
						data-alt="运行"
						@click="runCode"
						:loading="runing"
					>
						<template #icon>
							<play-circle-outlined />
						</template>
					</a-button>
				</a-tooltip>
				<a-tooltip placement="topLeft" :mouseEnterDelay="0.5">
					<template #title>
						<span>debug</span>
					</template>
					<a-button type="primary" data-alt="debug">
						<template #icon>
							<bug-outlined />
						</template>
					</a-button>
				</a-tooltip>
				<a-tooltip placement="topLeft" :mouseEnterDelay="0.5">
					<template #title>
						<span>下载</span>
					</template>
					<a-button type="primary" data-alt="下载">
						<template #icon>
							<cloud-download-outlined />
						</template>
					</a-button>
				</a-tooltip>
				<a-tooltip placement="topLeft" :mouseEnterDelay="0.5">
					<template #title>
						<span>格式化</span>
					</template>
					<a-button type="primary" data-alt="格式化">
						<template #icon>
							<field-string-outlined />
						</template>
					</a-button>
				</a-tooltip>
			</div>
			<!-- <cloud-download-outlined />  <bug-outlined /> <field-string-outlined />-->
		</div>
		<div class="editor">
			<div class="editor-l">
				<CodeEditor ref="v1" :run="runing" @runStatusChange="runStatusChange" />
				<div class="resize"></div>
			</div>
			<div class="editor-r">
				<div :id="uid" style="width: 400px; height: 400px"></div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import CodeEditor from "@/components/editor/CodeEditor.vue";
//<play-circle-outlined />
import {
	PlayCircleOutlined,
	BugOutlined,
	CloudDownloadOutlined,
	FieldStringOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { getChart } from "@/interface/chart";
export default {
	components: {
		CodeEditor,
		BugOutlined,
		CloudDownloadOutlined,
		FieldStringOutlined,
		PlayCircleOutlined,
	},
	setup() {
		const uid = ref("af1662dfbada6935775119edd6dfb2a5");
		const store = useStore();
		const runing = ref<boolean>(false);
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
		const runCode = () => {
			runing.value = !runing.value;
		};
		const runStatusChange = (val: boolean) => {
			runing.value = val;
		};
		onMounted(() => {
			getChartCode(uid.value);
		});
		return {
			runCode,
			runStatusChange,
			runing,
			uid,
		};
	},
};
</script>
<style lang="scss" scoped>
.chart-editor {
	width: 100%;
	height: 100vh;
	.editor-header {
		width: 100%;
		height: 50px;
		padding: 0 20px;
		box-sizing: border-box;
		box-shadow: $shadow-shallow;
		background: hsla(255, 255, 255, 0.1) border-box;
		backdrop-filter: blur(20px);
		&:before {
			content: "";
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: -1;
			filter: blur(20px);
		}

		.btns {
			height: 50px;
			float: right;
			display: flex;
			align-items: center;

			.ant-btn {
				position: relative;
				margin-left: 10px;
				cursor: pointer !important;
			}
		}
	}
	.editor {
		width: 100%;
		height: calc(100% - 50px);
		display: flex;
		&-l {
			width: 800px;
			height: 100%;
			display: flex;
			background: #282a36;
			.resize {
				width: 2px;
				height: 100%;
				content: "";
				display: block;
				background: rgba(238, 238, 238, 0.522);
			}
		}
		&-r {
			flex: 1;
			padding: 20px;
			box-sizing: border-box;
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(20px);
			background: #f2f2f2;
			div {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
