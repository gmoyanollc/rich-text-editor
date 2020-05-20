// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import App from './App'

Vue.config.productionTip = false

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    editorContent: null
  },
  mutations: {
    UPDATE_EDITOR_CONTENT (state, value) {
      state.editorContent = value
    }
  },
  actions: {
    setEditorContent (context, payload) {
      context.commit("UPDATE_EDITOR_CONTENT", payload) 
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})
