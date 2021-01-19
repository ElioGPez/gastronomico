import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
export const rectangle = ['<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"/>']

axios.defaults.baseURL = 'https://sistema-gastronomico-api.herokuapp.com/api/';

Vue.use(VueAxios, axios)
//Axios.defaults.baseURL = 'http://pollosback.ml/';

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
