import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'

import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    subData: {},
    rankData: {},
    topIndex: 0,
    show:true
  
  },
  methods: {
    getTopList(){
 
      axios.get(url.topList).then(res => {
        this.topLists = res.data.lists
   
      })
    },
    getSubList(index,id){
      if(this.show==true){
        this.topIndex = index
        if(index === 0){
          this.getRank()
        }else{
          this.show=false
          axios.get(url.subList, {
            params:{id}
          }).then(res => {
            this.subData = res.data.data
            this.show=true
          }).catch(err => {
            this.show = true
          })
        }
      }

    },
    getRank(){
      axios.get(url.rank).then(res => {
        
        this.rankData = res.data.data
      }).catch(err => {
        this.show = true
      })
    },
    toSearch(list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  created(){
    this.getTopList()
    this.getSubList(0, 1)
  },
  mixins: [mixin]
})
