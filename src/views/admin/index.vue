<template>
	<div class="fv-admin">
		<admin-header />
		<div class="admin-content">
			<admin-slider></admin-slider>
			<div class="content-view">
				<a-tabs
					v-model:activeKey="tabActiveKey"
					type="editable-card"
					hide-add
					@tabClick="tabClick"
				>
					<a-tab-pane
						v-for="tab in tabList"
						:key="tab.path"
						:tab="tab.name"
						:closeable="tab.closeable"
					>
					</a-tab-pane>
				</a-tabs>
				<keep-alive>
					<router-view />
				</keep-alive>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminSlider from "@/components/admin/AdminSlider.vue";
import { useStore } from "vuex";
import { Tab } from "@/store/admin";
import { useRouter, useRoute } from "vue-router";
const tabActiveKey = ref(0);
const store = useStore();
const router = useRouter();
const route = useRoute();
const tabList = computed<Tab[]>(() => {
	return store.state.admin.tabList;
});
const tabClick = (path: string) => {
	if (route.path === path) return;
	router.push({
		path: path,
	});
};
</script>
<style lang="scss" scoped>
.fv-admin {
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(to right, #a8c6f7, #d4e9fd);
	.admin-content {
		display: flex;
		height: calc(100% - 50px);
		.content-view {
			flex: 1;
			height: 100%;
			padding: 20px;
			box-sizing: border-box;
		}
	}
}
</style>
