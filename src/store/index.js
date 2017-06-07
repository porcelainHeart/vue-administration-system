import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import client from './module/client'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    client
  }
})

export default store
