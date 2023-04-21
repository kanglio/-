import Mock from 'mockjs';
import Banner from '@/mock/banner.json';
import Floor from '@/mock/floor.json';
//mock()方法 第一个参数：请求地址  第二个参数请求的什么数据
//模拟首页轮播图的数据
Mock.mock('/mock/banner', //请求的地址mock下的banner.json
	{
		//解构需要的数据
		code: 200, //成功的数据
		data:Banner //获取Banner的data数据
	});
//模拟楼层的数据
Mock.mock('/mock/floor', {
	code: 200,
	data:Floor
})
