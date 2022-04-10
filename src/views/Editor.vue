<template>
	<div class="editor">
		<div :class="['editor-l', isOpenMenuBar ? 'open' : 'close']">
			<div class="tool-bar-ico" @click="closeOrOpenMenu">
				<left-circle-filled v-if="isOpenMenuBar" />
				<right-circle-filled v-else />
			</div>
		</div>
		<div
			:class="[
				'editor-c',
				isOpenToolBar ? 'tool-open' : 'tool-close',
				isOpenMenuBar ? 'menu-open' : 'menu-close',
			]"
			:style="{ '--left': !isOpenMenuBar && !isOpenMenuBar ? '480px' : '' }"
		>
			<Editor />
		</div>
		<div :class="['editor-r', isOpenToolBar ? 'open' : 'close']">
			<div class="tool-bar-ico" @click="closeOrOpenTool">
				<left-circle-filled v-if="!isOpenToolBar" />
				<right-circle-filled v-else />
			</div>
			<BaseSetting />
		</div>
	</div>
</template>
<script lang="ts">
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons-vue"
import Editor from "../components/editor/Editor.vue"
import BaseSetting from "../components/editor/BaseSetting.vue"
import { ref } from "vue"
export default {
	components: { BaseSetting, Editor, LeftCircleFilled, RightCircleFilled },
	setup() {
		const defaultList = ref([
			{ id: "1", url: "https://sogou.com", className: "class1" },
			{
				id: "2",
				url: "https://www.xhling.com/post-398.html",
				className: "class2",
			},
		])
		const isOpenToolBar = ref(true)
		const isOpenMenuBar = ref(true)
		const closeOrOpenTool = () => {
			isOpenToolBar.value = !isOpenToolBar.value
		}
		const closeOrOpenMenu = () => {
			isOpenMenuBar.value = !isOpenMenuBar.value
		}
		return {
			defaultList,
			isOpenToolBar,
			isOpenMenuBar,
			closeOrOpenTool,
			closeOrOpenMenu,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	display: flex;
	background: #ffffff;
	&-l,
	&-r {
		position: absolute;
		width: 300px;
		height: 100%;
		background: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 2;
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
		box-sizing: border-box;
		padding: 0 300px 0 300px;
		overflow: auto;
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
