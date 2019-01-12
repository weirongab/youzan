import { fetch,fetch2 }  from 'js/fetch.js'

import url from 'js/api.js'


  class Cart{
  static add(id) {
    return fetch2(url.addCart,{
      id,
      number: 1
    })
  }
  static reduce(id) {
    return fetch2(url.cartReduce,{
      id,
      number: 1
    })
  }
  static getList() {
    return fetch(url.cartList)
  }
  static cartRemove(id) {
    return fetch2(url.cartRemove,{id})
  }
  static cartMrremove(ids) {
    return fetch2(url.cartMrremove,{ids})
  }
}

export default Cart
