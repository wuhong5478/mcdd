/* eslint-disable */
import baseURL from '../config/baseURL'
import codeConfig from '../config/codeConfig'
import Vue from 'vue'

let throttlePath = []
let isFetchingSessionId = false
let requestPool = []
// 当进入一个页面时，可能会在没有session id的情况下同时发出多个请求，仅当第一个请求发出时，
// 才去立即请求session id。 之后所有的请求全部加入到store的subscription中
// 当session id请求成功后，再去执行后面的请求

export default function request (url, method = 'POST', data = {}, status = 'new') {
  // 请求节流
  console.log('baseURL + 1', url)
  if (throttlePath.includes(url)) {
    if (requestPool.includes(url)) {
      return new Promise((resolve, reject) => {
        reject()
      })
    } else {
      requestPool.push(url)
    }
  }
  // 请求Token验证
  const Token = 'clean'
  console.log('baseURL + 2', url)
  // 开始正式请求
  return new Promise((resolve, reject) => {
    let requestHeader = {
      'content-type': 'application/json',
      appid: 'MOBILE_WX'
    }
    let noLoginUrls = []
    let noJumpUrls = []
    // dep => console.log('当前token', Token)
    console.log('baseURL + 3', url)
    
    if (Token) {
    console.log('baseURL + 4', url)

      requestHeader.token = Token
    } else if (!noLoginUrls.includes(url)) {
    console.log('baseURL + 5', url)

      if (!noJumpUrls.includes(url)) {
      console.log('baseURL + 6', url)

        my.redirectTo({
          url: '/pages/login/main'
        })
      }
      reject()
      return
    }
    // let notLoading = getCurrentPages()
    // const currentPage = notLoading[notLoading.length - 1].route

    // const lodinglist = {
    // }
    // if (lodinglist[currentPage] === currentPage) {
    //   my.showLoading({
    //     title: '加载中',
    //     mask: true
    //   })
    // } else {
    // }
    console.log('baseURL + 7', url)
 
    my.httpRequest({
      url: baseURL + url,
      method,
      data,
      header: requestHeader,
      async success (data) {
    console.log('baseURL + 8', data)

        setTimeout(() => {
          // dep => console.log('登录上的' + url)
          my.hideLoading()
        }, 1000)
        // http code
        if (data.status !== 200) {
          // 处理异常状态码
          reject(data)
        }
        resolve(data)
      },
      fail (e) {
        setTimeout(() => {
          my.hideLoading()
        }, 1000)
        // dep => console.log(`接口请求失败，原因：${e}`)
        reject(e)
      },
      complete () {
        setTimeout(() => {
          // dep => console.log('complete' + url)
          my.hideLoading()
        }, 1000)

        if (requestPool.includes(url)) {
          requestPool.splice(requestPool.indexOf(url))
          // dep => console.log(`[$弹出节流请求]\n[${baseURL + url}]\nPool => [${requestPool}]`)
        }
        console.groupEnd('%c网络请求', 'color: white; font-size: q4px; background: @color-main; padding: 3px')
      }
    })
  }).catch(() => {
    setTimeout(() => {
      my.hideLoading()
    }, 1000)
  })
}
