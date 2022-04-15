<template>
	<div class="editor">
		<Header> </Header>
		<div class="editor-cc">
			<div :class="['editor-cc-l', isOpenMenuBar ? 'open' : 'close']">
				<ChartList :list="ChartList" />
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
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons-vue";
import Header from "../components/common/Header.vue";
import Editor from "../components/editor/Editor.vue";
import BaseSetting from "../components/editor/BaseSetting.vue";
import ChartList from "../components/editor/ChartList.vue";
// import Resize from "../components/editor/Resize.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
	components: {
		Header,
		BaseSetting,
		Editor,
		LeftCircleFilled,
		RightCircleFilled,
		ChartList,
	},
	setup() {
		const store = useStore();
		const defaultList = ref([
			{ id: "1", url: "https://sogou.com", className: "class1" },
			{
				id: "2",
				url: "https://www.xhling.com/post-398.html",
				className: "class2",
			},
		]);
		const isOpenToolBar = ref(true);
		const isOpenMenuBar = ref(true);
		const closeOrOpenTool = () => {
			isOpenToolBar.value = !isOpenToolBar.value;
		};
		const closeOrOpenMenu = () => {
			isOpenMenuBar.value = !isOpenMenuBar.value;
		};
		return {
			defaultList,
			isOpenToolBar,
			isOpenMenuBar,
			closeOrOpenTool,
			closeOrOpenMenu,
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
}
.editor-cc {
	position: relative;
	display: flex;
	width: 100%;
	height: calc(100% - 50px);
	background: $background-color-primary;
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
		.tool-bar-ico {
			left: 280px;
		}
		&.open {
			transform: translateX(0);
			// right: 0;
			-webkit-transition: all 1s ease 0.1s;
		}
		&.close {
			transform: translateX(-240px);
			// right: -240px;
			-webkit-transition: all 1s ease 0.1s;
			backdrop-filter: blur(20px);
		}
	}
	&-r {
		right: 0;
		top: 0;
		&.open {
			transform: translateX(0);
			// right: 0;
			-webkit-transition: all 1s ease 0.1s;
		}
		&.close {
			transform: translateX(240px);
			// right: -240px;
			-webkit-transition: all 1s ease 0.1s;
		}
	}
	&-c {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		// padding: 0 300px 0 300px;
		box-sizing: border-box;
		overflow: hidden;
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
