<template>
	<div class="fv-home">
		<Header>
			<template #>
				<div class="header-right">
					<a-button type="text" @click="routeEditor">
						工作台
						<template #icon>
							<desktop-outlined />
						</template>
					</a-button>
				</div>
			</template>
		</Header>
	</div>
</template>
<script lang="ts" setup>
import Header from "../components/common/Header.vue";
import { DesktopOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
const store = useStore();
const router = useRouter();
const routeEditor = () => {
	const uid = uuidv4();
	store.commit("editor/setEditorUid", uid);
	router.push({
		path: `/editor/${uid}`,
	});
};
</script>
<style lang="scss" scoped>
.fv-home {
	.header-right {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.ant-btn {
			background: #f2f2f2;
		}
	}
}
</style>
