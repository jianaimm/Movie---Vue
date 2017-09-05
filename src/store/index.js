/**
 * Created by yingyingguo on 17/9/1.
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: 0//记录是否正在加载，显示加载的loading图；
    },
    getters: {

    },
    mutations: {
        updateLoading(state,data){
            state.isLoading = data;
        }
    },
    actions: {


    }
})

