function renderFuc() {
	console.log("renderFuc", this, "demo")
	// 标题
	const title = ""
	// 标题及图表中其他字体颜色
	const titleColor = "#000000"
	// 是否显示标题
	const showTitle = true
	// 图表颜色
	const colors = [
		"#006Dcf",
		"#00cf61",
		"#004c90",
		"#e44073",
		"#904ddd",
		"#dd4d51",
		"#4d51dd",
		"#d67826",
		"#00cfc8",
		"#dd4d99",
	]
	// 图表默认数据
	const data = {
		indicator: [
			{
				name: "数据一",
				max: 5,
			},
			{
				name: "数据二",
				max: 5,
			},
			{
				name: "数据三",
				max: 5,
			},
			{
				name: "数据四",
				max: 5,
			},
			{
				name: "数据五",
				max: 5,
			},
			{
				name: "数据六",
				max: 5,
			},
		],
		seriesData: [
			{
				value: [2, 3, 4, 4, 5, 5],
				name: "数据",
			},
		],
	}
	const unit = ""
	//将16进制颜色转化位rgb的数值
	function change(changeColor) {
		// 16进制颜色值的正则
		const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
		// 把颜色值变成小写
		let color = changeColor.toLowerCase()
		if (reg.test(color)) {
			// 如果只有三位的值，需变成六位，如：#fff => #ffffff
			if (color.length === 4) {
				let colorNew = "#"
				for (let i = 1; i < 4; i += 1) {
					colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
				}
				color = colorNew
			}
			// 处理六位的颜色值，转为RGB
			const colorChange = []
			for (let j = 1; j < 7; j += 2) {
				colorChange.push(parseInt("0x" + color.slice(j, j + 2)))
			}
			return colorChange.join(",")
		} else {
			return color
		}
	}
	const colors1 = []
	colors.forEach((item) => {
		colors1.push(change(item))
	})

	function getSeries() {
		const newSeries = []
		data.seriesData.forEach((item, index) => {
			newSeries.push({
				name: item.name,
				type: "radar",
				symbolSize: 3,
				lineStyle: {
					width: 1,
				},
				areaStyle: {
					color: {
						type: "linear", // 设置线性渐变
						x: 0,
						y: 1,
						x2: 1,
						y2: 0,
						colorStops: [
							{
								offset: 0,
								color: ` rgba(255,255,255, 0)`, // 0% 处的颜色
							},
							{
								offset: 0.4,
								color: ` rgba(${colors1[index]}, 0.5)`, // 0% 处的颜色
							},
							{
								offset: 1,
								color: `rgba(${colors1[index]},1)`, // 100% 处的颜色
							},
						],
						globalCoord: false, // 缺省为 false
					},
				},
				data: [item],
			})
		})

		return newSeries
	}

	function genOptions() {
		return {
			color: colors,
			title: [
				{
					text: title,
					textStyle: {
						color: titleColor,
						fontSize: 18,
						// fontFamily:'微软雅黑'
					},
					show: showTitle,
				},
				{
					text: unit,
					top: "1%",
					right: "5%",
					textStyle: {
						fontSize: 14,
						color: titleColor,
						fontWeight: 500,
					},
				},
			],
			radar: {
				shape: "circle",
				startAngle: 120,
				nameGap: 10,
				center: ["50%", "55%"],
				radius: "65%",
				axisName: {
					color: titleColor,
					padding: [0, 10],
					rich: {
						a: {
							fontSize: 12,
							color: titleColor,
							align: "center",
							padding: [8, 0],
							// fontFamily:'微软雅黑'
						},
						b: {
							fontSize: 18,
							color: titleColor,
							align: "center",
							// fontFamily:'arial'
						},
					},
					formatter: (params, data1) => {
						let i = 0
						data.indicator.forEach((item, index) => {
							if (data1.name === item.name) {
								i = index
							}
						})
						return `{a|${params}}\n{b|${data.seriesData[0].value[i]}}`
					},
				},
				axisLine: {
					lineStyle: {
						color: titleColor,
						opacity: 0.1,
					},
				},
				splitLine: {
					lineStyle: {
						color: titleColor,
						opacity: 0.1,
					},
				},
				splitArea: {
					areaStyle: {
						color: "none",
					},
				},
				indicator: data.indicator,
			},
			series: getSeries(),
		}
	}
	const option = genOptions()
	return option
}

export default { renderFuc }
