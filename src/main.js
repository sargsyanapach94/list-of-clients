import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

axios.defaults.baseURL = 'http://localhost:3000/api'
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
