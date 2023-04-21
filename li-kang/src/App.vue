<template>
	<div>
		<Head1></Head1>
		<router-view></router-view>
		<Boottom1></Boottom1>
	</div>
</template>

<script>
	import Head1 from '@/components/Head1/index'
	import Boottom1 from '@/components/Bottom1/index'
	export default {
		name: 'App',
		components: {
			Head1,
			Boottom1
		},
		//组件挂载完毕后
		mounted() {
			this.$store.dispatch('getTypeNav')
		}
	}
</script>

<style>

</style>
