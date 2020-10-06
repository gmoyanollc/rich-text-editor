import Vue from 'vue';
import Vuex from 'vuex';
import sampleFormStore from './modules/sampleFormStoreModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { sampleFormStore },
});
