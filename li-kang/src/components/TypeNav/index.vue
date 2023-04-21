<template>

	<!-- 商品分类导航 -->
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="leaveIndex()" @mouseenter='xsShow()'>
				<h2 class="all">全部商品分类</h2>
				<!-- 过渡动画  vue自带的transition-->
				<transition name='sort'>
					<div class="sort" v-show="show">
						<div class="all-sort-list2" @click="goSearch">

							<div class="item" v-for="(c1,index) in getTypeList" :key="c1.categoryId">
								<!-- @mouseenter鼠标进入  currentIndex==index显示类名cur -->
								<!-- @mouseleave鼠标移除 -->
								<h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex==index}">
									<a :data-categoryName="c1.categoryName"
										:data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
								</h3>
								<!-- 二三级分类  
									 display:控制样式的显示和隐藏  block:显示 none:隐藏  
									 如果currentIndex==index
									 则显示
									 反之隐藏
									 -->
								<div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
									<div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a :data-categoryName="c2.categoryName"
													:data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
											</dt>
											<dd>
												<em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
													<a :data-categoryName="c3.categoryName"
														:data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>

				</transition>

			</div>

			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">京东超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	import _ from 'lodash'
	export default {
		name: "TypeNav",
		data() {
			return {
				//存储用户鼠标移上哪一个一级分类
				currentIndex: null,
				show: true
			}
		},
		//组件挂载完毕后
		mounted() {
			//console.log(_.debounce)
			if (this.$route.path != '/home') {
				this.show = false
			}
		},
		computed: {
			//使用对象右侧需要有一个函数里面有一个默认参数state(大仓库)，使用一次对象调用一次函数
			...mapState({
				getTypeList: state => state.home.getTypeList
			})
		},
		methods: {
			//鼠标进入修改响应式数据currentIndex属性
			// changeIndex(index) {
			// 	//currentIndex等于页面传递过来的下标参数
			// 	this.currentIndex = index;
			// 	console.log("鼠标进入" + index);
			// },
			changeIndex: _.debounce(function(index) {
				this.currentIndex = index;
				//console.log("鼠标进入" + index);
			}, 20),
			leaveIndex() {
				this.currentIndex = null;
				if (this.$route.path != '/home') {
					this.show = false
				}
			},
			xsShow() {
				this.show = true
			},
			goSearch(event) {
				//event事件 target dataset
				let element = event.target; //通过target获取点击时的DOM
				let {
					categoryname,
					category1Id,
					category2Id,
					category3Id
				} = element.dataset //通过dataset获取自定义属性
				if (categoryname) {
					let la = {
						name: 'search'
					}
					let query = {
						categoryName: categoryname
					}
					if (category1Id) {
						query.category1Id = category1Id
					} else if (category2Id) {
						query.category2Id = category2Id
					} else if (category3Id) {
						query.category3Id = category3Id
					}
					if (this.$route.params) {
						la.params = this.$route.params
					}
					la.query = query
					this.$router.push(la)
				}
			}
		}
	}
</script>

<style lang="less">
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}

						// &:hover {
						// 	.item-list {
						// 		display: block;
						// 	}
						// }

						.cur {
							background: #e1251b;
						}
					}
				}
			}

			//vue自身带的过渡动画样式
			//过渡动画开始状态(进入)
			.sort-enter {
				height: 0px;
				transform: rotate(0deg);
			}

			//过渡动画结束状态
			.sort-enter-to {
				height: 461px;
				//transform: rotate(360deg);
			}

			//定义动画时间，速度
			.sort-enter-active {
				transition: all .5s linear;
			}
		}
	}
</style>