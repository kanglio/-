//axios二次封装
import axios from 'axios' //引入

import nprogress from 'nprogress' //引入进度条
import 'nprogress/nprogress.css'
//start:进度条开始 done:进度条结束
const requests = axios.create({
	baseURL: '/mock',
	timeout: 5000
});
// 添加请求拦截器
requests.interceptors.request.use(function(config) { //第一个回调函数成功发送请求
	// 在发送请求之前做些什么
	nprogress.start(); //进度条开始
	return config;
});

// 添加响应拦截器
requests.interceptors.response.use(function(res) { //第一个回调函数返回结果成功后
	// 对响应数据做点什么
	nprogress.done(); //进度条结束
	return res.data; //返回结果
}, function(error) { //第二个回调函数返回结果失败后
	// 对响应错误做点什么
	return Promise.reject(new Error('faile'));
});

export default requests; //对外暴露
