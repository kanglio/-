<template>
	<!-- 	<div class="pagination">
		<button :disabled="pageNo==startNamAndEndNum.start" @click="$emit('getPageNo',pageNo-1)">上一页</button>
		<button v-if="startNamAndEndNum.start>1" @click="$emit('getPageNo',1)">1</button>
		<button v-if="startNamAndEndNum.start>2">···</button>
		<button v-for="(page,index) in startNamAndEndNum.end" v-if="page>=startNamAndEndNum.start"
			@click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
		<button v-if="startNamAndEndNum.end<totalPage-1">···</button>
		<button v-if="startNamAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)"
			:class="{active:pageNo==totalPage}">{{totalPage}}</button>
		<button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
		<button style="margin-left: 30px">共 {{total}} 条</button>
		<h1>{{startNamAndEndNum}}</h1>
	</div> -->
	<div class="pagination">
		<!-- 上 -->
		<button @click="$emit('getPageNo',pageNo>1?pageNo-1:pageNo)">上一页</button>
		<button v-if="startNamAndEndNum.kai>1">1</button>
		<button v-if="startNamAndEndNum.kai>2">···</button>
		<!-- 中 -->
		<button v-for="(end,index) in startNamAndEndNum.jie" v-if="end>=startNamAndEndNum.kai"
			:class="{active:pageNo==end}" @click="$emit('getPageNo',end)">{{end}}</button>
		<!-- 下 -->
		<button v-if="startNamAndEndNum.jie<totalPage-1">···</button>
		<button v-if="startNamAndEndNum.jie<totalPage">{{totalPage}}</button>
		<button @click="$emit('getPageNo',pageNo<totalPage?pageNo+1:pageNo)">下一页</button>
		<button style="margin-left: 30px">共 {{total}} 条</button>
	</div>
</template>

<script>
	export default {
		name: "Paginatin",
		// 当前页  展示多少条数据  共多少条数据  连续页码
		props: ["pageNo", "pageSize", "total", "cntinues"],
		computed: {
			//总页数
			totalPage() {
				//向上取整   共多少条数据/展示多少条数据
				return Math.ceil(this.total / this.pageSize)
			},
			startNamAndEndNum() {
				const {
					pageNo,
					totalPage,
					cntinues
				} = this;
				let kai = 0,
					jie = 0;
				if (cntinues > totalPage) {
					//如果连续页码大于总页数
					kai = 1
					jie = totalPage
				} else {
					kai = pageNo - parseInt(cntinues / 2)
					jie = pageNo + parseInt(cntinues / 2)
					if (jie > totalPage) {
						//如果结束页码大于总页数
						jie = totalPage
					}
					if (kai > totalPage) {
						//如果开始页码大于总页数
						kai = 1
						jie = totalPage
					}

				}
				return {
					kai,
					jie
				}



				// const {
				// 	pageNo,//当前页
				// 	totalPage,//总页数
				// 	cntinues//连续页码
				// } = this;
				// let start = 0,
				// 	end = 0;

				// if (cntinues > totalPage) {

				// 	start = 1;
				// 	end = totalPage;

				// } else {

				// 	start = pageNo - parseInt(cntinues / 2);
				// 	end = pageNo + parseInt(cntinues / 2);

				// 	if (start < 1) {
				// 		start = 1;
				// 		end = cntinues;

				// 	}

				// 	if (end > totalPage) {
				// 		start = totalPage - cntinues + 1
				// 		end = totalPage;

				// 	}

				// }
				// return {
				// 	start,
				// 	end
				// };
			}
		}
	}
</script>

<style lang="less" scoped>
	.pagination {
		text-align: center;

		button {
			margin: 0 5px;
			background-color: #f4f4f5;
			color: #606266;
			outline: none;
			border-radius: 2px;
			padding: 0 4px;
			vertical-align: top;
			display: inline-block;
			font-size: 13px;
			min-width: 35.5px;
			height: 28px;
			line-height: 28px;
			cursor: pointer;
			box-sizing: border-box;
			text-align: center;
			border: 0;

			&[disabled] {
				color: #c0c4cc;
				cursor: not-allowed;
			}

			&.active {
				cursor: not-allowed;
				background-color: #409eff;
				color: #fff;
			}
		}
	}
</style>