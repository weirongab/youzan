import 'css/common.css'
import mixin from 'js/mixin'

import Vue from 'vue'
import router from './router'
import store from './vuex'

new Vue({   
  el: '#app',
  router,
  store
})
