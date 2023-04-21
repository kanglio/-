<template>
	<div class="swiper-container" id="mySwiper" ref="mySwiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(Carousel,index) in list" :key="Carousel.id">
				<img :src="Carousel.imgUrl" />
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>
	
		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
	//引入swiper
	import Swiper from 'swiper'
	export default {
		name:'Container',
		props:['list'],
		//监听
		watch: {
			//监听哪一个数据
			list: {
				immediate:true,
				//数据变化时执行  变化后  变化前
				handler(newValue, oldValue) {
					//nextTick() 循环结束之后 修改数据之后
					this.$nextTick(() => {
						var mySwiper = new Swiper(
							this.$refs.mySwiper, {
								loop: true, // 循环模式选项
								autoplay: true, //设置自动切换
								clickable: true, //点击小球也切换图片
								// 如果需要分页器
								pagination: {
									el: '.swiper-pagination',
									//控制轮播图的小球能否切换轮播图
									clickable: true,
								},
								// 如果需要前进后退按钮
								navigation: {
									nextEl: '.swiper-button-next',
									prevEl: '.swiper-button-prev',
								},
							})
					})
				}
			}
		}
	}
</script>

<style>
</style>