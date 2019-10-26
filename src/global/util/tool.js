/* eslint-disable */

// 校验邮箱合法性
function isEmailValid (str) {
  let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if (re.test(str)) {
    return true
  } else {
    return false
  }
}

// 截取字符串并格式化
function formatString (str, length) {
  return typeof (str) === 'string' && str.length > length ? `${str.slice(0, length)}...` : str
}

// 格式化数字
function formatNumber (num, length) {
  // toLocaleString()原型方法: https://www.colabug.com/2626489.html
  return typeof (num) === 'number' ? num.toLocaleString() : num
}

function getCurrentPageUrl () {
  // dep => console.log('hsdasdas')
  let pages = getCurrentPages() // 获取加载的页面
  let currentPage = pages[pages.length - 1] // 获取当前页面的对象
  let url = currentPage.route // 当前页面url
  return url
}

function chooseImage ({ sourceType, count }) {
  return new Promise((resolve, reject) => {
    my.chooseImage({
      sourceType,
      count,
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        resolve(error)
      }
    })
  })
}

export {
  isEmailValid,
  formatString,
  formatNumber,
  getCurrentPageUrl,
  chooseImage
}
