import Vue from "vue";
import App from "./App";
import store from "./store";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

new Vue({
  el: "#app",
  components: { App },
  store,
  template: "<App/>"
});
