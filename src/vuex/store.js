import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    navmenu: '1'
}


const getters = {
    getnavmenu(state){
        return state.navmenu
    }
}


const mutations = {
    getnavmenu(state,name){
        return state.navmenu = name
    }
}


const actions = {
    
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store