import {
	reqSearch
} from '@/api/index'
//search小仓库
//state:仓库存储数据的地方
const state = {
	reqSearch: {}
};
//mutations:修改仓库数据的地方
const mutations = {
	REQGETSEARCH(state, reqSearch) {
		state.reqSearch = reqSearch
	}
};
//actions:处理业务逻辑和异步的地方
const actions = {
	//这里可以修改业务逻辑，不能直接修改仓库数据
	async reqgetSearch({
		commit
	}, params = {}) {
		let rSearch = await reqSearch(params||{})
		if (rSearch.code == 200) {
			commit('REQGETSEARCH', rSearch.data)
		}
	}
};
//getters:拆分仓库数据,简化数据
const getters = {
	attrsList(state){
		return state.reqSearch.attrsList
	},
	goodsList(state){
		return state.reqSearch.goodsList
	},
	trademarkList(state){
		return state.reqSearch.trademarkList
	}
};

export default {
	state,
	mutations,
	actions,
	getters
}