<template>
	<div class="menu">
		<a-table :columns="columns" :data-source="data">
			<template #headerCell="{ column }">
				<template v-if="column.key === 'name'">
					<span>
						<smile-outlined />
						Name
					</span>
				</template>
			</template>

			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'name'">
					<a>
						{{ record.name }}
					</a>
				</template>
				<template v-else-if="column.key === 'tags'">
					<span>
						<a-tag
							v-for="tag in record.tags"
							:key="tag"
							:color="
								tag === 'loser'
									? 'volcano'
									: tag.length > 5
									? 'geekblue'
									: 'green'
							"
						>
							{{ tag.toUpperCase() }}
						</a-tag>
					</span>
				</template>
				<template v-else-if="column.key === 'action'">
					<span>
						<a>Invite 一 {{ record.name }}</a>
						<a-divider type="vertical" />
						<a>Delete</a>
						<a-divider type="vertical" />
						<a class="ant-dropdown-link">
							More actions
							<down-outlined />
						</a>
					</span>
				</template>
			</template>
		</a-table>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref, ComponentOptionsMixin } from "vue";
import adminMixin from "@/mixins/admin";
import { getMenuList } from "@/interface/menu";
const columns = ref([
	{
		title: "名称",
		dataIndex: "title",
		key: "title",
	},
	{
		title: "图标",
		dataIndex: "icon",
		key: "icon",
	},
	{
		title: "路径",
		key: "path",
		dataIndex: "path",
	},
	{
		title: "操作",
		key: "action",
	},
]);
const data = ref([]);
const getMenu = async () => {
	const res = await getMenuList();
	if (res.code === 0) {
		data.value = res.data.rows;
	}
};
onMounted(() => {
	getMenu();
});
</script>
