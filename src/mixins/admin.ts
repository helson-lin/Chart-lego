import { onMounted, reactive, ref } from "vue";
import { HttpRequest } from "@/lib/axios/request";
// 是否拆开参数
const tableParams = reactive({
	pageSize: 10,
	page: 1,
	total: null,
});
const operationUrls = reactive({
	listUrl: "",
	deleteUrl: "",
	addUrl: "",
	updUrl: "",
});
const listData = ref([]);
const getData = async () => {
	const listParams = { pageSize: tableParams.pageSize, page: tableParams.page };
	const res = await HttpRequest({
		url: operationUrls.listUrl,
		method: "GET",
		data: listParams,
	});
	if (res.code === 0) {
		listData.value = res.data.rows;
		tableParams.total = res.data.count;
	}
};
onMounted(() => {
	console.log("mixins");
	getData();
});
