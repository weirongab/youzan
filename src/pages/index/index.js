import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

//导入无限滚动组件
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);


import mixin from 'js/mixin.js'

let app = new Vue({
  el: '#app',
  data: {
    lists: null,
    loading: false,
    pageNum: 1,
    bannerLists: null
  },
  created(){
    this.getBanner()

    this.getLists()
  },
  methods: {
    //获取最热商品推荐
    getLists(){
      this.loading = true

      axios.get(url.hotLists, {params:
        {
          pageNum : this.pageNum
        }
      }).then(res => {
        let curLists =  res.data.lists
        console.log(curLists)
        if(this.lists){
          this.lists = this.lists.concat(curLists)
        }else{
          this.lists = curLists
        }
        this.loading = false
        this.pageNum++
      }).catch(err => {
        console.log(err)
      })
    },

    getBanner(){
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
        console.log(this.bannerLists)
      })
    }
  },
  mixins: [mixin]
})
