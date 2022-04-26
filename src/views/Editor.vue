<template>
	<div class="editor">
		<Header :showAvatar="false">
			<template #>
				<div class="header-editor">
					<Input
						style="margin-left: 20px"
						v-model:data="canvasName"
						placeholder="视图名称"
					/>
					<div class="btn">
						<a-button type="text" :size="size">
							离线下载
							<template #icon>
								<download-outlined />
							</template>
						</a-button>
						<a-button
							type="primary"
							shape="round"
							:size="size"
							@click="saveEditCanvas"
						>
							保存
							<template #icon>
								<cloud-download-outlined />
							</template>
						</a-button>
					</div>
				</div>
			</template>
		</Header>
		<div class="editor-cc">
			<div :class="['editor-cc-l', isOpenMenuBar ? 'open' : 'close']">
				<slider-bar v-model:index="compoentTypeIndex" />
				<ChartList :list="ChartList" v-show="compoentTypeIndex === 0" />
				<DecoratorList v-show="compoentTypeIndex === 1" />
				<MaterialList v-show="compoentTypeIndex === 2" />
				<div class="tool-bar-ico" @click="closeOrOpenMenu">
					<left-circle-filled v-if="isOpenMenuBar" />
					<right-circle-filled v-else />
				</div>
			</div>
			<div
				:class="['editor-cc-c']"
				:style="{ '--left': !isOpenMenuBar && !isOpenMenuBar ? '480px' : '' }"
			>
				<Editor />
				<div class="resize-box">
					<Resize />
				</div>
			</div>
			<div :class="['editor-cc-r', isOpenToolBar ? 'open' : 'close']">
				<div class="tool-bar-ico" @click="closeOrOpenTool">
					<left-circle-filled v-if="!isOpenToolBar" />
					<right-circle-filled v-else />
				</div>
				<BaseSetting />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import {
	LeftCircleFilled,
	RightCircleFilled,
	CloudDownloadOutlined,
	DownloadOutlined,
} from "@ant-design/icons-vue";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
import Header from "../components/common/Header.vue";
import Editor from "../components/editor/Editor.vue";
import Input from "../components/common/Input.vue";
import BaseSetting from "../components/editor/BaseSetting.vue";
import SliderBar from "../components/editor/SliderBar.vue";
import ChartList from "../components/editor/ChartList.vue";
import DecoratorList from "../components/editor/DecoratorList.vue";
import MaterialList from "../components/editor/MaterialList.vue";
import { EditorCavansProps } from "../store/editor";
import { addCanvas } from "../interface/canvas";
import { stringifyChartComponent } from "../utils/utils";
import Resize from "../components/editor/Resize.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { ChartOptionsProps } from "@/types/chart";
import { FvComponentBase } from "@/types/editor";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default {
	components: {
		Header,
		BaseSetting,
		Editor,
		LeftCircleFilled,
		RightCircleFilled,
		ChartList,
		DecoratorList,
		CloudDownloadOutlined,
		DownloadOutlined,
		Resize,
		Input,
		SliderBar,
		MaterialList,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const defaultList = ref([]);
		const isOpenToolBar = ref(true);
		const isOpenMenuBar = ref(true);
		const compoentTypeIndex = ref(0);
		const closeOrOpenTool = () => {
			isOpenToolBar.value = !isOpenToolBar.value;
		};
		const closeOrOpenMenu = () => {
			isOpenMenuBar.value = !isOpenMenuBar.value;
		};
		const canvasName = ref("自定义视图");
		const saveEditCanvas = async () => {
			const editCanvas: EditorCavansProps = store.getters["editor/getEditor"];
			const { uid, name, component, style } = editCanvas;
			console.log("componet", component);
			if (!component) return;
			const componentCopy = lodash.cloneDeep(component);
			// const componentWidthHandedLT = component.map((item) => {
			// 	const { styleOption, apiOption } = item;
			// 	const newstyleOption = lodash.cloneDeep(styleOption);
			// 	return { ...item, styleOption: newstyleOption };
			// });
			console.log(componentCopy, "component");
			// //这里的转换不可以使用JSON.stringify 回忽略函数
			const postData = {
				uid: uid,
				name: canvasName.value,
				component: stringifyChartComponent(componentCopy as FvComponentBase[]),
				style: JSON.stringify(style),
			};
			console.log(stringifyChartComponent(componentCopy as FvComponentBase[]));
			const res = await addCanvas(postData);
			if (res.code === 0) {
				message.success("新增视图成功！");
				const uid = res.data.uid;
				router.push({
					path: `/canvas/${uid}`,
				});
			} else {
				message.info(res.data.msg || "系统错误，请联系管理员！");
			}
			// console.log("ed", postData);
			// getLoction();
		};
		watchEffect(() => {
			// uid已路由地址为主
			const uid = route.params.uid;
			const editorUid = store.getters["editor/getUid"];
			if (uid && uid !== editorUid) {
				store.commit("editor/setEditorUid", uid);
			}
		});
		return {
			defaultList,
			isOpenToolBar,
			isOpenMenuBar,
			canvasName,
			compoentTypeIndex,
			closeOrOpenTool,
			closeOrOpenMenu,
			saveEditCanvas,
		};
	},
};
</script>
<style lang="scss" scoped>
.editor {
	position: relative;
	width: 100%;
	height: 100vh;
	:deep() .header {
		border-bottom: 1px solid #ececec;
	}

	.header-editor {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.ant-btn {
			margin-left: 20px;
		}
	}
}
.editor-cc {
	position: relative;
	display: flex;
	width: 100%;
	height: calc(100% - 50px);
	background: $background-color-c;
	overflow: hidden;
	&-l,
	&-r {
		position: absolute;
		width: 300px;
		height: 100%;
		background: #fff;
		//box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 2200;
		.tool-bar-ico {
			position: absolute;
			left: -20px;
			top: 50%;
			transform: translateY(-50%);
			width: 40px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			font-size: 30px;
			cursor: pointer;
			opacity: 0.3;
			z-index: 1;
			&:hover {
				opacity: 1;
				animation: opacity 0.7s;
			}
		}
	}
	&-l {
		display: flex;
		box-shadow: 10px 15px 40px 0px rgba(55, 79, 226, 0.1);
		.tool-bar-ico {
			left: 280px;
		}
		&.open {
			transform: translateX(0);
			// right: 0;
			transition: all 1s ease 0.1s;
			-webkit-transition: all 1s ease 0.1s;
			--firefox-transition: all 1s ease 0.1s;
		}
		&.close {
			transform: translateX(-240px);
			// right: -240px;
			transition: all 1s ease 0.1s;
			-webkit-transition: all 1s ease 0.1s;
			backdrop-filter: blur(20px);
		}
	}
	&-r {
		right: 0;
		top: 0;
		box-shadow: 10px 15px 40px 0px rgba(55, 79, 226, 0.1);
		&.open {
			transform: translateX(0);
			// right: 0;
			transition: all 1s ease 0.1s;
			-webkit-transition: all 1s ease 0.1s;
		}
		&.close {
			transform: translateX(240px);
			// right: -240px;
			transition: all 1s ease 0.1s;
			-webkit-transition: all 1s ease 0.1s;
		}
	}
	&-c {
		position: relative;
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		// padding: 0 300px 0 300px;
		box-sizing: border-box;
		overflow: hidden;
		.resize-box {
			position: absolute;
			bottom: 50px;
			right: 24%;
		}
		&.tool-open {
			padding-right: 300px;
		}
		&.menu-open {
			padding-left: 300px;
		}
		&.tool-close {
			padding-right: 60px;
		}
		&.menu-close {
			padding-left: 60px;
		}
	}
}
</style>
