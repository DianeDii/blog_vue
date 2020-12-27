import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    navid: 1,
}

/**
 * mutations 里面放置的是我们操作state对象属性的方法
 */
const mutations = {
    getnavdata(state,id) {
        return (state.navid = id)
    },
}

export default new Vuex.Store({
    state,
    mutations
})