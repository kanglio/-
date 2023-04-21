//统一管理这个项目的所有接口(api)
import requests from './request.js' //引入二次封装的axios
import mockRequests from './mockRequest.js'
//三级联动接口
///api/product/getBaseCategoryList GET 无参数
export const reqCategoryList = () => {
	return requests({
		url: '/product/getBaseCategoryList',
		mathod: 'get'
	});
}
//轮播图mock接口
export const reqlistContainer = () => {
	return mockRequests({
		url: '/banner',
		mathod: 'get'
	})
}
//楼层mock接口
export const reqFloor = () => {
	return mockRequests({
		url: '/floor',
		mathod: 'get'
	})
}
//搜索商品 /api/list
export const reqSearch=(params)=>requests({url:"/list",method:"post",data:params})

//获取商品详情/api/item/{ skuId }
export const reqDetail=(skuid)=>requests({url:`/item/${skuid}`,method:'get'})

