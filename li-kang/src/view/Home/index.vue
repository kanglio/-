<template>
	<div>
		<TypeNav></TypeNav>
		<ListContainer></ListContainer>
		<TodeyRecommend></TodeyRecommend>
		<Rank></Rank>
		<Like></Like>
		<Floor v-for="(floor,index) in rFloor" :key="floor.id" :list='floor'></Floor>
		<Brand></Brand>
	</div>
</template>

<script>
	import ListContainer from '@/view/Home/ListContainer/index'
	import TodeyRecommend from '@/view/Home/TodeyRecommend/index'
	import Rank from '@/view/Home/Rank/index'
	import Like from '@/view/Home/Like/index'
	import Floor from '@/view/Home/Floor/index'
	import Brand from '@/view/Home/Brand/index'
	
	import {mapState} from'vuex'
	export default {
		components: {
			ListContainer,
			TodeyRecommend,
			Rank,
			Like,
			Floor,
			Brand
		},
		//计算属性
		computed:{
			...mapState({rFloor:state=>state.home.rFloor})
		},
		methods:{},
		mounted() {
			this.$store.dispatch('reqFloor')
		},
	}
</script>

<style>
</style>
