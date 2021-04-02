import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import VeeValidate from 'vee-validate'
import store from './store/auth'
import Paginate from 'vuejs-paginate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSpinners from 'vue-spinners'

Vue.use(VeeValidate, {
  events: ''
})
Vue.use(VueSpinners)
Vue.component('paginate', Paginate)
library.add(fas, faFontAwesome)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
