import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index.js'
//引入仓库
import store from '@/store/index.js'
Vue.config.productionTip = false
//引入mock模拟数据 使用
import '@/mock/mockServer'
//引入阿里巴巴图标
import '@/assets/fonts/iconfont.css'
//引入swiper样式
import 'swiper/css/swiper.css'
import Container from '@/components/Container/index'
Vue.component(Container.name, Container)
// import {reqSearch} from '@/api'
// console.log(reqSearch({categoryName:'手机'}))
//引入分页
import Paginatin from '@/components/Pagination/index'
Vue.component(Paginatin.name, Paginatin)
//引入三级联动
import TypeNav from '@/components/TypeNav/index'
//第一个参数 组件的名字 第二个参数 哪一个组件
Vue.component(TypeNav.name, TypeNav)
//
new Vue({
	render: h => h(App),
	//数据获取之前
	beforeCreate() {
		//全局事件总线$bus配置
		Vue.prototype.$bus = this; //this==Vm
	},
	router, //注册路由
	TypeNav, //注册全局组件
	store //注册仓库
}).$mount('#app')