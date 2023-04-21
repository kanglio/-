import {
	reqCategoryList,
	reqlistContainer,
	reqFloor
} from '../../api/index.js'
//home小仓库
//state:仓库存储数据的地方
const state = {
	getTypeList: [],
	listContainer:[],
	rFloor:[]
};
//mutations:修改仓库数据的地方
const mutations = {
	GETTYPENAV(state, getTypeList) {
		state.getTypeList = getTypeList
	},
	GETLISTCONTAINER(state,listContainer){
		state.listContainer=listContainer;
	},
	REQFLOOR(state,rFloor){
		state.rFloor=rFloor;
	}
};
//actions:处理业务逻辑和异步的地方
const actions = {
	//这里可以修改业务逻辑，不能直接修改仓库数据
	//async:定义为异步
	//await:等一下后面的请求代码
	async getTypeNav({
		commit
	}) {
		let getTypeList = await reqCategoryList();
		if (getTypeList.code == 200) {
			commit("GETTYPENAV", getTypeList.data)
		}
	},
	async getlistContainer({commit}){
		let listContainer = await reqlistContainer();
		if(listContainer.code==200){
			commit("GETLISTCONTAINER",listContainer.data)
		}
	},
	async reqFloor({commit}){
		let rFloor=await reqFloor();
		if(rFloor.code==200){
			commit('REQFLOOR',rFloor.data)
		}
	}
};
//getters:拆分仓库数据
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
}
