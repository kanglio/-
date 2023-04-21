import Home from '@/view/Home/index'
import Search from '@/view/Search/index'
import Detail from '@/view/Detail/index'
export default [{
		path: '*',
		redirect: "/home",
		//meta:{show:true}//配置路由元信息meta:{自己命名:}
	},
	{
		path: '/home',
		component: Home,
		//meta:{show:true}//配置路由元信息meta:{自己命名:}
	},
	{
		path: '/search/:keyword?',
		component: Search,
		name: "search"
	},
	{
		path: '/detail/:skuid',
		component: Detail,
		name: "detail"
	},
]