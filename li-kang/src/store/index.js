import Vue from 'vue';
import Vuex from 'vuex'; //vuex是一个对象 Store有一个构造方法可以初始化vuex仓库
import home from './home/index.js'//home小仓库
import search from'./search/index.js'//search小仓库
import detail from './detail/index.js'//商品详情小仓库
//在vue使用插件一次
Vue.use(Vuex);

//对外暴露Store类的实例对象
export default new Vuex.Store({
	//实现Vuex仓库模块式开发存储数据
	modules:{//注册
		home,
		search,
		detail
	}
	
});
