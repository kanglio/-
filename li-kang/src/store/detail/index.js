import {
	reqDetail
} from '@/api/index'
//search小仓库
//state:仓库存储数据的地方
const state = {
	rDetail: {}
};
//mutations:修改仓库数据的地方
const mutations = {
	STORDETAIL(state, rDetail) {
		state.rDetail = rDetail
	}
};
//actions:处理业务逻辑和异步的地方
const actions = {
	async storeDetail({
		commit
	}, skuid) {
		let rDetail = await reqDetail(skuid)
		if (rDetail.code == 200) {
			commit("STORDETAIL", rDetail.data)
		}
	}
};
//getters:拆分仓库数据,简化数据
const getters = {
	categoryView(state){
		return state.rDetail.categoryView || {}
	}
};

export default {
	state,
	mutations,
	actions,
	getters
}