import url from 'js/api.js'
import { fetch,fetch2 } from 'js/fetch.js'


class Address {
  static list() {
    return fetch(url.addressList)
  }
  static add(data) {
    return fetch2(url.addressAdd, data)
  }
  static remove(id) {
    return fetch2(url.addressRemove, id)
  }
  static update (data) {
    return fetch2(url.addressUpdate, data)
  }
  static setDefault(id) {
    return fetch2(url.addressSetDefault, id)
  }
}

export default Address
