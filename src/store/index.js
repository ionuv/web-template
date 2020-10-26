import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import test from './modules/test'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test
  },
  getters
})

export default store
