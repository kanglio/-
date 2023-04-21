import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import routes from './routes.js'
export default new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		// return 期望滚动到哪个的位置
		return {
			y: 0 //返回的y=0代表滚动条在最上方
		}
	}
})