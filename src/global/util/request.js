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
  if (throttlePath.includes(url)) {
    if (requestPool.includes(url)) {
      // dep => console.log('[$抛弃节流请求]\n请求池中存在该节流请求', url)
      return new Promise((resolve, reject) => {
        reject()
      })
    } else {
      requestPool.push(url)
      // dep => console.log(`[$捕获节流请求]\n[${baseURL + url}]\nPool => [${requestPool}]`)
    }
  }
  // 请求Token验证
  const Token = 'clean'
  /*
  if (!Token && url !== '/auth') {
    if (!isFetchingSessionId) {
      isFetchingSessionId = true
      store.dispatch('user/myLogin')
    }
    return new Promise((resolve, reject) => {
      const unsubscribe = store.subscribe(async mutation => {
        if (mutation.type !== 'user/commitSessionId') return
        try {
          resolve(await request(url, method, data, 'again'))
        } catch (e) {
          reject(e)
        } finally {
          unsubscribe()
        }
      })
    })
  }
  */

  // 开始正式请求
  return new Promise((resolve, reject) => {
    console.group(`%c${method}请求:${baseURL + url} seesion: ${Token || 'TEST'}`, 'color: white; font-size: q4px; background: @color-main; padding: 3px')
    console.group('%c请求体', 'color: white; font-size: q4px; background: #67C23A; padding: 3px')
    // dep => console.log(data)
    console.groupEnd('%c请求体', 'color: white; font-size: q4px; background: #67C23A; padding: 3px')

    let requestHeader = {
      'content-type': 'application/json',
      appid: 'MOBILE_WX'
    }
    let noLoginUrls = []
    let noJumpUrls = []
    // dep => console.log('当前token', Token)
    if (Token) requestHeader.token = Token
    else if (!noLoginUrls.includes(url)) {
      if (!noJumpUrls.includes(url)) {
        my.redirectTo({
          url: '/pages/login/main'
        })
      }
      reject()
      return
    }
    let notLoading = getCurrentPages()
    const currentPage = notLoading[notLoading.length - 1].route

    const lodinglist = {
    }
    if (lodinglist[currentPage] === currentPage) {
      my.showLoading({
        title: '加载中',
        mask: true
      })
    } else {
      // dep => console.log(currentPage + '不展示')
    }

    // dep => console.log('哈哈哈', baseURL)
    // data.sysAuthToken = '50e7op7cfe0e4e1a05373e75d11ae72100e2'
    my.httpRequest({
      url: baseURL + url,
      method,
      data,
      header: requestHeader,
      async success (data) {
        setTimeout(() => {
          // dep => console.log('登录上的' + url)
          my.hideLoading()
        }, 1000)
        console.group('%c响应报文', 'color: white; font-size: 14px; background: #67C23A; padding: 3px')
        // dep => console.log(data)
        console.groupEnd('%c响应报文', 'color: white; font-size: 14px; background: #67C23A; padding: 3px')

        // http code
        if (data.status !== 200) {
          // 处理异常状态码
          reject(data)
        }

        /*
        // 自定义code规则
        const clearTokenCode = ['2000', '2010', '2020', '2030']
        const quietCode = ['0', '2010', '2040', '3300']
        // 弹窗code
        if (!quietCode.includes(data.data.code)) {
          my.showModal({
            title: '温馨提示',
            content: `${codeConfig[data.data.code]} ${data.data.msg}`,
            showCancel: false
          })
          if (clearTokenCode.includes(data.data.code)) {
            my.clearStorageSync()
            new Vue().$store.commit('user/clearUserInfo')
            reject(data)
          }
          reject(data)
        }
        // 清缓存code
        if (clearTokenCode.includes(data.data.code)) {
          if (data.data.code === '2010') my.navigateBack()
          my.clearStorageSync()
          new Vue().$store.commit('user/clearUserInfo')
          reject(data)
        }
        */
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
