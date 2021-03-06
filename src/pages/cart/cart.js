import 'css/common.css'
import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'

import mixin from 'js/mixin'

import Cart from 'js/cartService.js'

new Vue({
  el: '#app',
  data: {
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg:'',
    buyMsg:false
  },
  computed: {
    allSelected: {
      get() {
        if(this.lists&&this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if(this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if(this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectLists() {
      if(this.lists&&this.lists.length){
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if(good.checked) {
              arr.push(good)
              total += good.price *　good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    },
    removeLists() {
      if(this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if(good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    },
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      Cart.getList().then(res => {
        let lists = res.data.cartList
        console.log(lists)
        lists.forEach(shop => {
          shop.checked = true
          shop.editing = false
          shop.removeChecked = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked = false
          })
        });
        this.lists = lists
      })
    },
    shopinfo(id,edit) {
      if (edit) return false
      location.href=`goods.html?id=${id}`
    },
    selectGood(shop, good) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr] 
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      let that = this
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成': '编辑'
      this.lists.forEach((item, i) => {
        if(shopIndex !== i) {
          item.editing = false
          item.editingMsg = shop.editing ?  '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop :　null
      
      this.editingShopIndex = shop.editing ? shopIndex : -1
      
    },
    reduce(good) {
      Cart.reduce(good.id).then(res => {
        if (good.number > 1) {
          good.number--
        }
      })
    },
    add(good) {
      Cart.add(good.id).then(res => {
        good.number++
      })
    },
    remove(shop,shopIndex,good,goodIndex) {
      this.removePopup = true
      this.removeData = {shop,shopIndex,good,goodIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选${this.removeLists.length}个商品删除`
    },
    removeConfirm() {
      if(this.removeMsg === '确定要删除该商品吗？') {
        let {shop,shopIndex,good,goodIndex} = this.removeData
        Cart.cartRemove(good.id).then(res => {
          shop.goodsList.splice(goodIndex, 1)
          if(!shop.goodsList.length) {
            this.lists.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
          
        })
      }else{
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })

        Cart.cartMrremove(ids).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id  == good.id
            })
            if(index == -1) {
              arr.push(good)
            }
          })
          if(arr.length) {
            this.editingShop.goodsList = arr
          } else {
            this.lists.splice(this.editingShopIndex , 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    removeShop() {
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    buy() {
      this.buyMsg = true
      let that = this
      setTimeout(function () {
        that.buyMsg = false
      },1000)
    }
  },

  mixins: [mixin]
})
