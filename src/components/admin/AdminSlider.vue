import { ref } from "vue"; import { ref } from "vue";

<template>
	<div class="admin-slider">
		<a-menu
			v-model:selectedKeys="selectedKeys"
			style="width: 220px"
			mode="inline"
			@click="menuClick"
		>
			<a-sub-menu key="sub1">
				<template #icon>
					<team-outlined />
				</template>
				<template #title>系统管理</template>
				<a-menu-item key="/admin/user">
					<template #icon> <user-outlined /> </template>
					用户管理</a-menu-item
				>
				<a-menu-item key="/admin/role">
					<template #icon> <usergroup-delete-outlined /> </template>
					角色管理</a-menu-item
				>
				<a-menu-item key="/admin/menu">
					<template #icon> <user-outlined /></template>
					菜单管理</a-menu-item
				>
				<a-menu-item key="/admin/organization">
					<template #icon> <cluster-outlined /></template>
					组织管理</a-menu-item
				>
			</a-sub-menu>
			<a-sub-menu key="sub2">
				<template #icon></template>
				<template #title>
					<bulb-outlined />
					关于
				</template>
				<a-menu-item key="5">
					<template #icon>
						<trademark-circle-outlined />
					</template>
					FANO VIEW</a-menu-item
				>
				<a-menu-item key="6">
					<template #icon> <send-outlined /></template>建议与反馈</a-menu-item
				>
			</a-sub-menu>
		</a-menu>
	</div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
const selectedKeys = ref(0);
const router = useRouter();
const route = useRoute();
const store = useStore();
const menuClick = (val) => {
	if (route.path === val.key) return;
	router.push({
		path: val.key,
	});
	store.commit("admin/addTab", {
		path: val.key,
		name: "Test",
	});
	// store commit
};
</script>
<style lang="scss" scoped>
.admin-slider {
	height: 100%;
	backdrop-filter: blur(12px);
	:deep() .ant-menu {
		background: rgba(0, 0, 0, 0);
		backdrop-filter: blur(12px);
		border-right: none;
	}
}
</style>
