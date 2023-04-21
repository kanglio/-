<template>
	<div>
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--bread 面包屑-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li class="with-x" v-if='searchParams.categoryName'>{{searchParams.categoryName}}<i
								@click="dianx()">×</i></li>
						<li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i
								@click="dianxx()">×</i></li>
						<li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i
								@click="dianxxx()">×</i></li>
						<li class="with-x" v-for="(props,index) in searchParams.props" :key="index">
							{{props.split(":")[1]}}<i @click="dianxxxx(index)">×</i>
						</li>
					</ul>
				</div>
				<!--selector-->
				<SearchSelector @trademarkInfo='trademarkInfo' @attrInfo="attrInfo" />

				<!--details-->
				<div class="details clearfix">
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<!-- indexOf 有字符串的内容返回1 否则返回-1 
								如果order有相应的字符显示样式没有则不显示
								-->
								<li :class="{active:isOne}" @click="changOrder1()">
									<a>综合<span v-show="isOne">{{isAcsDesc}}</span></a>
								</li>
								<li :class="{active:isTwo}" @click="changOrder2()">
									<a>价格<span v-show="isTwo">{{isAcsDesc}} </span></a>
								</li>
							</ul>
						</div>
					</div>
					<div class="goods-list">
						<ul class="yui3-g">
							<li class="yui3-u-1-5" v-for="(goodsList,index) in goodsList" :key="goodsList.id">
								<div class="list-wrap">
									<div class="p-img">
										<router-link :to="`/detail/${goodsList.id}`"><img
												:src="goodsList.defaultImg" /></router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{goodsList.price}}.00</i>
										</strong>
									</div>
									<div class="attr">
										<a target="_blank" href="item.html" title="">{{goodsList.title}}</a>
									</div>
									<div class="commit">
										<i class="command">已有<span>{{goodsList.hotScore}}</span>人评价</i>
									</div>
									<div class="operate">
										<a href="success-cart.html" target="_blank"
											class="sui-btn btn-bordered btn-danger">加入购物车</a>
										<a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<!-- <Paginatin :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total"
						:cntinues="5" @getPageNo="getPageNo"></Paginatin> -->
						<!-- pageNo:当前页  pageSize:展示多少条数据 total:共多少条数据  cntinues:连续页码数 -->
					<Paginatin :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total"
						:cntinues="5" @getPageNo="getPageNo"></Paginatin>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SearchSelector from './SearchSelector/SearchSelector'
	import {
		mapGetters,
		mapState
	} from 'vuex'
	// import store from '@/store'
	export default {
		name: 'Search',
		data() {
			return {
				searchParams: {
					category1Id: "",
					category2Id: "",
					category3Id: "",
					categoryName: "",
					keyword: "",
					//asc升序 desc降序
					order: "1:asc",
					pageNo: 6,
					pageSize: 3,
					props: [],
					trademark: ""
				}
			}
		},
		beforeMount() {
			Object.assign(this.searchParams, this.$route.query, this.$route.params)
		},
		mounted() {
			this.goData()
		},
		components: {
			SearchSelector
		},
		computed: {
			...mapGetters(['goodsList']),
			...mapState({
				//...展开里面的对象
				total: state => state.search.reqSearch.total
			}),
			isOne() {
				return this.searchParams.order.indexOf('1') != -1
			},
			isTwo() {
				return this.searchParams.order.indexOf('2') != -1
			},
			isAcsDesc() {
				if (this.searchParams.order.indexOf('asc') != -1) {
					return '⬆'
				} else {
					return '⬇'
				}
			}
		},
		methods: {
			//自定义事件获取当前第几页
			getPageNo(pageNo) {
				this.searchParams.pageNo = pageNo
				console.log(pageNo)
				this.goData();
			},
			changOrder1() {
				if (this.searchParams.order.indexOf('asc') != -1) {
					this.searchParams.order = "1:desc"
				} else if (this.searchParams.order.indexOf('desc') != -1) {
					this.searchParams.order = "1:asc"
				}
				this.goData();
			},
			changOrder2() {
				if (this.searchParams.order.indexOf('asc') != -1) {
					this.searchParams.order = "2:desc"
				} else if (this.searchParams.order.indexOf('desc') != -1) {
					this.searchParams.order = "2:asc"
				}
				this.goData();
			},
			attrInfo(attrsList, attrValueList) {
				let props = `${attrsList.attrId}:${attrValueList}:${attrsList.attrName}`
				if (this.searchParams.props.indexOf(props) == -1) {
					this.searchParams.props.push(props);
					this.goData();
				}

			},
			//自定义事件回调
			trademarkInfo(trademarkList) {
				//整理参数 id:品牌名
				this.searchParams.trademark = `${trademarkList.tmId}:${trademarkList.tmName}`
				this.goData();
			},
			goData() {
				this.$store.dispatch('reqgetSearch', this.searchParams)
			},
			dianx() {
				this.searchParams.categoryName = undefined;
				this.searchParams.category1Id = undefined;
				this.searchParams.category2Id = undefined;
				this.searchParams.category3Id = undefined;
				this.goData();
				this.$router.push({
					name: 'search',
					params: this.$route.params
				})
			},
			dianxx() {
				this.searchParams.keyword = undefined;
				this.goData();
				//通知兄弟组件Head1清除关键字
				this.$bus.$emit('clear')
				this.$router.push({
					name: 'search',
					query: this.$route.query
				})
			},
			dianxxx() {
				this.searchParams.trademark = undefined;
				this.goData();
			},
			dianxxxx(index) {
				//再次整理参数 splice( 删除元素的哪一个index 删除几个)
				this.searchParams.props.splice(index, 1)
				this.goData();
			}
		},
		watch: {
			$route() {
				Object.assign(this.searchParams, this.$route.query, this.$route.params)
				this.goData()
				// console.log(this.searchParams)
				//Object.assign(this.searchParams,{category1Id:"",category2Id:"",category3Id:""})
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		margin: 10px 0;

		.py-container {
			width: 1200px;
			margin: 0 auto;

			.bread {
				margin-bottom: 5px;
				overflow: hidden;

				.sui-breadcrumb {
					padding: 3px 15px;
					margin: 0;
					font-weight: 400;
					border-radius: 3px;
					float: left;

					li {
						display: inline-block;
						line-height: 18px;

						a {
							color: #666;
							text-decoration: none;

							&:hover {
								color: #4cb9fc;
							}
						}
					}
				}

				.sui-tag {
					margin-top: -5px;
					list-style: none;
					font-size: 0;
					line-height: 0;
					padding: 5px 0 0;
					margin-bottom: 18px;
					float: left;

					.with-x {
						font-size: 12px;
						margin: 0 5px 5px 0;
						display: inline-block;
						overflow: hidden;
						color: #000;
						background: #f7f7f7;
						padding: 0 7px;
						height: 20px;
						line-height: 20px;
						border: 1px solid #dedede;
						white-space: nowrap;
						transition: color 400ms;
						cursor: pointer;

						i {
							margin-left: 10px;
							cursor: pointer;
							font: 400 14px tahoma;
							display: inline-block;
							height: 100%;
							vertical-align: middle;
						}

						&:hover {
							color: #28a3ef;
						}
					}
				}
			}

			.details {
				margin-bottom: 5px;

				.sui-navbar {
					overflow: visible;
					margin-bottom: 0;

					.filter {
						min-height: 40px;
						padding-right: 20px;
						background: #fbfbfb;
						border: 1px solid #e2e2e2;
						padding-left: 0;
						border-radius: 0;
						box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

						.sui-nav {
							position: relative;
							left: 0;
							display: block;
							float: left;
							margin: 0 10px 0 0;

							li {
								float: left;
								line-height: 18px;

								a {
									display: block;
									cursor: pointer;
									padding: 11px 15px;
									color: #777;
									text-decoration: none;
								}

								&.active {
									a {
										background: #e1251b;
										color: #fff;
									}
								}
							}
						}
					}
				}

				.goods-list {
					margin: 20px 0;

					ul {
						display: flex;
						flex-wrap: wrap;

						li {
							height: 100%;
							width: 20%;
							margin-top: 10px;
							line-height: 28px;

							.list-wrap {
								.p-img {
									padding-left: 15px;
									width: 215px;
									height: 255px;

									a {
										color: #666;

										img {
											max-width: 100%;
											height: auto;
											vertical-align: middle;
										}
									}
								}

								.price {
									padding-left: 15px;
									font-size: 18px;
									color: #c81623;

									strong {
										font-weight: 700;

										i {
											margin-left: -5px;
										}
									}
								}

								.attr {
									padding-left: 15px;
									width: 85%;
									overflow: hidden;
									margin-bottom: 8px;
									min-height: 38px;
									cursor: pointer;
									line-height: 1.8;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;

									a {
										color: #333;
										text-decoration: none;
									}
								}

								.commit {
									padding-left: 15px;
									height: 22px;
									font-size: 13px;
									color: #a7a7a7;

									span {
										font-weight: 700;
										color: #646fb0;
									}
								}

								.operate {
									padding: 12px 15px;

									.sui-btn {
										display: inline-block;
										padding: 2px 14px;
										box-sizing: border-box;
										margin-bottom: 0;
										font-size: 12px;
										line-height: 18px;
										text-align: center;
										vertical-align: middle;
										cursor: pointer;
										border-radius: 0;
										background-color: transparent;
										margin-right: 15px;
									}

									.btn-bordered {
										min-width: 85px;
										background-color: transparent;
										border: 1px solid #8c8c8c;
										color: #8c8c8c;

										&:hover {
											border: 1px solid #666;
											color: #fff !important;
											background-color: #666;
											text-decoration: none;
										}
									}

									.btn-danger {
										border: 1px solid #e1251b;
										color: #e1251b;

										&:hover {
											border: 1px solid #e1251b;
											background-color: #e1251b;
											color: white !important;
											text-decoration: none;
										}
									}
								}
							}
						}
					}
				}

				.page {
					width: 733px;
					height: 66px;
					overflow: hidden;
					float: right;

					.sui-pagination {
						margin: 18px 0;

						ul {
							margin-left: 0;
							margin-bottom: 0;
							vertical-align: middle;
							width: 490px;
							float: left;

							li {
								line-height: 18px;
								display: inline-block;

								a {
									position: relative;
									float: left;
									line-height: 18px;
									text-decoration: none;
									background-color: #fff;
									border: 1px solid #e0e9ee;
									margin-left: -1px;
									font-size: 14px;
									padding: 9px 18px;
									color: #333;
								}

								&.active {
									a {
										background-color: #fff;
										color: #e1251b;
										border-color: #fff;
										cursor: default;
									}
								}

								&.prev {
									a {
										background-color: #fafafa;
									}
								}

								&.disabled {
									a {
										color: #999;
										cursor: default;
									}
								}

								&.dotted {
									span {
										margin-left: -1px;
										position: relative;
										float: left;
										line-height: 18px;
										text-decoration: none;
										background-color: #fff;
										font-size: 14px;
										border: 0;
										padding: 9px 18px;
										color: #333;
									}
								}

								&.next {
									a {
										background-color: #fafafa;
									}
								}
							}
						}

						div {
							color: #333;
							font-size: 14px;
							float: right;
							width: 241px;
						}
					}
				}
			}
		}
	}
</style>