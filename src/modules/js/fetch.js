import axios from 'axios'
import url from 'js/api.js'
export function fetch(url, data) {
  return new Promise((resolve,reject) => {
    axios.get(url,{params:data}).then(res => {
      let status = res.data.status
      if(status === 200) {
        resolve(res)
      }
      if(status === 300) {
        location.href = 'login.html'
        resolve(res)
      }
      reject(res)
    }).catch(error => {
      reject(error)
    })
  })
}
export function fetch2(url, data) {
  return new Promise((resolve,reject) => {
    axios.post(url,data).then(res => {
      let status = res.data.status
      if(status === 200) {
        resolve(res)
      }
      if(status === 300) {
        location.href = 'login.html'
        resolve(res)
      }
      reject(res)
    }).catch(error => {
      reject(error)
    })
  })
}



